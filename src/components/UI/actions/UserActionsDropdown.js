import React, { useState, useRef, useEffect } from "react";
import DeleteUser from "../../UI/actions/userActions/DeleteUser";
import classes from "./ActionsDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { BiSolidUserDetail } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";

const UserActionsDropdown = ({ user, onDelete }) => {
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
          <BiSolidUserDetail className="inline-block text-xl mr-4 transition-colors duration-100 hover:text-blue-600" />
            Pogledaj detalje
          </button>
          <button className={classes.dropdownBtn} onClick={handleEditClick}>
          <AiFillEdit className="inline-block text-xl mr-4 transition-colors duration-100 hover:text-blue-600" />
            Izmijeni detalje
          </button>
          <DeleteUser user={user} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default UserActionsDropdown;
