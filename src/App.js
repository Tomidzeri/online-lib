import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const storedToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(storedToken || "");

  const handleSetToken = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} /> 
      <AppRoutes handleSetToken={handleSetToken} setToken={setToken} token={token} />
    </BrowserRouter>
  );
}

export default App;
