import React from "react"
import { Route, Switch } from "react-router-dom";
import AccountRoutes from "./accounts";
import Profile from "./accounts/Profile";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import Home from "./Home";
import PostNew from "./PostNew";
import UserDetail from "pages/UserDetail";
import Login from "./accounts/Login";


function Root() {
  return (
    <>
      <Switch>
        <LoginRequiredRoute exact path="/" component={Home} />
        <LoginRequiredRoute exact path="/profile-edit" component={Profile} />
        <LoginRequiredRoute exact path="/:username" component={UserDetail} />
        <LoginRequiredRoute exact path="/post/new" component={PostNew} />
        <Route path="/accounts" component={AccountRoutes} />
      </Switch>
    </>
  )
}

export default Root;