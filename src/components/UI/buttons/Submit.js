import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css"; 

const Submit = ({ children, onClick }) => {
  return (
    <button className={classes.submit} onClick={onClick}>
      {children}
    </button>
  );
};

Submit.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Submit;
