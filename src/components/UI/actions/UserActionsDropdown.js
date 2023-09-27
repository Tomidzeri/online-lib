import React, { useState, useRef, useEffect } from "react";
import DeleteUser from "../../UI/actions/userActions/DeleteUser";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";

const UserActionsDropdown = ({ user, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleViewDetailsClick = () => {
    navigate(`/viewuserdetails/${user.id}`);
    closeDropdown();
  };

  const handleEditClick = () => {
    navigate(`/edituserform/${user.id}`);
    closeDropdown();
  };

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <button
        className={`${classes.dropdownBtn} ${
          showDropdown ? classes.active : ""
        }`}
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ fontSize: "32px", writingMode: "horizontal-tb", textOrientation: "mixed" }}
      >
        ...
      </button>
      {showDropdown && (
        <div className={`${classes.dropdownContent} ${classes.show}`}>
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
