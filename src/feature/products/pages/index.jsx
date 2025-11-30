import { useProducts } from '../services/queries';
import { ProductCard } from '../components/product-card';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import './style.css';

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const searchTerm = searchParams.get('search');
  
  const { data: allProducts, isLoading, error } = useProducts(19, 0);

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    
    let filtered = allProducts;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by type (new products)
    if (type === 'new') {
      filtered = filtered.filter(product => product.isNew);
    }
    
    return filtered;
  }, [allProducts, searchTerm, category, type]);

  if (isLoading) return <div className="loading">downloading...</div>;
  if (error) return <div className="error">Error loading products: {error.message}</div>;

  const getPageTitle = () => {
    if (searchTerm) {
      return `Search results for "${searchTerm}"`;
    }
    if (type) {
      return `${type.charAt(0).toUpperCase() + type.slice(1)} Products`;
    }
    if (category) {
      return `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    }
    return 'All Products';
  };

  const getFilterInfo = () => {
    if (searchTerm) {
      return `Showing ${filteredProducts.length} result(s) for "${searchTerm}"`;
    }
    if (category || type) {
      return `Showing products for: ${type || category}`;
    }
    return null;
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1 className="page-title">{getPageTitle()}</h1>
        
        {getFilterInfo() && (
          <div className="filter-info">
            <span>{getFilterInfo()}</span>
            {(searchTerm || category || type) && (
              <button 
                className="clear-filters"
                onClick={() => window.location.href = '/products'}
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="products-grid">
        {filteredProducts?.map((product, index) => (
          <div 
            key={product.id}
            className="product-item"
            style={{ '--index': index }}
          >
            <ProductCard 
              product={{
                ...product,
                discount: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
              }} 
            />
          </div>
        ))}
      </div>
      
      {(!filteredProducts || filteredProducts.length === 0) && (
        <div className="no-products">
          <div className="no-products-icon">🔍</div>
          <h3>لا توجد منتجات</h3>
          <p>
            {searchTerm 
              ? `no results found for "${searchTerm}"`
              : 'No products available at the moment'
            }
          </p>
          {searchTerm && (
            <button 
              className="browse-all-btn"
              onClick={() => window.location.href = '/products'}
            >
              Browse All Products
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;