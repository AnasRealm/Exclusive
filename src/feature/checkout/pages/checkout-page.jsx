import React, { useState } from 'react';
import { useCart } from '../../cart/context/CartContext';
import { userStorage } from '../../auth/storage';
import { ImageWithFallback } from '../../../shared/components/image/ImageWithFallback';
import './checkout-page.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phoneNumber: '',
    email: '',
    saveInfo: false,
    paymentMethod: 'cash',
    couponCode: '',
  });

  const [discount, setDiscount] = useState(0);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // Load saved form data on component mount
  React.useEffect(() => {
    const savedFormData = localStorage.getItem('checkoutFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
      localStorage.removeItem('checkoutFormData');
    }
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => {
      return acc + item.price * item.quantity;
    },
    0
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal - discount + shipping;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = formData.couponCode.trim().toUpperCase();

    if (!code) {
      toast.warning('Please enter a coupon code.');
      return;
    }

    if (code === 'DISCOUNT10') {
      setDiscount(subtotal * 0.1);
      toast.success('You got 10% discount on your order.');
    } else if (code === 'SAVE50') {
      setDiscount(50);
      toast.success('You saved $50 on your order.');
    } else {
      setDiscount(0);
      toast.error('The coupon code you entered is not valid.');
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.firstName.trim()) {
      errors.push('First Name is required');
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      errors.push('First Name should contain only letters');
    }

    if (!formData.streetAddress.trim()) {
      errors.push('Street Address is required');
    } else if (formData.streetAddress.length < 5) {
      errors.push('Street Address is too short');
    }

    if (!formData.city.trim()) {
      errors.push('City is required');
    } else if (!/^[a-zA-Z\s]+$/.test(formData.city)) {
      errors.push('City should contain only letters');
    }

    if (!formData.phoneNumber.trim()) {
      errors.push('Phone Number is required');
    } else if (!/^[\d\s+\-()]+$/.test(formData.phoneNumber) || formData.phoneNumber.replace(/\D/g, '').length < 8) {
      errors.push('Phone Number format is invalid');
    }

    if (!formData.email.trim()) {
      errors.push('Email Address is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Email Address format is invalid');
    }

    return errors;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const isLoggedIn = userStorage.get();
    
    if (!isLoggedIn) {
      setShowSignUpModal(true);
      return;
    }

    const errors = validateForm();
    
    if (errors.length > 0) {
      toast.error(`Please correct the following: ${errors.join(', ')}`);
      return;
    }

    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cartItems,
      total: total,
      paymentMethod: formData.paymentMethod === 'bank' ? 'electronic' : 'cash',
      status: 'Pending',
      billingInfo: {
        firstName: formData.firstName,
        companyName: formData.companyName,
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
        email: formData.email
      }
    };

    toast.success('Order Placed Successfully! Thank you for your purchase.');
    clearCart();
    navigate('/');
  };

  const handleSignUp = () => {
    setShowSignUpModal(false);
    // Save form data and redirect info
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));
    localStorage.setItem('redirectAfterLogin', '/checkout');
    navigate('/sign-up');
  };

  const handleCancel = () => {
    setShowSignUpModal(false);
  };

  return (
    <div className="checkout-page-container">
       {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/cart">Cart</Link> / <span>Checkout</span>
      </nav>
      <h2>Billing Details</h2>
      <div className="checkout-content">
        {/* Billing Form */}
        <form className="billing-form">
          <label>
            First Name*<br />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="e.g. John"
              required
              className="checkout-input"
            />
          </label>

          <label>
            Company Name<br />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g. ABC Company Ltd."
              className="checkout-input"
            />
          </label>

          <label>
            Street Address*<br />
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder="e.g. 123 Main Street"
              required
              className="checkout-input"
            />
          </label>

          <label>
            Apartment, floor, etc. (optional)<br />
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              placeholder="e.g. Apt 4B, Floor 2"
              className="checkout-input"
            />
          </label>

          <label>
            Town/City*<br />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="e.g. New York"
              required
              className="checkout-input"
            />
          </label>

          <label>
            Phone Number*<br />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="e.g. +1 (555) 123-4567"
              required
              className="checkout-input"
            />
          </label>

          <label>
            Email Address*<br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g. john@example.com"
              required
              className="checkout-input"
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
            />
            Save this information for faster check-out next time
          </label>
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          {cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <ImageWithFallback src={item.image || item.images?.[0]} alt={item.title} />
              <div className="item-details">
                <span className="item-title">{item.title}</span>
                <span className="item-quantity">Qty: {item.quantity}</span>
              </div>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div className="total-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="total-row">
              <span>Discount:</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="total-row">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
          </div>

          <div className="total-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={formData.paymentMethod === 'bank'}
                onChange={handleInputChange}
              />
              <span>Bank</span>
              <div className="payment-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="payment-icon" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="payment-icon" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="American Express" className="payment-icon" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="payment-icon" />
              </div>
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === 'cash'}
                onChange={handleInputChange}
              />
              Cash on delivery
            </label>
          </div>

          {/* Coupon */}
          <form className="coupon-section" onSubmit={handleApplyCoupon}>
            <input
              type="text"
              placeholder="Coupon Code"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleInputChange}
              className="coupon-input"
            />
            <button type="submit" className="apply-coupon-btn">
              Apply Coupon
            </button>
          </form>

          {/* Place Order */}
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>You need to sign up</h3>
            <p>Please create an account to complete your order</p>
            <div className="modal-buttons">
              <button className="signup-btn" onClick={handleSignUp}>
                Sign Up
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;