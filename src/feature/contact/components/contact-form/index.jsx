import { useState } from "react";
import { FormInput } from "../../../../sheard/components/forms/form-input";
import "./style.css";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <FormInput
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            name="phone"
            type="tel"
            placeholder="Your Phone *"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="message-field">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="message-textarea"
            rows="8"
          />
        </div>

        <div className="form-submit">
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}