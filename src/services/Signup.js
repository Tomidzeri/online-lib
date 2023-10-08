import { useState } from "react";
import { useNavigate } from "react-router-dom";
import libraryAPI from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSignup = async () => {
    try {
      const response = await libraryAPI.post("/register", {
        name,
        surname,
        email,
        username,
        password,
        password_confirmation: passwordConfirmation,
        device: "DivajsNejm2",
      });

      sessionStorage.setItem("token", response.data.token);

      console.log("Signup success:", response.data);
      
      if (response.status <= 400) {
        navigate("/login");
      }
      
      console.log("Signup Response:", response.data);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return { 
    name,
    surname,
    email,
    username,
    password,
    passwordConfirmation,
    setName,
    setSurname,
    setEmail,
    setUsername,
    setPassword,
    setPasswordConfirmation,
    handleSignup
  };
};

export default Signup;
