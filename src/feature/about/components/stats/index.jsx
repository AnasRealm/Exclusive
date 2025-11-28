import "./style.css";
import about1 from "../../../../assets/imges/about-icon-1.png";
import about2 from "../../../../assets/imges/about-icon-2.png";
import about3 from "../../../../assets/imges/about-icon-3.png";
import about4 from "../../../../assets/imges/about-icon-4.png";

export function Stats() {
  const statsData = [
    {
      icon: about1,
      number: "10.5k",
      label: "Sellers active our site",
    },
    {
      icon: about2,
      number: "33k",
      label: "Monthly Product Sale",
      highlighted: true,
    },
    {
      icon: about3,
      number: "45.5k",
      label: "Customer active in our site",
    },
    {
      icon: about4,
      number: "25k",
      label: "Annual gross sale in our site",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`stat-card ${stat.highlighted ? "highlighted" : ""}`}
          >
            <div className="stat-icon">
              <img src={stat.icon} alt="stat icon" />
            </div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
