import './style.css';
import ps5Image from '../../../../assets/imges/ps5.png';
import womanImage from '../../../../assets/imges/attractive-woman.png';
import speakersImage from '../../../../assets/imges/bfl.png';
import perfumeImage from '../../../../assets/imges/atr.png';

export function NewArrival() {
  return (
    <section className="new-arrival-section">
      <div className="section-indicator">
        <div className="red-rectangle"></div>
        <span>Featured</span>
      </div>
      
      <h2 className="section-title">New Arrival</h2>
      
      <div className="arrival-grid">
        <div className="arrival-card large ps5" style={{backgroundImage: `url(${ps5Image})`}}>
          <div className="card-content">
            <h3>PlayStation 5</h3>
            <p>Black and White version of the PS5 coming out on sale.</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
        
        <div className="arrival-card women" style={{backgroundImage: `url(${womanImage})`}}>
          <div className="card-content">
            <h3>Women's Collections</h3>
            <p>Featured woman collections that give you another vibe.</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
        
        <div className="arrival-card speakers" style={{backgroundImage: `url(${speakersImage})`}}>
          <div className="card-content">
            <h3>Speakers</h3>
            <p>Amazon wireless speakers</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
        
        <div className="arrival-card perfume" style={{backgroundImage: `url(${perfumeImage})`}}>
          <div className="card-content">
            <h3>Perfume</h3>
            <p>GUCCI INTENSE OUD EDP</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}