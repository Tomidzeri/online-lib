import React, { useState } from "react";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const BookActionsDropdown = ({ book, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleViewDetailsClick = () => {
    navigate(`/viewbook/${book.id}`);
    closeDropdown();
  };


  return (
    <div className={classes.dropdown}>
      <button
        className={`${classes.dropdownBtn} ${showDropdown ? classes.active : ""}`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        ...
      </button>
      {showDropdown && (
        <div className={`${classes.dropdownContent} ${classes.show}`}>
          <button className={classes.dropdownBtn} onClick={handleViewDetailsClick}>
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default BookActionsDropdown;
