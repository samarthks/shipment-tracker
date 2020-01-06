import TextImage from "./TextImage";
import React, { Component } from "react";
import SearchComponent from "./SearchComponent";
import { withAlert } from "react-alert";
import awbTrackerApi from "../../API";
import TrackingDetails from "../Timeline/TrackingDetails";

class TrackingPage extends Component {
  state = {
    showTracking: false,
    trackingData: []
  };

  fetachAwb = async awb => {
    const { alert } = this.props;
    alert.info("Searching AWB! Please wait...", { timeout: 1000 });
    const request = await awbTrackerApi.get(`track/${awb}`);

    if (!request) {
      alert.error("Something went wrong.");
    } else {
      const { data: response } = request;

      console.log(response);

      if (response.success) {
        // Go to dashboard and set token

        this.setState({ trackingData: response.tracking, showTracking: true });
        alert.success(response.msg, { timeout: 3000 });
      } else {
        alert.error(response.msg);
      }
    }
  };

  hideTracking = () => {
    this.setState({ showTracking: false });
  };

  render() {
    return (
      <div className="container">
        <SearchComponent fetachAwb={this.fetachAwb} />

        {!this.state.showTracking && <TextImage />}

        {this.state.showTracking && (
          <TrackingDetails
            data={this.state.trackingData}
            hideTracking={this.hideTracking}
          />
        )}
      </div>
    );
  }
}

export default withAlert()(TrackingPage);
