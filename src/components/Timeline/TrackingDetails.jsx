import React from "react";
import "./TrackingDetails.css";

const TrackingDetails = ({ data, hideTracking }) => {
  const { updates: trackingDetails = [], ...awbDetails } = data;

  return (
    <div>
      <div className="text-center">
        <button className="btn btn-outline-success mt-4" onClick={hideTracking}>
          Back
        </button>
      </div>

      <br />
      <ul className="timeline">
        {trackingDetails.map((details, index) => (
          <li key={index + details.status}>
            <a href="#">{details.currentLocation}</a>
            <a href="#" className="float-right">
              {details.status}
            </a>
            <p>{details.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackingDetails;
