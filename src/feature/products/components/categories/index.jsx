import './style.css';

export function Categories() {
  const categories = [
    { name: 'Phones', icon: '📱' },
    { name: 'Computers', icon: '💻' },
    { name: 'SmartWatch', icon: '⌚' },
    { name: 'Camera', icon: '📷' },
    { name: 'HeadPhones', icon: '🎧' },
    { name: 'Gaming', icon: '🎮' }
  ];

  return (
    <section className="categories-section">
      <div className="section-indicator">
        <div className="red-rectangle"></div>
        <span>Categories</span>
      </div>
      
      <h2 className="section-title">Browse By Category</h2>
      
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}