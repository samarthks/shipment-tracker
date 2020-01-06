import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { DashboardGuard, LoginSignupGuard } from "../RouteGuards";

import Error404 from "./404";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./LoginScreen/LoginPage";
import SignupPage from "./SignupScreen/SignupPage";
import TrackingPage from "./TrackingScreen/TrackingPage";

class App extends Component {
  // state = {  }
  render() {
    return (
      <div>
        {/* <div>
          <Link to="/track">Track</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div> */}

        <Switch>
          <Redirect exact path="/" to="/track" />

          <Route path="/track" component={TrackingPage} />
          <Route
            path="/login"
            component={() => (
              <LoginSignupGuard path="/login" component={LoginPage} />
            )}
          />
          <Route
            path="/signup"
            component={() => (
              <LoginSignupGuard path="/signup" component={SignupPage} />
            )}
          />
          <Route
            path="/dashboard"
            component={() => (
              <DashboardGuard path="/dashboard" component={Dashboard} />
            )}
          />

          <Route component={Error404} />
        </Switch>
      </div>
    );

    // return <TrackingPage />;
    // return <LoginPage />;
    // return <SignupPage />;
  }
}

export default App;
