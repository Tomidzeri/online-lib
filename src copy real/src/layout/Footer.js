import React from "react";
import classes from "./styles/footer.module.css";

const Footer = ({ className }) => {
  return (
    <footer className={classes.footer}>
      <p>
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
