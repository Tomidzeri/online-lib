import React, { useState, useRef, useEffect } from "react";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const BookActionsDropdown = ({ book, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
  
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);
  
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleViewDetailsClick = () => {
    navigate(`/viewbook/${book.id}`);
    closeDropdown();
  };

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <button
        className={`${classes.dropdownBtn} ${
          showDropdown ? classes.active : ""
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        ...
      </button>
      {showDropdown && (
        <div className={`${classes.dropdownContent} ${classes.show}`}>
          <button className={classes.dropdownBtn} onClick={handleViewDetailsClick}>
            Pogledaj detalje
          </button>
        </div>
      )}
    </div>
  );
};

export default BookActionsDropdown;
