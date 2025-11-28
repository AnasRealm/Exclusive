import "./style.css";
import aboutPres1 from "../../../../assets/imges/about-pres1.png";
import aboutPres2 from "../../../../assets/imges/about-pres2.png";
import aboutPres3 from "../../../../assets/imges/about-pres3.png";

export function Team() {
  const teamData = [
    {
      image: aboutPres1,
      name: "Tom Cruise",
      position: "Founder & Chairman"
    },
    {
      image: aboutPres2,
      name: "Emma Watson",
      position: "Managing Director"
    },
    {
      image: aboutPres3,
      name: "Will Smith",
      position: "Product Designer"
    }
  ];

  return (
    <section className="team-section">
      <div className="team-container">
        {teamData.map((member, index) => (
          <div key={index} className="team-card">
            <div className="team-image">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <p className="team-position">{member.position}</p>
              <div className="team-social">
                <a href="#" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="team-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
}