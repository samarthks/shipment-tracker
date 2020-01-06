import React from "react";

const PageNotFoundImage = require("../images/404-error.png");

const Error404 = () => {
  return (
    <div className="text-center mt-5">
      <img src={PageNotFoundImage} alt="Page Not Found" />
      <h1 className="text-center font-weight-light mt-3">Page Not Found!</h1>
      <button type="button" class="btn btn-outline-primary mt-3">
        Go Back
      </button>
    </div>
  );
};

export default Error404;
