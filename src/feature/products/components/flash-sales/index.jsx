import { useProducts } from '../../services/queries';
import { ProductCard } from '../product-card';
import { CountdownTimer } from './countdown-timer';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';

export function FlashSales() {
  const { data: products, isLoading, error } = useProducts(10, 0);

  if (isLoading) return (
    <div className="loading">
      <div className="spinner"></div>
      <span className="loading-text">Loading flash sales...</span>
    </div>
  );
  if (error) return <div className="error">Error loading products: {error.message}</div>;

  // Create products with discounts
  const baseProducts = products?.slice(0, 5) || [];
  const flashProducts = [];
  
  // Create 8 products
  for (let i = 0; i < 8; i++) {
    const product = baseProducts[i % baseProducts.length];
    if (product) {
      flashProducts.push({
        ...product,
        id: `${product.id}-${i}`,
        discount: [40, 35, 30, 25, 20, 45, 50, 15][i] || 30
      });
    }
  }

  console.log('Flash Products:', flashProducts);

  return (
    <section className="flash-sales-section">
      <div className="flash-sales-header">
        <div className="flash-sales-left">
          <div className="section-indicator">
            <div className="red-rectangle"></div>
            <span>Today's</span>
          </div>
          
          <div className="flash-sales-title-row">
            <h2 className="section-title">Flash Sales</h2>
            <CountdownTimer />
          </div>
        </div>
        
        <div className="navigation-arrows">
          <button className="nav-arrow prev flash-prev" aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="nav-arrow next flash-next" aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="products-swiper">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={flashProducts.length > 4}
          navigation={{
            prevEl: '.flash-prev',
            nextEl: '.flash-next',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="flash-swiper"
        >
          {flashProducts.map((product, index) => (
            <SwiperSlide key={`${product.id}-${index}`}>
              <ProductCard 
                product={product} 
                discount={product.discount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="view-all-container">
        <Link to="/products" className="view-all-btn">View All Products</Link>
      </div>
    </section>
  );
}