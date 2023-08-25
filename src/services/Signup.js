import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import libraryAPI from "../utils/api";
import classes from "../styles/form.module.css";

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

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Signup failed:", response.data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className={classes.form}>
      <h2>Signup Page</h2>
      <div className={classes.signup}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={() => navigate("/login")}>Back to login.</button>
    </div>
  );
};

export default Signup;
