import { useState } from "react";
import libraryAPI from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileData } from "../queries/profileInfo/useProfileData";

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
      const formattedLoginTime = new Date().toISOString();
      const loginCount = parseInt(sessionStorage.getItem("loginCount")) || 0;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", name);
      sessionStorage.setItem("loginTime", formattedLoginTime);
      sessionStorage.setItem("loginCount", loginCount + 1);

      const userDataResponse = await ProfileData();
      const user = userDataResponse.data.data;

    console.log(user.role);

      sessionStorage.setItem("libraryRole", user.role);

      if (user.role === "Učenik") {
        navigate("/profile"); 
      } else if (user.role === "Administrator") {
        navigate("/settings"); 
      } else {
        navigate("/dashboard"); 
      }

      console.log("Login successful. Token:", token);
      console.log("Username:", name);
      console.log("Login time:", formattedLoginTime);

      toast.success("Uspešno ste se prijavili!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Prijava nije uspela. Molimo proverite svoje podatke.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return { username, password, setUsername, setPassword, handleLogin };
}

export default Login;
