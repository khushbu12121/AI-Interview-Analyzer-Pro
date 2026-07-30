import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function ProtectedLayout() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <>

      <Sidebar
        navigate={navigate}
        logout={handleLogout}
      />

      <div className="dashboard-wrapper">

        <div className="dashboard-content">

          <Topbar />

          <Outlet />

        </div>

      </div>

    </>

  );

}

export default ProtectedLayout;