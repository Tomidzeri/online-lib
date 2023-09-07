import React from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD:src/pages/service-pages/LoginForm.js
import Login from "../../services/Login";
import classes from "./service.module.css";
=======
import Login from "../services/Login";
import classes from "../styles/form.module.css";
>>>>>>> eb74f6a79c9477e4435551fb532fd862c09954af:src/pages/LoginForm.js

function LoginForm() {
    const { username, password, setUsername, setPassword, handleLogin } = Login();
    const navigate = useNavigate();

    return ( <
        div className = { classes.form } >
        <
        h2 > Login Page < /h2> <
        input type = "text"
        placeholder = "Username"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value) }
        /> <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        /> <
        button onClick = { handleLogin } > Login < /button> <
        p >
        Don 't have an account?{" "} <
        button onClick = {
            () => navigate("/signup") } > Create new. < /button> <
        /p> <
        /div>
    );
}

export default LoginForm;