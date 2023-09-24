import React, { useState } from "react";
import DeleteAuthor from "./authorActions/DeleteAuthor";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const AuthorActionsDropdown = ({ author, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleViewDetailsClick = () => {
    navigate(`/viewauthor/${author.id}`);
    closeDropdown();
  };

  const handleEditClick = () => {
    navigate(`/editauthor/${author.id}`);
    closeDropdown();
  };

  return (
    <div className={classes.dropdown}>
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
            View Details
          </button>
          <button className={classes.dropdownBtn} onClick={handleEditClick}>
            Edit
          </button>
          <DeleteAuthor author={author} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default AuthorActionsDropdown;
