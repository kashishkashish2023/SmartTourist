import { Link, useNavigate } from "react-router-dom";
import { User, UserPlus } from "react-feather";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.email?.charAt(0).toUpperCase();

  const handleLogout = () => {
  localStorage.removeItem("user");

  alert("Successfully logged out!");

  navigate("/home");
  window.location.reload();
};

  return (
    <nav className="navbar">

      <div className="logo">
        🌍 Smart Tourism
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/destinations">Destinations</Link>
        </li>

        <li>
          <Link to="/planner">AI Planner</Link>
        </li>

        <li>
          <Link to="/reviews">Reviews</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="auth-buttons">

        {user ? (
          <>
            <div className="profile-icon">
              {firstLetter}
            </div>

            <button
              className="auth-link"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="auth-link"
            >
              <User size={18} />
              <span>Login</span>
            </Link>

            <Link
              to="/signup"
              className="auth-link"
            >
              <UserPlus size={18} />
              <span>Signup</span>
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;