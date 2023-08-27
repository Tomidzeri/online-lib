import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, authenticated }) => {
  return authenticated ? <Navigate to="/dashboard" /> : element;
};

export default PrivateRoute;
