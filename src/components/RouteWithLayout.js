import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import { Minimal as MinimalLayout } from "../layouts";
import { Login as LoginView } from "../views";

const isAuthenticate = () => true;

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return !isAuthenticate() ? (
          <MinimalLayout>
            <LoginView />
          </MinimalLayout>
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
