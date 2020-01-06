import React, { Component } from "react";
import awbTrackerApi from "../../API";
import { withAlert } from "react-alert";

class SignupPage extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  styleObject = {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    justifyContent: "center"
  };

  handleInputChange = e => {
    const { name: filedName, value: fieldValue } = e.target;
    this.setState({ [filedName]: fieldValue });
  };

  handleSubmit = async () => {
    const { alert } = this.props;
    alert.info("Signing Up! Please wait...", { timeout: 1000 });
    const request = await awbTrackerApi.post("register", this.state);

    if (!request) {
      alert.error("Something went wrong.");
    } else {
      const { data: response } = request;
      const { history } = this.props;

      if (response.success) {
        // Go to dashboard and set token
        history.push("/login");
        localStorage.setItem("token", response.token);

        alert.success(response.msg, { timeout: 2000 });
      } else {
        alert.error(response.msg);
      }
    }
  };

  render() {
    return (
      <div className="container" style={this.styleObject}>
        <div className="card">
          <div className="card-body">
            <h1 className="text-center font-weight-light">Sign-Up</h1>

            <div className="form-group">
              <label htmlFor="nameInput">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailInput">Email Address</label>
              <input
                type="text"
                className="form-control"
                id="emailInput"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="text-center">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(SignupPage);
