import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

import hero1 from "../../../../assets/imges/hero1.png";
import hero2 from "../../../../assets/imges/hero2.png";
import hero3 from "../../../../assets/imges/hero3.png";
import hero4 from "../../../../assets/imges/hero4.png";
import appleLogo from "../../../../assets/imges/Appel-logo.png";

export function Hero() {
  const slides = [
    {
      image: hero1,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      buttonText: "Shop Now",
    },
    {
      image: hero2,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      buttonText: "Shop Now",
    },
    {
      image: hero3,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      buttonText: "Shop Now",
    },
    {
      image: hero4,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      buttonText: "Shop Now",
    },
  ];

  return (
    <div className="hero-section">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide">
              <div className="hero-content">
                <div className="hero-text">
                  <div className="hero-brand">
                    <img src={appleLogo} alt="Apple" className="apple-logo" />
                    <span>{slide.title}</span>
                  </div>
                  <h1 className="hero-title">{slide.subtitle}</h1>
                  <Link to="/products" className="hero-button">
                    {slide.buttonText}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="hero-image">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
