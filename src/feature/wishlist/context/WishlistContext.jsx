import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlistItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const existingItem = wishlistItems.find(item => item.id === product.id);
    
    if (!existingItem) {
      setWishlistItems(prevItems => [...prevItems, { 
        id: product.id,
        title: product.title || product.name,
        price: product.price,
        image: product.image,
      }]);
      
      toast.success(`Added to wishlist! ❤️`, {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const removeFromWishlist = (productId) => {
    const itemExists = wishlistItems.some(item => item.id === productId);
    
    if (itemExists) {
      setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
      toast.success('Removed from wishlist!');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}