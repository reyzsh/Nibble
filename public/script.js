let cart = [];
let menuItems = [];
let selectedLocation = null;

// Campus blocks and their classes
const campusBlocks = {
    'J': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'L': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'K': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'N': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'M': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'Q': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'P': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'R': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'AA': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'A': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'B': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'C': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'D': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'E': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'F': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34'],
    'G': ['10', '11', '12', '13', '14', '20', '21', '22', '23', '24', '30', '31', '32', '33', '34']
};

function initializeLocationSelector() {
    const container = document.getElementById('blocks-container');
    container.innerHTML = '';
    
    Object.keys(campusBlocks).sort().forEach(block => {
        const blockGroup = document.createElement('div');
        blockGroup.className = 'block-group';
        
        const blockHeader = document.createElement('div');
        blockHeader.className = 'block-header';
        blockHeader.innerHTML = `
            Block <strong>${block}</strong>
            <span class="block-arrow">▼</span>
        `;
        blockHeader.onclick = (e) => {
            e.stopPropagation();
            toggleBlock(blockHeader);
        };
        
        const classesContainer = document.createElement('div');
        classesContainer.className = 'classes-container';
        classesContainer.style.display = 'none';
        
        campusBlocks[block].forEach(room => {
            const classBtn = document.createElement('button');
            classBtn.className = 'class-btn';
            classBtn.textContent = `${block}-${room}`;
            classBtn.onclick = (e) => {
                e.stopPropagation();
                selectLocation(`${block}-${room}`);
            };
            classesContainer.appendChild(classBtn);
        });
        
        blockGroup.appendChild(blockHeader);
        blockGroup.appendChild(classesContainer);
        container.appendChild(blockGroup);
    });
}

function toggleBlock(header) {
    header.classList.toggle('open');
    const classesContainer = header.nextElementSibling;
    classesContainer.style.display = classesContainer.style.display === 'none' ? 'grid' : 'none';
}

function toggleLocationDropdown() {
    const dropdown = document.getElementById('location-dropdown');
    const btn = document.getElementById('location-btn');
    
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
        btn.classList.add('active');
    } else {
        dropdown.style.display = 'none';
        btn.classList.remove('active');
    }
}

function selectLocation(location) {
    selectedLocation = location;
    document.getElementById('selected-location').textContent = location;
    document.getElementById('location-dropdown').style.display = 'none';
    document.getElementById('location-btn').classList.remove('active');
    console.log('Location selected:', location);
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('location-dropdown');
    const btn = document.getElementById('location-btn');
    
    if (!e.target.closest('.location-selector')) {
        dropdown.style.display = 'none';
        btn.classList.remove('active');
    }
});

function goToMenu() {
    // Fade out landing page
    const landingPage = document.getElementById('landing-page');
    landingPage.style.opacity = '0';
    landingPage.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        landingPage.style.display = 'none';
        landingPage.style.opacity = '1';
        landingPage.style.transition = 'none';
        
        // Show brands page first with smooth transition
        const brandsPage = document.getElementById('brands-page');
        brandsPage.style.opacity = '0';
        brandsPage.style.display = 'block';
        brandsPage.style.transition = 'opacity 0.5s ease-in';
        
        document.getElementById('back-btn').style.display = 'block';
        displayBrands();
        
        // Trigger fade-in
        setTimeout(() => {
            brandsPage.style.opacity = '1';
        }, 10);
        
        // Scroll to top of page
        window.scrollTo(0, 0);
    }, 500);
}

function goToMenuFromBrands() {
    // Fade out brands page
    const brandsPage = document.getElementById('brands-page');
    brandsPage.style.opacity = '0';
    brandsPage.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        brandsPage.style.display = 'none';
        brandsPage.style.opacity = '1';
        brandsPage.style.transition = 'none';
        
        // Show menu with smooth transition
        const app = document.getElementById('app');
        app.style.opacity = '0';
        app.style.display = 'block';
        app.style.transition = 'opacity 0.5s ease-in';
        
        displayMenu();
        
        // Trigger fade-in
        setTimeout(() => {
            app.style.opacity = '1';
        }, 10);
        
        // Scroll to top of page
        window.scrollTo(0, 0);
    }, 500);
}

