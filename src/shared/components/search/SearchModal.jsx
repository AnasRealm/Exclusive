import { useState } from 'react';

export function SearchModal({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!open) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-modal-input"
            autoFocus
          />
          <button onClick={onClose} className="search-modal-close">×</button>
        </div>
        <div className="search-results">
          {searchTerm ? (
            <p>Search results for "{searchTerm}" will appear here</p>
          ) : (
            <p>Start typing to search products...</p>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .search-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 100px;
          z-index: 1000;
        }
        
        .search-modal {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .search-modal-header {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .search-modal-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 18px;
          padding: 10px;
        }
        
        .search-modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 5px;
          margin-left: 10px;
        }
        
        .search-results {
          padding: 20px;
          min-height: 200px;
        }
      `}</style>
    </div>
  );
}