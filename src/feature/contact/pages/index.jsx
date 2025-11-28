import { Breadcrumb } from "../../about/components/breadcrumb";
import { ContactInfo } from "../components/contact-info";
import { ContactForm } from "../components/contact-form";
import "./style.css";

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-breadcrumb">
          <Breadcrumb />
        </div>
        
        <div className="contact-content">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;