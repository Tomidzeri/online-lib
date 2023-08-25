import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./header.module.css";
import Logout from "../services/Logout";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.title_link}>
        <h1>Online Biblioteka</h1>
      </Link>
      <div className={classes.dropdown}>
        <button className={classes.profileLink} onClick={toggleDropdown}>
          Profile
        </button>
        <div
          className={`${classes.dropdownContent} ${
            showDropdown ? classes.show : ""
          }`}
        >
          <Link to="/profile" onClick={closeDropdown}>
            View Profile
          </Link>
          <Logout onSuccess={closeDropdown} />
        </div>
      </div>
    </header>
  );
};

export default Header;
