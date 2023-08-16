import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./services/Login";
import PrivateRoute from "./services/PrivateRoute";

import Signup from "./services/Signup";
import Layout from "./layout/layout";
function App() {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || "");

  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<PrivateRoute element={<Login setToken={handleSetToken} />} authenticated={!token} />}
        />
        <Route
          path="/signup"
          element={<PrivateRoute element={<Signup setToken={handleSetToken} />} authenticated={!token} />}
        />
        <Route
          path="/dashboard"
          element={<Layout token={token} setToken={setToken} />}
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;