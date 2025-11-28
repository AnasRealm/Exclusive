import { useProducts } from '../services/queries';
import { ProductCard } from '../components/product-card';
import { useSearchParams } from 'react-router-dom';
import './style.css';

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  
  const { data: products, isLoading, error } = useProducts(19, 0);

  if (isLoading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error loading products: {error.message}</div>;

  const getPageTitle = () => {
    if (type) {
      return `${type.charAt(0).toUpperCase() + type.slice(1)} Products`;
    }
    if (category) {
      return `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    }
    return 'All Products';
  };

  return (
    <div className="products-page">
      <h1 className="page-title">{getPageTitle()}</h1>
      
      {(category || type) && (
        <div className="filter-info">
          <span>Showing products for: {type || category}</span>
        </div>
      )}
      
      <div className="products-grid">
        {products?.map((product, index) => (
          <div 
            key={product.id}
            style={{ '--index': index }}
          >
            <ProductCard 
              product={{
                ...product,
                discount: 0,
                originalPrice: null
              }} 
            />
          </div>
        ))}
      </div>
      
      {(!products || products.length === 0) && (
        <div className="no-products">No products found</div>
      )}
    </div>
  );
}

export default ProductsPage;