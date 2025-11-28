import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImageWithFallback } from '../image/ImageWithFallback';
import './SearchModal.css';

export function SearchModal({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      fetchProducts();
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
      setFilteredProducts([]);
      setSelectedIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 8));
    } else {
      setFilteredProducts([]);
    }
    setSelectedIndex(-1);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredProducts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredProducts[selectedIndex]) {
        handleProductClick(filteredProducts[selectedIndex]);
      } else if (searchTerm.trim()) {
        handleSearchSubmit();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`);
    onClose();
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="ابحث عن المنتجات... (اضغط Enter للبحث)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="search-modal-input"
            />
            {searchTerm && (
              <button 
                className="clear-btn" 
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
          <button onClick={onClose} className="search-modal-close" aria-label="Close search">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="search-results">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>جاري البحث...</p>
            </div>
          ) : searchTerm ? (
            filteredProducts.length > 0 ? (
              <>
                <div className="results-header">
                  <span className="results-count">{filteredProducts.length} نتيجة</span>
                  {filteredProducts.length === 8 && (
                    <button className="view-all-btn" onClick={handleSearchSubmit}>
                      عرض جميع النتائج
                    </button>
                  )}
                </div>
                <div className="products-list">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`product-item ${index === selectedIndex ? 'selected' : ''}`}
                      onClick={() => handleProductClick(product)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <ImageWithFallback src={product.image} alt={product.name} className="product-image" />
                      <div className="product-info">
                        <h4 className="product-name">{product.name}</h4>
                        <div className="product-details">
                          <span className="product-category">{product.category}</span>
                          <div className="product-price">
                            <span className="current-price">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="original-price">${product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results">
                <svg className="no-results-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3>لا توجد نتائج</h3>
                <p>لم نجد أي منتجات تطابق بحثك عن "{searchTerm}"</p>
                <button className="search-suggestions-btn" onClick={handleSearchSubmit}>
                  البحث في جميع المنتجات
                </button>
              </div>
            )
          ) : (
            <div className="search-suggestions">
              <h3>اقتراحات البحث</h3>
              <div className="suggestions-grid">
                <button className="suggestion-item" onClick={() => setSearchTerm('iPhone')}>
                  <span>📱</span>
                  <span>iPhone</span>
                </button>
                <button className="suggestion-item" onClick={() => setSearchTerm('Gaming')}>
                  <span>🎮</span>
                  <span>ألعاب</span>
                </button>
                <button className="suggestion-item" onClick={() => setSearchTerm('Laptop')}>
                  <span>💻</span>
                  <span>لاب توب</span>
                </button>
                <button className="suggestion-item" onClick={() => setSearchTerm('Headphones')}>
                  <span>🎧</span>
                  <span>سماعات</span>
                </button>
                <button className="suggestion-item" onClick={() => setSearchTerm('Electronics')}>
                  <span>⚡</span>
                  <span>إلكترونيات</span>
                </button>
                <button className="suggestion-item" onClick={() => setSearchTerm('Fashion')}>
                  <span>👕</span>
                  <span>أزياء</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}