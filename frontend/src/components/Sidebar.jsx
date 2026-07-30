import {
  FaHome,
  FaMicrophone,
  FaHistory,
  FaChartBar,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import "./components.css";

function Sidebar({ navigate, logout }) {
  return (
    <div className="sidebar">

      <div className="logo">

  <div className="logo-icon">
    🤖
  </div>

  <div className="logo-text">
    <h2>AI Interview Analyzer</h2>
    <p>AI Powered Platform</p>
</div>

</div>
      <NavLink to="/dashboard" className="sidebar-link">
  <FaHome />
  Dashboard
</NavLink>

      <NavLink to="/interview" className="sidebar-link">
  <FaMicrophone />
  Interview
</NavLink>

      <NavLink to="/history" className="sidebar-link">
  <FaHistory />
  History
</NavLink>
      <NavLink to="/report" className="sidebar-link">
  <FaChartBar />
  Reports
</NavLink>

      <NavLink to="/profile" className="sidebar-link">
  <FaUser />
  Profile
</NavLink>
      <button
        className="logout-btn"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;