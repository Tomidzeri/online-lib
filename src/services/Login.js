import { useState } from "react";
import libraryAPI from "../utils/api";
import { useNavigate } from "react-router-dom";

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

      const { token, name } = response.data.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", name);

      console.log("Login successful. Token:", token);
      console.log("Name:", name);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { username, password, setUsername, setPassword, handleLogin };
}

export default Login;
