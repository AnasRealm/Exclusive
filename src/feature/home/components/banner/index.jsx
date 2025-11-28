import './style.css';

export function Banner() {
  return (
    <section className="banner-section">
      <div className="banner-content">
        <div className="banner-text">
          <span className="banner-category">Categories</span>
          <h2 className="banner-title">Enhance Your Music Experience</h2>
          <div className="banner-timer">
            <div className="timer-circle">
              <span className="timer-number">23</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-circle">
              <span className="timer-number">05</span>
              <span className="timer-label">Days</span>
            </div>
            <div className="timer-circle">
              <span className="timer-number">59</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div className="timer-circle">
              <span className="timer-number">35</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
          <button className="banner-btn">Buy Now!</button>
        </div>
        <div className="banner-image">
          <div className="placeholder-image"><img src="/src/assets/imges/cate-1.png" alt="" /></div>
        </div>
      </div>
    </section>
  );
}