function goToLanding() {
    // Fade out current page (either app or brands)
    const app = document.getElementById('app');
    const brandsPage = document.getElementById('brands-page');
    const currentPage = app.style.display !== 'none' ? app : brandsPage;
    
    currentPage.style.opacity = '0';
    currentPage.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        app.style.display = 'none';
        brandsPage.style.display = 'none';
        app.style.opacity = '1';
        brandsPage.style.opacity = '1';
        app.style.transition = 'none';
        brandsPage.style.transition = 'none';
        
        // Show landing page with smooth transition
        const landingPage = document.getElementById('landing-page');
        landingPage.style.opacity = '0';
        landingPage.style.display = 'block';
        landingPage.style.transition = 'opacity 0.5s ease-in';
        
        document.getElementById('back-btn').style.display = 'none';
        cart = [];
        updateCart();
        
        // Trigger fade-in
        setTimeout(() => {
            landingPage.style.opacity = '1';
        }, 10);
        
        // Scroll to top of page
        window.scrollTo(0, 0);
    }, 500);
}

function viewCategory(category) {
    goToMenuFromBrands();
}

function displayBrands() {
    const brandsGrid = document.getElementById('brands-page-grid');
    brandsGrid.innerHTML = '';
    
    const brands = [
        { name: 'Nescafe', image: '/images/Nescafe.png?v=1', desc: 'Premium Coffee' },
        { name: 'Samocha', image: '/images/Samocha.jpg?v=1', desc: 'Stories Around Chai' },
        { name: 'Brio', image: '/images/Brio.jpg?v=1', desc: 'Fresh Flavors' },
        { name: 'Urban', image: '/images/Urban.jpg?v=1', desc: 'Urban Eats' },
        { name: 'Amul', image: '/images/Amul.jpg?v=1', desc: 'Tasty Treats' },
        { name: 'Cafe', image: '/images/Cafe.jpg?v=1', desc: 'Cafe Delights' }
    ];
    
    brands.forEach(brand => {
        const card = document.createElement('div');
        card.className = 'brands-page-card';
        card.onclick = () => goToMenuFromBrands();
        card.innerHTML = `
            <img src="${brand.image}" alt="${brand.name}" style="max-height: 120px;">
            <div class="brands-page-card-name">${brand.name}</div>
            <div class="brands-page-card-desc">${brand.desc}</div>
        `;
        brandsGrid.appendChild(card);
    });
    
    // Remove existing back section if it exists
    const existingBackSection = document.querySelector('.brands-back-section');
    if (existingBackSection) {
        existingBackSection.remove();
    }
    
    // Add back button
    const backSection = document.createElement('div');
    backSection.className = 'brands-back-section';
    backSection.innerHTML = '<button class="brands-back-btn" onclick="goToLanding()">← Back to Home</button>';
    brandsGrid.parentElement.appendChild(backSection);
}

function loadMenu() {
    fetch('/menu')
    .then(res => res.json())
    .then(data => {
        menuItems = data;
    });
}

