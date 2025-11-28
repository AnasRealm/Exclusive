import './style.css';
import deliveryIcon from '../../../../assets/imges/icon-delivery.png';
import customerServiceIcon from '../../../../assets/imges/Icon-Customer service.png';
import secureIcon from '../../../../assets/imges/Icon-secure.png';

export function Services() {
  const services = [
    {
      icon: deliveryIcon,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140'
    },
    {
      icon: customerServiceIcon,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support'
    },
    {
      icon: secureIcon,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days'
    }
  ];

  return (
    <section className="services-section">
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">
              <img src={service.icon} alt={service.title} />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}