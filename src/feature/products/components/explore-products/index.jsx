import { useProducts } from '../../services/queries';
import { ProductCard } from '../product-card';
import './style.css';

export function ExploreProducts() {
  const { data: products, isLoading } = useProducts(8, 0);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <section className="explore-products-section">
      <div className="section-indicator">
        <div className="red-rectangle"></div>
        <span>Our Products</span>
      </div>
      
      <h2 className="section-title">Explore Our Products</h2>
      
      <div className="products-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="view-all-container">
        <button className="view-all-btn">View All Products</button>
      </div>
    </section>
  );
}