import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './cart.css';

export function Cart() {
  const { cartItems, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="breadcrumb">
            <span>Home</span> / <span className="current">Cart</span>
          </div>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <span>Home</span> / <span className="current">Cart</span>
        </div>

        <div className="cart-table-container">
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
                  <td className="product-cell">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </td>
                  <td>${item.price}</td>
                  <td>
                    <div className="quantity-input">
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        min="1"
                      />
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-actions">
          <button className="return-btn">Return To Shop</button>
          <button className="update-btn">Update Cart</button>
        </div>

        <div className="cart-bottom">
          <div className="coupon-section">
            <input 
              type="text" 
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="coupon-input"
            />
            <button className="apply-coupon-btn">Apply Coupon</button>
          </div>

          <div className="cart-total">
            <h3>Cart Total</h3>
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-row total-final">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button className="checkout-btn">Process to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}