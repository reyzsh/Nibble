# Razorpay Payment Gateway Integration

## ✅ Integration Complete

Your Nibble app now has full Razorpay Standard Checkout integration with payment verification.

## 🔧 Setup Status

- ✅ `.env` file created with credentials
- ✅ `razorpay` SDK installed
- ✅ Backend endpoints added (`/api/create-order`, `/api/verify-payment`)
- ✅ Frontend checkout function updated
- ✅ Payment signature verification implemented

## 🚀 How to Test

### 1. Start the server:
```bash
npm start
```
Server will run on `http://localhost:3000`

### 2. Test the payment flow:
1. Open the app in browser (http://localhost:3000)
2. Add items to cart
3. Select delivery location
4. Click "Checkout & Pay"
5. Razorpay modal will open

### 3. Use test credentials in modal:
- **UPI**: `success@razorpay` or any test UPI ID
- **Card**: `4111 1111 1111 1111` (Visa test card)
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **OTP**: `123456`

## 📊 Payment Flow

```
1. Customer adds items → Cart
2. Clicks "Checkout & Pay"
3. Backend creates Razorpay order
4. Frontend opens Razorpay modal
5. Customer completes payment
6. Razorpay returns payment details
7. Backend verifies signature
8. Order confirmed with payment status
```

## 🔐 Security

- ✅ HMAC-SHA256 signature verification
- ✅ Key secret never exposed to frontend
- ✅ Credentials in .env (not in code)
- ✅ .env added to .gitignore

## 📝 Files Modified/Created

| File | Action | Details |
|------|--------|---------|
| `.env` | Created | Razorpay credentials |
| `.gitignore` | Created | Protects .env from git |
| `server.js` | Modified | Added 2 new endpoints |
| `public/script.js` | Modified | Updated checkout function |
| `package.json` | Auto-updated | Added `razorpay` & `dotenv` |

## 🎯 Endpoints

### Create Order
```
POST /api/create-order
Body: { amount, items, location }
Response: { order_id, key, currency, amount }
```

### Verify Payment
```
POST /api/verify-payment
Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
Response: { success, message, orderId }
```

## ⚙️ Environment Variables

```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=3000
```

## 🧪 Test Payment Methods (Razorpay Test Mode)

**Successful Payments:**
- UPI: success@razorpay
- Card: 4111 1111 1111 1111

**Failed Payments:**
- UPI: fail@razorpay
- Card: 4000 0000 0000 0002

## 📱 Features

- ✅ Standard Razorpay Checkout modal
- ✅ Multiple payment methods (UPI, Cards, Wallets)
- ✅ Automatic order creation
- ✅ Payment verification
- ✅ Order status tracking
- ✅ Error handling
- ✅ Test & Live mode support

## 🔄 Production Setup

To use with live payments:

1. Login to Razorpay dashboard
2. Get your live Key ID and Secret
3. Update `.env`:
   ```
   RAZORPAY_KEY_ID=rzp_live_YOUR_KEY
   RAZORPAY_KEY_SECRET=YOUR_SECRET
   ```
4. Test with small amount first
5. Deploy server

## ❓ Troubleshooting

**Order creation fails:**
- Check server logs
- Verify .env file exists
- Check amount >= ₹1

**Payment modal not opening:**
- Check browser console for errors
- Verify Razorpay script loaded
- Check Key ID is correct

**Signature verification fails:**
- Check Key Secret is correct
- Verify order_id matches
- Check payment_id is valid

## 📞 Support

Razorpay Docs: https://razorpay.com/docs/payments/
