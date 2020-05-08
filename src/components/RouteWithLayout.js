import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import { Minimal as MinimalLayout } from "../layouts";
import { Login as LoginView, Register as RegisterView } from "../views";

import { isAuthenticated } from "../services/auth";

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  const returnViewsLoginOrRegister = (matchProps) => {
    if (rest.location.pathname === "/register") {
      return (
        <MinimalLayout>
          <RegisterView {...matchProps} />
        </MinimalLayout>
      );
    } else {
      return (
        <MinimalLayout>
          <LoginView {...matchProps} />
        </MinimalLayout>
      );
    }
  };

  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return !isAuthenticated() ? (
          returnViewsLoginOrRegister(matchProps)
        ) : (
          <Layout>
            <Component {...matchProps} />
          </Layout>
        );
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
