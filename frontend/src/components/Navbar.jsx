import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <div
          className="navbar-logo"
          onClick={() => scrollToSection("home")}
        >

          <div className="navbar-logo-icon">
            AI
          </div>

          <div className="navbar-logo-text">

            <span>
              AI Interview
            </span>

            <h2>
              Analyzer
            </h2>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="navbar-links">

          <button
            onClick={() => scrollToSection("home")}
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("features")}
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("how-it-works")}
          >
            How It Works
          </button>

        </nav>

        {/* BUTTONS */}

        <div className="navbar-actions">

          <button
            className="navbar-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="navbar-register"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;