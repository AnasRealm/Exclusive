import "./style.css";
import aboutIconSr1 from "../../../../assets/imges/about-icon-sr1.png";
import aboutIconSr2 from "../../../../assets/imges/about-icon-sr2.png";
import aboutIconSr3 from "../../../../assets/imges/about-icon-sr3.png";

export function Services() {
  const servicesData = [
    {
      icon: aboutIconSr1,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140"
    },
    {
      icon: aboutIconSr2,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support"
    },
    {
      icon: aboutIconSr3,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days"
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">
              <img src={service.icon} alt="service icon" />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}