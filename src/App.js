import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./services/Login";
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
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route
          path="/dashboard"
          element={<Layout token={token} setToken={setToken} />}
        />
        <Route path="/" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
