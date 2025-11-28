import "./style.css";
import sideAbout from "../../../../assets/imges/about-side.png";

export function OurStory() {
  return (
    <section className="our-story-section">
      <div className="our-story-container">
        <div className="story-content">
          <h2 className="story-title">Our Story</h2>
          <p className="story-text">
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p className="story-text">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="story-image">
          <img src={sideAbout} alt="Our Story" />
        </div>
      </div>
    </section>
  );
}
