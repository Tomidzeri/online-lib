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

      const { token } = response.data.data;
      sessionStorage.setItem("token", token);

      navigate("/dashboard");

      console.log("Login successful. Token:", response.data.data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { username, password, setUsername, setPassword, handleLogin };
}

export default Login;
