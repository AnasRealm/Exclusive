import { Link } from "react-router-dom";
import { appRoutes } from "../../../../routes/routes.js";
import "./style.css";

export function Breadcrumb() {
  return (
    <nav className="breadcrumb">
      <Link to={appRoutes.home}>Home</Link>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-current">About</span>
    </nav>
  );
}