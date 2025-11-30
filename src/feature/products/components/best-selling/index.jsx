import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProductCard } from '../product-card';
import './style.css';

export function BestSelling() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['best-selling'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/products?offset=8&limit=4`);
      return response.data;
    }
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <section className="best-selling-section">
      <div className="section-indicator">
        <div className="red-rectangle"></div>
        <span>This Month</span>
      </div>
      
      <div className="best-selling-header">
        <h2 className="section-title">Best Selling Products</h2>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}