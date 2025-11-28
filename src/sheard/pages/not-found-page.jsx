import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../routes/routes.js";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  minHeight: "50vh",
  width: "100%",
};

const pstyle = { fontSize: "1rem", color: "black", textAlign: "center" };
const titleStyle = { fontSize: "4rem", color: "black" };
const buttonStyle = {
  padding: "10px",
  borderRadius: "4px",
  backgroundColor: "#DB4444",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "1.2rem",
};

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={style}>
      <p style={titleStyle}> 404 Page not found.</p>
      <p style={pstyle}>Your visited page not found. You may go home page.</p>
      <button style={buttonStyle} onClick={() => navigate(appRoutes.home)}>
        Back to home page
      </button>
    </div>
  );
}

export default NotFoundPage;
