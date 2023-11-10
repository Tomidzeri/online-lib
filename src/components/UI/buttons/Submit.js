import React from "react";
import PropTypes from "prop-types";

const Submit = ({ children, onClick }) => {
  return (
    <button
      className="mt-24 mr-4 bg-blue-500 hover-bg-blue-600 text-white px-2 py-2 rounded-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Submit.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default Submit;
