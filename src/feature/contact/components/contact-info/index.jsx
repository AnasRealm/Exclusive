import "./style.css";
import iconsPhone from "../../../../assets/imges/icons-phone.png";
import iconsMail from "../../../../assets/imges/icons-mail.png";

export function ContactInfo() {
  return (
    <div className="contact-info">
      <div className="contact-section">
        <div className="contact-header">
          <div className="contact-icon">
            <img src={iconsPhone} alt="Phone" />
          </div>
          <h3>Call To Us</h3>
        </div>
        <p className="contact-text">We are available 24/7, 7 days a week.</p>
        <p className="contact-detail">Phone: +8801611112222</p>
      </div>

      <hr className="contact-divider" />

      <div className="contact-section">
        <div className="contact-header">
          <div className="contact-icon">
            <img src={iconsMail} alt="Mail" />
          </div>
          <h3>Write To US</h3>
        </div>
        <p className="contact-text">
          Fill out our form and we will contact you within 24 hours.
        </p>
        <p className="contact-detail">Emails: customer@exclusive.com</p>
        <p className="contact-detail">Emails: support@exclusive.com</p>
      </div>
    </div>
  );
}
