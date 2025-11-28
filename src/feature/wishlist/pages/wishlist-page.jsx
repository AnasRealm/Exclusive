import React, { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../../cart/context/CartContext';
import { ImageWithFallback } from '../../../shared/components/image/ImageWithFallback';
import { Link } from 'react-router-dom';
import './wishlist-page.css';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Force re-render when wishlistItems change
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [wishlistItems.length]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };
  
  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
    setRefreshKey(prev => prev + 1);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Add some products to your wishlist to see them here.</p>
        <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> / <span>Wishlist</span>
      </nav>
      
      <h2>My Wishlist ({wishlistItems.length})</h2>
      
      <div className="wishlist-grid">
        {wishlistItems.map((item, index) => (
          <div key={`${refreshKey}-${item.id}-${index}`} className="wishlist-item">
            <div className="item-image">
              <ImageWithFallback src={item.image} alt={item.title} />
              <button 
                className="remove-btn"
                onClick={() => handleRemoveFromWishlist(item.id)}
              >
                ×
              </button>
            </div>
            <div className="item-info">
              <h3>{item.title}</h3>
              <p className="item-price">${item.price}</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(item)}
                style={{ display: 'block', width: '100%' }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;