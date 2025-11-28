import { Breadcrumb } from "../components/breadcrumb";
import { OurStory } from "../components/our-story";
import { Stats } from "../components/stats";
import { Team } from "../components/team";
import { Services } from "../components/services";
import "./style.css";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <Breadcrumb />
        <OurStory />
        <Stats />
        <Team />
        <Services />
      </div>
    </div>
  );
}

export default AboutPage;