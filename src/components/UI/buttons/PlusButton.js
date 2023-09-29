import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css"; 
import { CgMathPlus } from "react-icons/cg";

const Button = ({ children, onClick }) => {
    return (
      <button className={classes.button} onClick={onClick}>
        <CgMathPlus className={classes.icon} /> 
        {children}
      </button>
    );
  };

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Button;
