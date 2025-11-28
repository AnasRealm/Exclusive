import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../cart/context/CartContext";
import { useWishlist } from "../../../wishlist/context/WishlistContext";
import { ImageWithFallback } from "../../../../shared/components/image/ImageWithFallback";
import "./style.css";

export function ProductCard({ product, showQuickActions = true }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [localWishlistState, setLocalWishlistState] = useState(false);
  
  // Update local state when wishlist changes
  useEffect(() => {
    setLocalWishlistState(wishlistItems.some(item => item.id === product.id));
  }, [wishlistItems, product.id]);
  
  const isWishlisted = localWishlistState;
  
  const rating = product.rating || 4.5;
  const reviewCount = product.reviews || 50;
  const discount = product.discount || 0;
  const originalPrice = product.originalPrice;
  const currentPrice = product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title || product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setLocalWishlistState(false);
    } else {
      addToWishlist({
        id: product.id,
        title: product.title || product.name,
        price: product.price,
        image: product.image
      });
      setLocalWishlistState(true);
    }
  };

  const handleQuickView = () => {
    const originalId = product.id.toString().split('-')[0];
    navigate(`/products/${originalId}`);
  };

  const handleCardClick = () => {
    const originalId = product.id.toString().split('-')[0];
    navigate(`/products/${originalId}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{cursor: 'pointer'}}>
      {discount > 0 && (
        <div className="product-discount">-{discount}%</div>
      )}
      
      <div className="product-image-container">
        <ImageWithFallback 
          src={product.image} 
          alt={product.title || product.name}
          className="product-image"
        />
        
        {showQuickActions && (
          <div className="product-actions">
            <button 
              className={`action-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" 
                      fill={isWishlisted ? "#DB4444" : "none"} 
                      stroke="currentColor" 
                      strokeWidth="2"/>
              </svg>
            </button>
            
            <button 
              className="action-btn quick-view-btn"
              onClick={(e) => {e.stopPropagation(); handleQuickView();}}
              aria-label="Quick view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        )}
        
        <button className="add-to-cart-btn" onClick={(e) => {e.stopPropagation(); handleAddToCart();}}>
          Add To Cart
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title || product.name}</h3>
        
        <div className="product-pricing">
          <span className="current-price">${currentPrice}</span>
          {discount > 0 && originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
        </div>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
}