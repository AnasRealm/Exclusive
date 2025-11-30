import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import './style.css';

export function Categories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/categories`);
      return response.data;
    }
  });

  if (isLoading) return <div className="loading">Loading categories...</div>;

  return (
    <section className="categories-section">
      <div className="section-indicator">
        <div className="red-rectangle"></div>
        <span>Categories</span>
      </div>
      
      <h2 className="section-title">Browse By Category</h2>
      
      <div className="categories-grid">
        {categories.slice(0, 6).map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}