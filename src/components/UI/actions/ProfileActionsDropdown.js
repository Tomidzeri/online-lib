import React, { useState, useEffect } from "react";
import DeleteUser from "./profileActions/DeleteUser";
import classes from "./ActionsDropdown.module.css";

const ProfileDropdown = ({ user, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".profile-dropdown-container")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left profile-dropdown-container">
      <div className="pb-5">
        <button
          onClick={toggleDropdown}
          style={{
            fontSize: "32px",
            writingMode: "vertical-tb",
            textOrientation: "mixed",
          }}
        >
          ...
        </button>
      </div>

      {isOpen && (
        <div className={`${classes.dropdownContent} ${classes.show}`}>
            <DeleteUser user={user} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
