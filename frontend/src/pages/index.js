import React from "react"
import { Route, Switch } from "react-router-dom";
import AccountRoutes from "./accounts";
import Profile from "./accounts/Profile";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import Home from "./Home";
import PostNew from "./PostNew";
import UserDetail from "pages/UserDetail";


function Root() {
  return (
    <>
      <LoginRequiredRoute exact path="/" component={Home} />
      <Switch>
        <LoginRequiredRoute exact path="/profile-edit" component={Profile} />
        <LoginRequiredRoute exact path="/:username" component={UserDetail} />
      </Switch>
      <LoginRequiredRoute exact path="/post/new" component={PostNew} />
      <Route exact path="/accounts" component={AccountRoutes} />
    </>
  )
}

export default Root;