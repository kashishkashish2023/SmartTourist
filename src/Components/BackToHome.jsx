import { useNavigate } from "react-router-dom";

function BackToHome() {

  const navigate = useNavigate();

  return (
    <div className="back-home" onClick={() => navigate("/")}>
      <span>←</span>
      <p>Back to Home</p>
    </div>
  );
}

export default BackToHome;