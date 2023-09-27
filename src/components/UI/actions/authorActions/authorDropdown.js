import React, { useState, useRef, useEffect } from "react";
import DeleteAuthor from "./DeleteAuthor";
import classes from "../ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const AuthorDropdownList = ({ author, onDelete, showEditAndDeleteButtons }) => {
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

  const handleEditClick = () => {
    navigate(`/editauthor/${author.id}`);
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
          <button className={classes.dropdownBtn} onClick={handleEditClick}>
            Izmijeni detalje autora
          </button>
          <DeleteAuthor author={author} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default AuthorDropdownList;
