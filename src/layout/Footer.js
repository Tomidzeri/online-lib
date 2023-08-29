import React from "react";
import classes from "./footer.module.css";

<<<<<<< HEAD
const Footer = ({ className }) => {
  return (
    <footer className={classes.footer}>
      <p>
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </p>
    </footer>
  );
=======
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
>>>>>>> 022d0703b8ff49cc20f4229c0b2d601a7592e3ec
};

export default Footer;