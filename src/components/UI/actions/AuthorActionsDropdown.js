import React, { useState, useRef, useEffect } from "react";
import DeleteAuthor from "./authorActions/DeleteAuthor";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const AuthorActionsDropdown = ({ author, onDelete, showEditAndDeleteButtons }) => {
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

  const handleViewDetailsClick = () => {
    navigate(`/viewauthor/${author.id}`);
    closeDropdown();
  };

  const handleEditClick = () => {
    navigate(`/editauthor/${author.id}`);
    closeDropdown();
  };

  useEffect(() => {
    if (dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const isDropdownBelowViewport = dropdownRect.bottom > window.innerHeight;

      if (isDropdownBelowViewport) {
        dropdownRef.current.style.bottom = "100%";
        dropdownRef.current.style.top = "auto";
      } else {
        dropdownRef.current.style.bottom = "auto";
        dropdownRef.current.style.top = "100%";
      }
    }
  }, [showDropdown]);

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
            Detalji autora
          </button>
          <button className={classes.dropdownBtn} onClick={handleEditClick}>
            Izmijeni detalje autora
          </button>
          <DeleteAuthor author={author} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default AuthorActionsDropdown;
