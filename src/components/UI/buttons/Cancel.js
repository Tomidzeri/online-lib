import React from "react";
import PropTypes from "prop-types";

const Cancel = ({ children, onClick }) => {
  return (
    <button
      className="mt-24 bg-red-500 hover-bg-red-600 text-white px-2 py-2 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Cancel.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Cancel;
