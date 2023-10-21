import React, { useState, useRef, useEffect } from "react";
import DeleteBook from "../bookActions/DeleteBook";
import classes from "../ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const IzdateActionsDropdown = ({ book, onDelete, id }) => {
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

  const handleViewDetailsClick = () => {
    navigate(`/viewizdate/${id}`);
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

  const handleReturnClick = () => {
    setSelectedBookId(book.id);
    navigate(`/returnbook/${book.id}`);
    closeDropdown();
  };

  const handleWriteOffClick = () => {
    setSelectedBookId(book.id);
    navigate(`/writeoffbook/${book.id}`);
    closeDropdown();
  };

  const handleReserveClick = () => {
    setSelectedBookId(book.id);
    navigate(`/reservebook/${book.id}`);
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
          <button
            className={classes.dropdownBtn}
            onClick={handleViewDetailsClick}
          >
            Pogledaj detalje
          </button>
          <button className={classes.dropdownBtn} onClick={handleEditClick}>
            Izmijeni detalje
          </button>
          <button className={classes.dropdownBtn} onClick={handleBorrowClick}>
            Izdaj knjigu
          </button>
          <button
            className={classes.dropdownBtn}
            onClick={handleReturnClick}
            selectedbookid={selectedBookId}
          >
            Vrati knjigu
          </button>
          <button
            className={classes.dropdownBtn}
            onClick={handleWriteOffClick}
            selectedbookid={selectedBookId}
          >
            Otpisi knjigu
          </button>
          <button
            className={classes.dropdownBtn}
            onClick={handleReserveClick}
            selectedbookid={selectedBookId}
          >
            Reservisi knjigu
          </button>
          <DeleteBook book={book} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default IzdateActionsDropdown;
