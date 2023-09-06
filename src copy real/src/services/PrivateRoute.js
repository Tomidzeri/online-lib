import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, authenticated }) => {
  const storedToken = sessionStorage.getItem("token") || sessionStorage.getItem("token");
  return storedToken ? <Navigate to="/dashboard" /> : element;
};


export default PrivateRoute;
