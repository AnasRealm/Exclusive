import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { ImageWithFallback } from '../../../shared/components/image/ImageWithFallback';
import './cart-page.css';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span className="loading-text">Loading Cart...</span>
      </div>
    );
  }

  const handleQuantityChange = (id, value) => {
    if (value < 1) return;
    setQuantities(prev => ({ ...prev, [id]: value }));
    updateQuantity(id, value);
  };

  const handleUpdateCart = () => {
    Object.entries(quantities).forEach(([id, quantity]) => {
      if (quantity > 0) {
        updateQuantity(Number(id), quantity);
      }
    });
    toast.success('Cart updated successfully!');
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = quantities[item.id] !== undefined ? quantities[item.id] : (item.quantity || 1);
    return acc + item.price * quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast.warning('Please enter a coupon code.');
      return;
    }

    if (couponCode.toUpperCase() === 'DISCOUNT10') {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      toast.success(`You got 10% discount ($${discountAmount.toFixed(2)}) on your order.`);
    } else if (couponCode.toUpperCase() === 'SAVE50') {
      setDiscount(50);
      toast.success('You saved $50 on your order.');
    } else {
      setDiscount(0);
      toast.error('The coupon code you entered is not valid.');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.info('Your cart is empty. Please add some products first.');
      navigate('/');
      return;
    }

    navigate('/checkout');
  };

  return (
    <div className="cart-page-container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / <span>Cart</span>
      </nav>

      {/* Cart Table */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className="product-info">
                <div className="product-image-wrapper">
                  <ImageWithFallback
                    src={item.image || item.images?.[0]}
                    alt={item.title}
                    className="product-image"
                    fallbackSrc="https://via.placeholder.com/80x80/f8f9fa/6c757d?text=📦"
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove product"
                  >
                    ×
                  </button>
                </div>
                <span>{item.title}</span>
              </td>
              <td>${item.price}</td>
              <td>
                <input
                  type="number"
                  min={1}
                  value={quantities[item.id] || item.quantity || 1}
                  onChange={e =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  className="quantity-input"
                />
              </td>
              <td>
                ${(
                  item.price * (quantities[item.id] || item.quantity || 1)
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Actions */}
      <div className="cart-actions">
        <button
          className="return-btn"
          onClick={() => navigate('/')}
        >
          Return To Shop
        </button>
        <button
          className="update-btn"
          onClick={handleUpdateCart}
        >
          Update Cart
        </button>
      </div>

      {/* Coupon + Total */}
      <div className="coupon-and-total">
        
        {/* Coupon */}
        <div className="coupon-container">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
            className="coupon-input1"
          />
          <button
            className="apply-coupon-btn1"
            onClick={applyCoupon}
          >
            Apply Coupon
          </button>
        </div>

        {/* Cart Total */}
        <div className="cart-total">
          <h3>Cart Total</h3>
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
            <span>Free</span>
          </div>
          <div className="total-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Process to checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartPage;