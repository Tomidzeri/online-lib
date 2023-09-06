import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css"; 

const Cancel = ({ children, onClick }) => {
  return (
    <button className={classes.cancel} onClick={onClick}>
      {children}
    </button>
  );
};

Cancel.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Cancel;
