import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateStudentRoute = ({ element, authenticated, student }) => {
  if (authenticated && student === "Učenik") {
    return <Route element={element} />;
  } else if (authenticated) {
    // Redirect to "/books" if the user is authenticated but not a student
    return <Navigate to="/books" />;
  } else {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }
};

export default PrivateStudentRoute;