function displayMenu() {
    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = '';
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%23999%22%3E${item.name}%3C/text%3E%3C/svg%3E'">
            <div class="item-name">${item.name}</div>
            <div class="item-category">${item.category}</div>
            <div class="item-price">₹${item.price}</div>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuDiv.appendChild(div);
    });
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    
    if (cart.length === 0) {
        cartDiv.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1/-1;">Your cart is empty</p>';
        document.getElementById('checkout-btn').disabled = true;
        return;
    }

    document.getElementById('checkout-btn').disabled = false;

    let total = 0;
    const itemCounts = {};
    
    cart.forEach(item => {
        total += item.price;
        itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
    });

    Object.keys(itemCounts).forEach(itemId => {
        const item = menuItems.find(i => i.id == itemId);
        const count = itemCounts[itemId];
        const subtotal = item.price * count;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${count} = ₹${subtotal}</div>
            </div>
            <button onclick="removeFromCart(${itemId})">Remove</button>
        `;
        cartDiv.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `Total: ₹${total}`;
    cartDiv.appendChild(totalDiv);
}

function removeFromCart(itemId) {
    const index = cart.findIndex(i => i.id === itemId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

function resetCheckoutButton() {
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = 'Checkout & Pay';
}

function openCartModal() {
    document.getElementById('cart-modal').classList.add('active');
    document.getElementById('cart-modal-items').innerHTML = document.getElementById('cart').innerHTML || '<p style="color:#555;">Your cart is empty.</p>';
    document.getElementById('cart-modal-total').textContent = document.querySelector('.cart-total') ? document.querySelector('.cart-total').textContent : '';
    document.getElementById('cart-modal-checkout-btn').disabled = cart.length === 0;
}

function closeCartModal() {
    document.getElementById('cart-modal').classList.remove('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }
    
    if (!selectedLocation) {
        alert('Please select a delivery location');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Disable button to prevent multiple clicks
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = 'Creating order...';
    
    // Step 1: Create order on backend
    fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            amount: total,
            items: cart, 
            location: selectedLocation 
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Step 2: Open Razorpay Standard Checkout
        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: 'Nibble - Campus Food Delivery',
            description: 'Order food from campus stores',
            image: '/images/psit.png',
            order_id: data.order_id,
            handler: function(response) {
                // Step 3: Verify payment signature on backend
                verifyPayment(response);
            },
            prefill: {
                name: 'PSIT Student',
                email: 'student@psit.ac.in',
                contact: '9999999999'
            },
            notes: {
                location: selectedLocation,
                timestamp: new Date().toISOString()
            },
            theme: {
                color: '#5b21b6'
            },
            modal: {
                escape: true,
                backdropclose: true,
                ondismiss: function() {
                    resetCheckoutButton();
                    alert('Payment cancelled. Your order is saved but requires payment.');
                }
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    })
    .catch(error => {
        resetCheckoutButton();
        alert('Error: ' + error.message);
        console.error('Checkout error:', error);
    });
}

// Verify payment signature
function verifyPayment(response) {
    const checkoutBtn = document.getElementById('checkout-btn');
    
    fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Payment verified successfully
            const emailStatus = data.emailSent ? '\n\nParent notification sent.' : '\n\nParent notification will be sent once email settings are configured.';
            alert('✅ Payment Successful!\n\nOrder ID: ' + data.orderId + '\n\nYour food will be delivered to ' + selectedLocation + ' soon!' + emailStatus);
            cart = [];
            updateCart();
            resetCheckoutButton();
            goToLanding();
        } else {
            throw new Error(data.error || 'Payment verification failed');
        }
    })
    .catch(error => {
        resetCheckoutButton();
        alert('Payment verification failed: ' + error.message);
        console.error('Verification error:', error);
    });
}

// ===== SLIDER FUNCTIONALITY =====
let sliderPosition = 0;
let autoScrollActive = true;

function slideSlider(direction) {
    // Manual sliding disabled - auto-scroll only
    // This function is kept for compatibility but does nothing
}

function updateSliderDots() {
    const dotsContainer = document.querySelector('.slider-dots');
    const items = document.querySelectorAll('.slider-item');
    const itemWidth = items[0].offsetWidth + 20;
    const currentIndex = Math.round(Math.abs(sliderPosition) / itemWidth);
    
    // Clear existing dots
    dotsContainer.innerHTML = '';
    
    // Create new dots
    for (let i = 0; i < items.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === currentIndex) {
            dot.classList.add('active');
        }
        dot.onclick = () => {
            document.querySelector('.slider-track').classList.remove('auto-scroll');
            autoScrollActive = false;
            sliderPosition = -i * itemWidth;
            const track = document.querySelector('.slider-track');
            track.style.transform = `translateX(${sliderPosition}px)`;
            updateSliderDots();
        };
        dotsContainer.appendChild(dot);
    }
}

// Pause auto-scroll on hover
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    initializeLocationSelector();
    updateSliderDots();
    
    // Clone slider items for infinite loop (clone twice for seamless looping)
    const track = document.querySelector('.slider-track');
    const items = document.querySelectorAll('.slider-item');
    const originalItems = Array.from(items);
    
    // Clone items twice for seamless infinite loop
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
    
    const sliderWrapper = document.querySelector('.slider-wrapper');
    
    if (sliderWrapper && track) {
        sliderWrapper.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        sliderWrapper.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
        
        // Start auto-scroll on page load
        setTimeout(() => {
            track.classList.add('auto-scroll');
            autoScrollActive = true;
        }, 500);
    }
    
    // ===== BRANDS SLIDER SETUP =====
    const brandsTrack = document.querySelector('.brands-slider-track');
    const brandsItems = document.querySelectorAll('.brands-slider-item');
    const originalBrandsItems = Array.from(brandsItems);
    
    // Clone brands items twice for seamless infinite loop
    originalBrandsItems.forEach(item => {
        const clone = item.cloneNode(true);
        brandsTrack.appendChild(clone);
    });
    originalBrandsItems.forEach(item => {
        const clone = item.cloneNode(true);
        brandsTrack.appendChild(clone);
    });
    
    const brandsWrapper = document.querySelector('.brands-slider-wrapper');
    
    if (brandsWrapper && brandsTrack) {
        brandsWrapper.addEventListener('mouseenter', () => {
            brandsTrack.style.animationPlayState = 'paused';
        });
        
        brandsWrapper.addEventListener('mouseleave', () => {
            brandsTrack.style.animationPlayState = 'running';
        });
        
        // Start auto-scroll for brands
        setTimeout(() => {
            brandsTrack.classList.add('auto-scroll');
        }, 1000);
    }
});

// ===== FAQ FUNCTIONALITY =====
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = element.nextElementSibling;
    
    // Close other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.display = 'none';
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
    if (faqItem.classList.contains('active')) {
        answer.style.display = 'block';
    } else {
        answer.style.display = 'none';
    }
}

// ===== FAQ MODAL FUNCTIONS =====
function openFAQModal() {
    document.getElementById('faq-modal').classList.add('active');
}

function closeFAQModal() {
    document.getElementById('faq-modal').classList.remove('active');
}

// ===== HOW IT WORKS MODAL FUNCTIONS =====
function openHowItWorksModal() {
    document.getElementById('how-it-works-modal').classList.add('active');
}

function closeHowItWorksModal() {
    document.getElementById('how-it-works-modal').classList.remove('active');
}

// ===== DELIVERY AREAS PAGE FUNCTIONS =====
function goToDeliveryAreas() {
    // Hide all current pages
    document.getElementById('landing-page').style.opacity = '0';
    document.getElementById('landing-page').style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        document.getElementById('landing-page').style.display = 'none';
        document.getElementById('app').style.display = 'none';
        document.getElementById('brands-page').style.display = 'none';
        document.getElementById('landing-page').style.opacity = '1';
        document.getElementById('landing-page').style.transition = 'none';
        
        // Show delivery areas page
        const deliveryPage = document.getElementById('delivery-areas-page');
        deliveryPage.style.opacity = '0';
        deliveryPage.style.display = 'block';
        deliveryPage.style.transition = 'opacity 0.5s ease-in';
        
        setTimeout(() => {
            deliveryPage.style.opacity = '1';
        }, 10);
        
        window.scrollTo(0, 0);
    }, 500);
}

function goBackFromDeliveryAreas() {
    // Fade out delivery page
    const deliveryPage = document.getElementById('delivery-areas-page');
    deliveryPage.style.opacity = '0';
    deliveryPage.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        deliveryPage.style.display = 'none';
        deliveryPage.style.opacity = '1';
        deliveryPage.style.transition = 'none';
        
        // Show landing page
        const landingPage = document.getElementById('landing-page');
        landingPage.style.opacity = '0';
        landingPage.style.display = 'block';
        landingPage.style.transition = 'opacity 0.5s ease-in';
        
        setTimeout(() => {
            landingPage.style.opacity = '1';
        }, 10);
        
        window.scrollTo(0, 0);
    }, 500);
}

// ===== LEGAL MODALS FUNCTIONS =====
function openTermsModal() {
    document.getElementById('terms-modal').classList.add('active');
}

function closeTermsModal() {
    document.getElementById('terms-modal').classList.remove('active');
}

function openPrivacyModal() {
    document.getElementById('privacy-modal').classList.add('active');
}

function closePrivacyModal() {
    document.getElementById('privacy-modal').classList.remove('active');
}

function openCancellationModal() {
    document.getElementById('cancellation-modal').classList.add('active');
}

function closeCancellationModal() {
    document.getElementById('cancellation-modal').classList.remove('active');
}

function openRefundModal() {
    document.getElementById('refund-modal').classList.add('active');
}

function closeRefundModal() {
    document.getElementById('refund-modal').classList.remove('active');
}

// Close modals when clicking outside the content
document.addEventListener('click', (e) => {
    const faqModal = document.getElementById('faq-modal');
    const howItWorksModal = document.getElementById('how-it-works-modal');
    const termsModal = document.getElementById('terms-modal');
    const privacyModal = document.getElementById('privacy-modal');
    const cancellationModal = document.getElementById('cancellation-modal');
    const refundModal = document.getElementById('refund-modal');
    const cartModal = document.getElementById('cart-modal');
    
    if (e.target === faqModal) closeFAQModal();
    if (e.target === howItWorksModal) closeHowItWorksModal();
    if (e.target === termsModal) closeTermsModal();
    if (e.target === privacyModal) closePrivacyModal();
    if (e.target === cancellationModal) closeCancellationModal();
    if (e.target === refundModal) closeRefundModal();
    if (e.target === cartModal) closeCartModal();
});