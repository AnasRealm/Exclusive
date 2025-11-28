import React, { useState, useEffect, useRef } from "react";
import { appRoutes } from "../../routes/routes.js";
import { Link, useNavigate } from "react-router-dom";
import { userStorage } from "../../feature/auth/storage";
import { useCart } from "../../feature/cart/context/CartContext";
import { useWishlist } from "../../feature/wishlist/context/WishlistContext";
import { SearchModal } from "../../shared/components/search/SearchModal";
import { toast } from "react-toastify";
import "./index.css";
import searchIcon from "../../assets/imges/serach-input-icon.png";
import wishlistIcon from "../../assets//imges/wishlist-icon.png";
import cartIcon from "../../assets/imges/cart-icon.png";
import userIcon from "../../assets/imges/user-icon.png";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoggedIn = userStorage.get();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    userStorage.remove();
    toast.success("Logged out successfully");
    navigate(appRoutes.home);
    setUserDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    const handleKeyDown = (event) => {
      // Open search with Ctrl+K or Cmd+K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setSearchModalOpen(true);
      }
      // Close search with Escape
      if (event.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchModalOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="top-banner">
        <div className="container top-banner-inner">
          <p className="promo">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%
            <a href="/shop" className="shop-now">
              Shop Now
            </a>
          </p>

          <div className="lang-wrap">
            <select className="language-selector" aria-label="language">
              <option>English</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container navbar-inner">
          <Link className="logo" to={appRoutes.home}>
            Exclusive
          </Link>

          <nav className={`nav-links ${mobileOpen ? "open" : ""}`}>
            <Link to={appRoutes.home}>Home</Link>
            <Link to={appRoutes.contact}>Contact</Link>
            <Link to={appRoutes.about}>About</Link>
            <Link to={appRoutes.auth.signUp}>Sign Up</Link>
          </nav>

          <div className="actions">
            <div className="search-box" role="search" onClick={() => setSearchModalOpen(true)}>
              <input
                className="search-input"
                type="text"
                placeholder="ابحث عن المنتجات... (Ctrl+K)"
                aria-label="Search"
                readOnly
              />
              <button className="search-btn" aria-label="search button">
                <img src={searchIcon} alt="search" className="icon-img" />
              </button>
              <div className="search-shortcut">
                <span>⌘K</span>
              </div>
            </div>

            <Link
              to="/wishlist"
              className="icon-btn"
              aria-label="wishlist"
              style={{position: 'relative'}}
            >
              <img src={wishlistIcon} alt="wishlist" className="icon-img" />
              {getWishlistCount() > 0 && (
                <span className="cart-count">{getWishlistCount()}</span>
              )}
            </Link>

            <Link
              to={appRoutes.cart}
              className="icon-btn cart-btn"
              aria-label="cart"
            >
              <img src={cartIcon} alt="cart" className="icon-img" />
              {getCartCount() > 0 && (
                <span className="cart-count">{getCartCount()}</span>
              )}
            </Link>

            {isLoggedIn && (
              <div className="user-dropdown-container" ref={dropdownRef}>
                <button
                  className="icon-btn"
                  aria-label="user profile"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <img src={userIcon} alt="user" className="icon-img" />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-item">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Manage My Account</span>
                    </div>

                    <div className="dropdown-item">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4M16 4C16 5.10457 15.1046 6 14 6H10C8.89543 6 8 5.10457 8 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>My Order</span>
                    </div>

                    <div className="dropdown-item">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 6V12L16 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>My Cancellations</span>
                    </div>

                    <div className="dropdown-item">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>My Reviews</span>
                    </div>

                    <div
                      className="dropdown-item logout-item"
                      onClick={handleLogout}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="16,17 21,12 16,7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line
                          x1="21"
                          y1="12"
                          x2="9"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              className={`hamburger ${mobileOpen ? "is-open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-nav ${mobileOpen ? "show" : ""}`}>
          <Link to={appRoutes.home}>Home</Link>
          <Link to={appRoutes.contact}>Contact</Link>
          <Link to={appRoutes.about}>About</Link>
          <Link to={appRoutes.auth.signUp}>Sign Up</Link>
        </div>
      </div>
      
      <SearchModal 
        open={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </header>
  );
}
