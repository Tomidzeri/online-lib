import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, authenticated }) => {
  const storedToken = localStorage.getItem("token") || localStorage.getItem("token");
  return storedToken ? <Navigate to="/dashboard" /> : element;
};


export default PrivateRoute;
