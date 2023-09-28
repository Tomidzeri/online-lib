import React, { useState, useRef, useEffect } from "react";
import CancelReservationAction from "./bookActions/CancelReservationBook";
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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleBorrowClick = () => {
    navigate(`/borrowbook/${book.id}`);
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
          <button className={classes.dropdownBtn} onClick={handleBorrowClick}>
            Izdaj knjigu
          </button>
          <CancelReservationAction book={book} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default BookActionsDropdown;
