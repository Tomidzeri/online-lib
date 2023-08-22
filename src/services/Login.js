import React, { useState } from "react";
import libraryAPI from "../utils/api";
import { useNavigate } from "react-router-dom";
import classes from "../styles/login.module.css";

function Login({ setToken }) {
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

      setToken(token);

      // Fetch user data using the obtained token
      try {
        const userResponse = await libraryAPI.post("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = userResponse.data.data;
        console.log("Logged-in User Data:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      navigate("/dashboard");

      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={classes.login_form}>
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
