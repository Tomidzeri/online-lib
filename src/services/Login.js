import React, { useState } from "react";
import libraryAPI from "../utils/api";
import { useNavigate } from 'react-router-dom';
import classes from "../styles/form.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const device = "DivajsNejm";

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await libraryAPI.post("/login", {
        username,
        password,
        device,
      });

      const { token } = response.data.data;
      localStorage.setItem("token", token);

      navigate("/dashboard");

      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={classes.form}>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>Create new.</button>
      </p>
    </div>
  );
}

export default Login;
