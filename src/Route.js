import { useContext } from "react";
import { Route as RDRoute, Redirect, useLocation } from "react-router-dom";

import { AuthContext } from "./auth";
function validateRules(rules) {
  return true;
}
function Route(props) {
  const { pathname } = useLocation();
  const { user, loading } = useContext(AuthContext);
  const { children, protect, rules, ...rest } = props;
  if (!protect) return <RDRoute {...rest}>{children}</RDRoute>;
  if (loading) return "Loading...";

  return user && validateRules(rules) ? (
    <RDRoute {...rest}>{children}</RDRoute>
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: pathname } }} />
  );
}

export default Route;
