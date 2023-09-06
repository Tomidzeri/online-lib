import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const storedToken = sessionStorage.getItem("token");
  const [token, setToken] = useState(storedToken || "");

  const handleSetToken = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <AppRoutes handleSetToken={handleSetToken} setToken={setToken} token={token} />
    </BrowserRouter>
  );
}

export default App;
