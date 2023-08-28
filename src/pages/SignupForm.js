import React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../services/Signup";
import classes from "../styles/form.module.css";

function SignupForm() {
  const { 
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
  } = Signup();
  const navigate = useNavigate();

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
}

export default SignupForm;
