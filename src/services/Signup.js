import { useState } from "react";
import { useNavigate } from "react-router-dom";
import libraryAPI from "../utils/api";
import { toast } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("Uspešno ste se prijavili!", { 
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
      
      console.log("Signup Response:", response.data);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Prijava nije uspela. Molimo proverite svoje podatke.", { 
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
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
