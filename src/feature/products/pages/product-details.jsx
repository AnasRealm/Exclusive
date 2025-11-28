import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../services/queries";
import { useCart } from "../../cart/context/CartContext";
import { useWishlist } from "../../wishlist/context/WishlistContext";
import { ImageWithFallback } from "../../../shared/components/image/ImageWithFallback";
import iconDelivery from "../../../assets/imges/icon-delivery.png";
import iconReturn from "../../../assets/imges/Icon-return.png";
import "./product-details.css";

export function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product?.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(2);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading product</div>;
  if (!product) return <div className="error">Product not found</div>;

  const productImages = product.images || [
    product.image,
    product.image,
    product.image,
    product.image,
  ];
  const colors = ["#8B7355", "#2C3E50", "#95A5A6", "#34495E"];
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  };

  return (
    <div className="product-details">
      <div className="container">
        <div className="product-section">
          <div className="product-images">
            <div className="thumbnail-list">
              {productImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <ImageWithFallback src={image} alt={`Product ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="main-image">
              <ImageWithFallback src={productImages[selectedImage]} alt={product.title} />
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>

            <div className="rating-section">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < 4 ? "filled" : ""}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="reviews">(150 Reviews)</span>
              <span className="stock-status">In Stock</span>
            </div>

            <div className="current-price">${product.price}</div>

            <p className="product-description">{product.description}</p>

            <div className="colors-section">
              <label>Colours:</label>
              <div className="color-options">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`color-option ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="sizes-section">
              <label>Size:</label>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="purchase-section">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="buy-now-btn" onClick={handleAddToCart}>
                Buy Now
              </button>
              <button 
                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => {
                  if (isWishlisted) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image
                    });
                  }
                }}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>

            <div className="delivery-info">
              <div className="delivery-item">
                <div className="delivery-icon">
                  <img src={iconDelivery} alt="Delivery" />
                </div>
                <div>
                  <div className="delivery-title">Free Delivery</div>
                  <div className="delivery-desc">
                    Enter your postal code for Delivery Availability
                  </div>
                </div>
              </div>
              <div className="delivery-item">
                <div className="delivery-icon">
                  <img src={iconReturn} alt="Return" />
                </div>
                <div>
                  <div className="delivery-title">Return Delivery</div>
                  <div className="delivery-desc">
                    Free 30 Days Delivery Returns. Details
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
