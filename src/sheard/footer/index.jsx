import qrCodeUrl from "../../assets/imges/Qrcode 1.png";
import appStoreBadge from "../../assets/imges/app-store-icon.png";
import googlePlayBadge from "../../assets/imges/googleplay-icon.png";
import SendIcon from "../../assets/imges/icon-send-footer.png";
import facebookIcon from "../../assets/imges/Icon-Facebook.png";
import twitterIcon from "../../assets/imges/Icon-Twitter.png";
import instagramIcon from "../../assets/imges/icon-instagram.png";
import linkedinIcon from "../../assets/imges/icon-in.png";
import "./index.css";

export function Footer() {
  const FooterLink = ({ to = "/home", children }) => (
    <a href={to} className="footer__link">
      {children}
    </a>
  );

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* 1. Exclusive Column */}
          <div className="footer__column footer__exclusive">
            <h2 className="footer__title">Exclusive</h2>
            <h4 className="footer__subtitle">Subscribe</h4>
            <p className="footer__text">Get 10% off your first order</p>
            <div className="footer__input-wrapper">
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__input"
              />
              <button className="footer__send-btn" aria-label="Subscribe">
                <img className="send-icon" src={SendIcon} alt="Send" />
              </button>
            </div>
          </div>

          {/* 2. Support Column */}
          <div className="footer__column">
            <h4 className="footer__subtitle">Support</h4>
            <p className="footer__text">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh
            </p>
            <p className="footer__text">exclusive@gmail.com</p>
            <p className="footer__text">+88015-88888-9999</p>
          </div>

          {/* 3. Account Column */}
          <div className="footer__column">
            <h4 className="footer__subtitle">Account</h4>
            <ul className="footer__list">
              <li>
                <FooterLink>My Account</FooterLink>
              </li>
              <li>
                <FooterLink>Login / Register</FooterLink>
              </li>
              <li>
                <FooterLink>Cart</FooterLink>
              </li>
              <li>
                <FooterLink>Wishlist</FooterLink>
              </li>
              <li>
                <FooterLink>Shop</FooterLink>
              </li>
            </ul>
          </div>

          {/* 4. Quick Link Column */}
          <div className="footer__column">
            <h4 className="footer__subtitle">Quick Link</h4>
            <ul className="footer__list">
              <li>
                <FooterLink>Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink>Terms Of Use</FooterLink>
              </li>
              <li>
                <FooterLink>FAQ</FooterLink>
              </li>
              <li>
                <FooterLink>Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* 5. Download App Column */}
          <div className="footer__column">
            <h4 className="footer__subtitle">Download App</h4>
            <p className="footer__text footer__save-text">
              Save $3 with App New User Only
            </p>
            <div className="footer__apps">
              <img src={qrCodeUrl} alt="QR Code" className="footer__qr" />
              <div className="footer__stores">
                <a href="/home" aria-label="App Store">
                  <img
                    src={appStoreBadge}
                    alt="App Store"
                    className="app-badge"
                  />
                </a>
                <a href="/home" aria-label="Google Play">
                  <img
                    src={googlePlayBadge}
                    alt="Google Play"
                    className="app-badge"
                  />
                </a>
              </div>
            </div>
            {/* Social Media Links */}
            <div className="footer__social">
              <a href="/home" aria-label="Facebook">
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  className="social-icon"
                />
              </a>
              <a href="/home" aria-label="Twitter">
                <img src={twitterIcon} alt="Twitter" className="social-icon" />
              </a>
              <a href="/home" aria-label="Instagram">
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="social-icon"
                />
              </a>
              <a href="/home" aria-label="LinkedIn">
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="social-icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="copyright-text">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
