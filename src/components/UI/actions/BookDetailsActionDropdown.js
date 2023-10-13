import React, { useState, useRef, useEffect } from "react";
import DeleteBook from "./bookActions/DeleteBook";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const BookDetailsAction = ({ bookId, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

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

  const handleEditClick = () => {
    setSelectedBookId(bookId);
    navigate(`/editbook/${bookId}`);
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
          <button className={classes.dropdownBtn} onClick={handleEditClick}  selectedbookid={selectedBookId}>
            Izmijeni detalje
          </button>
          <DeleteBook bookId={bookId} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default BookDetailsAction;
