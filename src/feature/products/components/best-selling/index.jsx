import { useProducts } from '../../services/queries';
import { ProductCard } from '../product-card';
import './style.css';

export function BestSelling() {
  const { data: products, isLoading } = useProducts(4, 0);

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
        {products?.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}