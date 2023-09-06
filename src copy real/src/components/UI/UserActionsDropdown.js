import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteUser from "./userActions/DeleteUser";
import classes from "./UserActionsDropdown.module.css";

const UserActionsDropdown = ({ user, onDelete }) => {
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
          <Link to={`/viewuserdetails/${user.id}`} className={classes.dropdownBtn}>
            View Details
          </Link>
          <Link to={`/edituserform/${user.id}`} className={classes.dropdownBtn}>
            Edit
          </Link>
          <DeleteUser user={user} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default UserActionsDropdown;
