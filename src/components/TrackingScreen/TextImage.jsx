import React from "react";
import { Link } from "react-router-dom";
const courierImage = require("../../images/delivery-man.png");

const TextImage = () => {
  const isUserLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <h1 className="text-center font-weight-light my-5">
        React Tracker, Track your shipments with ease!
      </h1>

      <div className="text-center">
        <img src={courierImage} alt="Logo" />

        {isUserLoggedIn || (
          <div>
            <br />
            <br />
            Already a user? <Link to="/login">Login</Link>
            <p style={{ margin: 0 }}>or</p>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default TextImage;
