import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteAuthor from "./authorActions/DeleteAuthor";
import classes from "./ActionsDropdown.module.css"

const AuthorActionsDropdown = ({ author, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const closeDropdown = () => {
    setShowDropdown(false);
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
          <button onClick={closeDropdown}>Close</button>
          <Link to={`/viewauthor/${author.id}`} className={classes.dropdownBtn}>
            View Details
          </Link>
          <Link to={`/editauthor/${author.id}`} className={classes.dropdownBtn}>
            Edit
          </Link>
          <DeleteAuthor author={author} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default AuthorActionsDropdown;
