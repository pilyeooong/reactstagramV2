import React from "react";
import { Route } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import LogoutOnlyRoute from "utils/LogoutOnlyRoute.js.js";

function Routes({ match }) {
  return (
    <>
      <LogoutOnlyRoute exact path={match.url + "/login"} component={Login} />
      <Route exact path={match.url + "/profile"} component={Profile} />
      <LogoutOnlyRoute exact path={match.url + "/signup"} component={Signup} />
    </>
  )
}
export default Routes;