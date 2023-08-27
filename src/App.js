import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./services/Login";
import PrivateRoute from "./services/PrivateRoute";
import Signup from "./services/Signup";
import Logout from "./services/Logout";
import Layout from "./layout/Layout";
import Profile from "./layout/Profile";
import Dashboard from "./layout/Dashboard";
import Books from "./pages/Books";
import Librarians from "./pages/Librerians";
import Students from "./pages/Students";
import Settings from "./pages/Settings";

function App() {
  const storedToken = sessionStorage.getItem("token");
  const storedUserRole = localStorage.getItem("userRole"); // Retrieve user's role
  const [token, setToken] = useState(storedToken || "");
  const [userRole, setUserRole] = useState(storedUserRole || ""); // Initialize user's role

  const handleSetToken = (newToken, newUserId) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PrivateRoute
              element={<Login setToken={handleSetToken} />}
              authenticated={!!token}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <PrivateRoute
              element={<Signup setToken={handleSetToken} />}
              authenticated={!!token}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute
              element={<Logout token={token} setToken={setToken} />}
              authenticated={!!token}
            />
          }
        />
        <Route
          path="*"
          element={
            <Layout token={token}>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute
                      element={<Profile />}
                      role={userRole} // Pass the user's role here
                    />
                  }
                />
                <Route path="/books" element={<Books />} />
                <Route path="/librerians" element={<Librarians />} />
                <Route path="/students" element={<Students />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
