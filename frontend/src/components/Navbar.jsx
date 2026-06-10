import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="logo">
        AI Interview Analyzer
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/interview">
            Interview
          </Link>
        </li>

        <li>
          <Link to="/history">
            History
          </Link>
        </li>

        <li>
          <Link to="/report">
            Report
          </Link>
        </li>

        <li>
          <Link to="/summary">
            Summary
          </Link>
        </li>
        <li>
  <Link to="/profile">
    Profile
  </Link>
</li>

      </ul>

    </nav>

  );
}

export default Navbar;