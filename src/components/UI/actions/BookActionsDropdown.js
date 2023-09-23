import React, { useState } from "react";
import DeleteBook from "./bookActions/DeleteBook";
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

  const handleEditClick = () => {
    navigate(`/editbook/${book.id}`);
    closeDropdown();
  };

  const handleBorrowClick = () => {
    navigate(`/borrowbook/${book.id}`);
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
            Pogledaj detalje
          </button>
          <button className={classes.dropdownBtn} onClick={handleEditClick}>
            Izmijeni detalje
          </button>
          <button className={classes.dropdownBtn} onClick={handleBorrowClick}>
            Izdaj knjigu
          </button>
          <DeleteBook book={book} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default BookActionsDropdown;
