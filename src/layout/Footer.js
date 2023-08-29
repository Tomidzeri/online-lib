import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
    return ( <
        footer className = { classes.footer } >
        <
        p >
        &
        copy; { new Date().getFullYear() }
        Your Company Name.All rights reserved. <
        /p> <
        /footer>
    );
};

export default Footer;