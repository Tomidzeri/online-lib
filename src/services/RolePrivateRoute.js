import React from "react";
import { Navigate } from "react-router-dom";

const RolePrivateRoute = ({ element }) => {
  const storedToken =
    sessionStorage.getItem("token") || sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("libraryRole");

  if (!storedToken) {
    return element;
  }

  if (userRole === "Ucenik") {
    return <Navigate to="/books" />;
  }

  return element;
};

export default RolePrivateRoute;
