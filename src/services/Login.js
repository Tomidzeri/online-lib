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

      const { token, role, id } = response.data.data; 
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userRole", role);
      sessionStorage.setItem("userId", id);

      navigate("/dashboard");

      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { username, password, setUsername, setPassword, handleLogin };
}

export default Login;
