import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "stores/store";

export default function LogoutOnlyRoute({
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticated },
  } = useAppContext();
  return (
    <Route
      {...kwargs}
      render={(props) => {
        if (!isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
