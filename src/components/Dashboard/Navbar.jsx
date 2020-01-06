import React from "react";
import { withAlert } from "react-alert";
const navbarImage = require("../../images/delivery-man (1).png");

const Navbar = ({ history, alert }) => {
  const logout = () => {
    localStorage.clear();
    alert.success("Logout Successful");
    history.replace("/login");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div>
        <img src={navbarImage} alt="Logo" />
        <h3
          className="ml-3 font-weight-light d-inline"
          style={{ verticalAlign: "bottom" }}
        >
          React Tracker
        </h3>
      </div>

      <div>
        <button
          type="button"
          className="btn btn-outline-primary ml-3"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default withAlert()(Navbar);
