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

      const { token, role } = response.data.data; 
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);

      navigate("/dashboard");

      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { username, password, setUsername, setPassword, handleLogin };
}

export default Login;
