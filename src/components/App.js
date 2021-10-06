import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../App.css";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Profile from "./authentication/Profile";
import PrivateRoute from "./authentication/PrivateRoute";

import PublicUserRoute from "./authentication/PublicUserRoute";
import ForgotPassword from "./authentication/ForgotPassword";

import UpdateUser from "./authentication/UpdateUser";
import EditProfile from "./authentication/EditProfile";
import User from "./profileStats/User";
import Feeds from "./feed/Feeds";
function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />

        <Switch>
          {/* Feed Routes */}
          <PrivateRoute exact path="/" component={Feeds} />

          {/* Profile Related Routes */}
          <PrivateRoute exact path="/user" component={Profile} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/update-user" component={UpdateUser} />
          <PrivateRoute path="/user/:userId" component={User} />

          {/* Auth Routes */}
          <PublicUserRoute path="/login" component={Login} />
          <PublicUserRoute path="/signup" component={Register} />
          <PublicUserRoute path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
