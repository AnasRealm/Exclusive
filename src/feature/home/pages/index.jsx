import { Sidebar } from "../components/sidebar";
import { Hero } from "../components/hero";
import { Banner } from "../components/banner";
import { FlashSales } from "../../products/components/flash-sales";
import { Categories } from "../../products/components/categories";
import { BestSelling } from "../../products/components/best-selling";
import { ExploreProducts } from "../../products/components/explore-products";
import { NewArrival } from "../../products/components/new-arrival";
import { Services } from "../../products/components/services";
import "./style.css";

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-content">
          <Sidebar />
          <Hero />
        </div>
        <FlashSales />
        <Categories />
        <BestSelling />
        <Banner />
        <ExploreProducts />
        <NewArrival />
        <Services />
      </div>
    </div>
  );
}

export default HomePage;
