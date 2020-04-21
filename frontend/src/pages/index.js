import React from "react"
import { Route } from "react-router-dom";
import AccountRoutes from "./accounts";
import Profile from "./accounts/Profile";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import Home from "./Home";


function Root() {
  return (
    <>
      <LoginRequiredRoute exact path="/" component={Home} />
      <LoginRequiredRoute exact path="/profile-edit" component={Profile} />
      <Route path="/accounts" component={AccountRoutes} />
    </>
  )
}

export default Root;