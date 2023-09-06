import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css"; 

const Button = ({ children, onClick }) => {
  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
