import { Link } from "react-router-dom";
import "./style.css";

export function Sidebar() {
  const categories = [
    "Woman's Fashion",
    "Men's Fashion", 
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
    "Baby's & Toys",
    "Groceries & Pets",
    "Health & Beauty"
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {categories.map((category, index) => (
          <li key={index} className="sidebar-item">
            <Link to="/products" className="sidebar-link">
              {category}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}