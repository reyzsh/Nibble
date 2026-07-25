const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// In-memory data
let orders = [];
let menu = [
    { id: 1, name: 'Doritos', price: 30, category: 'Snacks', image: '/images/doritos.jpg?v=1' },
    { id: 2, name: 'Lays', price: 30, category: 'Snacks', image: '/images/Lays.jpg?v=1' },
    { id: 3, name: 'KitKat', price: 40, category: 'Desserts', image: '/images/Kitkat.jpg?v=1' },
    { id: 4, name: 'Coffee', price: 60, category: 'Beverages', image: '/images/coffee.jpg?v=1' },
    { id: 5, name: 'Diet Coke', price: 25, category: 'Beverages', image: '/images/diet_coke.jpg?v=1' },
];

const transporter = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
    : null;

const parentEmail = process.env.PARENT_EMAIL || process.env.SMTP_USER || null;

function buildOwnerNotificationMessage(orderData) {
    const itemsText = (orderData.items || []).map(item => `- ${item.name} (₹${item.price})`).join('\n');
    return `New order received!\nOrder #${orderData.orderId}\nTotal: ₹${orderData.amount || orderData.total || 0}\nLocation: ${orderData.location || 'Not provided'}\nItems:\n${itemsText || 'No item details available'}`;
}

function buildParentNotificationEmail(orderData) {
    const itemsText = (orderData.items || []).map(item => `- ${item.name} (₹${item.price})`).join('\n');

    return {
        subject: `Nibble Payment Successful - Order #${orderData.orderId}`,
        text: `Hello Parent,\n\nA payment was completed successfully for Order #${orderData.orderId}.\n\nTotal: ₹${orderData.amount || orderData.total || 0}\nLocation: ${orderData.location || 'Not provided'}\nItems:\n${itemsText || 'No item details available'}\n\nPlease contact the student if needed.`,
        html: `<p>Hello Parent,</p><p>A payment was completed successfully for <strong>Order #${orderData.orderId}</strong>.</p><p><strong>Total:</strong> ₹${orderData.amount || orderData.total || 0}<br><strong>Location:</strong> ${orderData.location || 'Not provided'}</p><p><strong>Items:</strong><br>${itemsText || 'No item details available'}</p><p>Please contact the student if needed.</p>`
    };
}

async function sendOwnerNotification(orderData) {
    const message = buildOwnerNotificationMessage(orderData);

    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM && process.env.TWILIO_TO) {
        const body = new URLSearchParams({
            From: process.env.TWILIO_FROM,
            To: process.env.TWILIO_TO,
            Body: message
        });

        const options = {
            hostname: 'api.twilio.com',
            port: 443,
            path: `/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
            method: 'POST',
            auth: `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(body.toString())
            }
        };

        await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                res.resume();
                res.on('end', () => resolve());
            });
            req.on('error', reject);
            req.write(body.toString());
            req.end();
        });

        return { success: true, skipped: false, method: 'twilio' };
    }

    if (!transporter || !parentEmail) {
        console.log('Owner notification skipped: no SMS/WhatsApp or email settings are configured.');
        return { success: false, skipped: true };
    }

    const mail = buildParentNotificationEmail(orderData);
    await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: parentEmail,
        subject: mail.subject,
        text: mail.text,
        html: mail.html
    });

    return { success: true, skipped: false, method: 'email' };
}

async function sendParentNotification(orderData) {
    return sendOwnerNotification(orderData);
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Get menu
app.get('/menu', (req, res) => {
    res.json(menu);
});

// Place order
app.post('/order', (req, res) => {
    const { items, total } = req.body;
    const order = {
        id: orders.length + 1,
        items,
        total,
        status: 'Pending',
        timestamp: new Date()
    };
    orders.push(order);
    res.json({ message: 'Order placed successfully', orderId: order.id });
});

// Get orders (for admin)
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Update order status
app.put('/order/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = orders.find(o => o.id == id);
    if (order) {
        order.status = status;
        res.json({ message: 'Order updated' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

// ===== RAZORPAY INTEGRATION =====

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, items, location } = req.body;
        
        // Validate amount (minimum ₹1)
        if (!amount || amount < 1) {
            return res.status(400).json({ error: 'Invalid amount' });
        }
        
        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: 'order_' + Date.now()
        };
        
        const order = await razorpay.orders.create(options);
        
        // Store order details for verification later
        const newOrder = {
            id: orders.length + 1,
            razorpayOrderId: order.id,
            items,
            amount,
            location,
            status: 'Payment Pending',
            timestamp: new Date()
        };
        orders.push(newOrder);
        
        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Failed to create order', details: error.message });
    }
});

// Verify Razorpay Payment
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        // Validate inputs
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ error: 'Missing payment details' });
        }
        
        // Create signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');
        
        // Verify signature
        if (expectedSignature === razorpay_signature) {
            // Update order status
            const order = orders.find(o => o.razorpayOrderId === razorpay_order_id);
            if (order) {
                order.status = 'Payment Confirmed';
                order.paymentId = razorpay_payment_id;
            }

            let notificationResult = { success: false, skipped: true };
            if (order) {
                try {
                    notificationResult = await sendParentNotification({
                        orderId: order.id,
                        amount: order.amount,
                        location: order.location,
                        items: order.items
                    });
                } catch (emailError) {
                    console.error('Parent notification error:', emailError);
                }
            }
            
            res.json({ 
                success: true, 
                message: 'Payment verified successfully',
                orderId: order?.id,
                emailSent: notificationResult.success && !notificationResult.skipped
            });
        } else {
            res.status(400).json({ success: false, error: 'Payment signature verification failed' });
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Verification failed', details: error.message });
    }
});

// ===== END RAZORPAY INTEGRATION =====

if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Server running on http://localhost:" + PORT);
    });
}

module.exports = {
    app,
    buildParentNotificationEmail,
    buildOwnerNotificationMessage,
    sendParentNotification,
    sendOwnerNotification
};