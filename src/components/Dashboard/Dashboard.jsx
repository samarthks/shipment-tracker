import React, { Component } from "react";

import Navbar from "./Navbar";

import TableView from "./TableView";
import { Route } from "react-router-dom";

import awbTrackerApi from "../../API";
import { withAlert } from "react-alert";

import AddEditAwb from "./AddAwb";

const addAwbForm = [
  {
    name: "awbNo",
    label: "AWB Number"
  },
  {
    name: "from",
    label: "From"
  },
  {
    name: "to",
    label: "To"
  },
  {
    name: "courierCompany",
    label: "Courier Company"
  },
  {
    name: "courierType",
    label: "Courier Type"
  },
  {
    name: "charge",
    label: "Shimpment Amount"
  }
];

const statusUpadteForm = [
  {
    name: "currentLocation",
    label: "Current Location"
  },
  {
    name: "status",
    label: "Status"
  },
  {
    name: "description",
    label: "Description"
  }
];

class Dashboard extends Component {
  state = {
    headers: ["S.No.", "AWB Number", "Courier Company", "Status", "Actions"],
    awbList: [],
    addAwbField: {},
    currentPage: 1,
    totalPages: 1
  };

  getAwbDetails = () => {
    const { currentPage } = this.state;
    const url = `my-awb?page=${currentPage}`;

    console.log(url);

    awbTrackerApi
      .get(url)
      .then(({ data: response }) => {
        console.log("responseeeee", response);

        if (response.success) {
          const { tracking: awbList, total_awb, per_page } = response;
          let totalPages = 0;
          if (total_awb && per_page) {
            const pageCount = total_awb / per_page;
            totalPages = pageCount < 1 ? 1 : Math.ceil(pageCount);
          }
          this.setState({ awbList, totalPages });
        }
      })
      .catch(err => console.log(err));
  };

  previousPage = () => {
    const { currentPage } = this.state;

    if (currentPage > 1) {
      this.setState(
        prevState => ({ currentPage: --prevState.currentPage }),
        () => this.getAwbDetails()
      );
    }
  };

  nextPage = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage !== totalPages) {
      this.setState(
        prevState => ({ currentPage: ++prevState.currentPage }),
        () => this.getAwbDetails()
      );
    }
  };

  addAwb = async formValue => {
    const { alert } = this.props;
    alert.info("Adding AWB! Please wait...", { timeout: 1000 });
    const request = await awbTrackerApi.post("add-awb", formValue);

    if (!request) {
      alert.error("Something went wrong.");
    } else {
      const { data: response } = request;
      const { history } = this.props;

      if (response.success) {
        // Go to dashboard and set token

        this.getAwbDetails();
        history.push("/dashboard");

        alert.success(response.msg, { timeout: 3000 });
      } else {
        alert.error(response.msg);
      }
    }
  };

  deleteAwb = async awbNo => {
    const { alert } = this.props;
    alert.info("Deleting AWB! Please wait...", { timeout: 1000 });
    const request = await awbTrackerApi.post("delete-awb", { awbNo });

    if (!request) {
      alert.error("Something went wrong.");
    } else {
      const { data: response } = request;
      const { history } = this.props;

      if (response.success) {
        // Go to dashboard and set token

        this.getAwbDetails();
        history.push("/dashboard");

        alert.success(response.msg, { timeout: 3000 });
      } else {
        alert.error(response.msg);
      }
    }
  };

  addTrackingDetails = async formValue => {
    const { alert } = this.props;
    alert.info("Adding Tracking Details! Please wait...", { timeout: 1000 });
    const request = await awbTrackerApi.post("edit-awb", formValue);

    if (!request) {
      alert.error("Something went wrong.");
    } else {
      const { data: response } = request;
      const { history } = this.props;

      if (response.success) {
        // Go to dashboard and set token

        this.getAwbDetails();
        history.push("/dashboard");

        alert.success(response.msg, { timeout: 3000 });
      } else {
        alert.error(response.msg);
      }
    }
  };

  componentDidMount() {
    this.getAwbDetails();
  }

  render() {
    const { path } = this.props.match;

    return (
      <div>
        <Navbar {...this.props} />

        <Route
          exact
          path={path}
          component={() => (
            <TableView
              {...this.state}
              {...this.props}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              deleteAwb={this.deleteAwb}
            />
          )}
        />

        <Route
          exact
          path={`${path}/add`}
          component={() => (
            <AddEditAwb
              formFields={addAwbForm}
              buttonText="Add AWB"
              onSubmit={this.addAwb}
            />
          )}
        />

        <Route
          exact
          path={`${path}/addtrack`}
          component={props => (
            <AddEditAwb
              {...props}
              formFields={statusUpadteForm}
              buttonText="Add Tracking Details"
              onSubmit={this.addTrackingDetails}
            />
          )}
        />

        {/* <Route
          exact
          path={`${path}/edit`}
          component={() => (
            <AddEditAwb formFields={addAwbForm} buttonText="Edit AWB" />
          )}
        /> */}

        {/* <TableView headers={this.state.headers} data={this.state.awbList} /> */}
      </div>
    );
  }
}

export default withAlert()(Dashboard);
