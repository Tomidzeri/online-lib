import React, { useState } from "react";
import DeleteUser from "./userActions/DeleteUser";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const UserActionsDropdown = ({ user, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleViewDetailsClick = () => {
    navigate(`/viewuserdetails/${user.id}`);
    closeDropdown();
  };

  const handleEditClick = () => {
    navigate(`/edituserform/${user.id}`);
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
          <button onClick={closeDropdown}>Close</button>
          <button className={classes.dropdownBtn} onClick={handleViewDetailsClick}>
            View Details
          </button>
          <button className={classes.dropdownBtn} onClick={handleEditClick}>
            Edit
          </button>
          <DeleteUser user={user} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default UserActionsDropdown;
