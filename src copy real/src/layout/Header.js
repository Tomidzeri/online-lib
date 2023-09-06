import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./styles/header.module.css";
import Logout from "../services/Logout";
import { FaBell } from "react-icons/fa";
import { BiCross, BiSolidUserCircle } from "react-icons/bi";
import { MdLocalLibrary } from "react-icons/md";

const Header = ({ className }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCrossDropdown, setShowCrossDropdown] = useState(false);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowCrossDropdown(false); // Close the other dropdown if open
  };

  const toggleCrossDropdown = () => {
    setShowCrossDropdown(!showCrossDropdown);
    setShowProfileDropdown(false); // Close the other dropdown if open
  };

  const closeDropdowns = () => {
    setShowProfileDropdown(false);
    setShowCrossDropdown(false);
  };


  return (
    <header className={classes.header}>
      <div className={classes.title}>
        <Link to="/dashboard" className={classes.titleLink}>
          <MdLocalLibrary className={classes.libraryIconTitle} />
          <h1>Online Biblioteka</h1>
        </Link>
      </div>
      <div className={classes.icons}>
        <FaBell className={classes.icon} />
        <div className={classes.verticalLine}></div>
        <BiCross className={classes.icon} onClick={toggleCrossDropdown} />
        <p className={classes.bildStudio}>bildstudio</p>
        <div className={classes.profileDropdown}>
          <BiSolidUserCircle
            className={classes.profileIcon}
            onClick={toggleProfileDropdown}
          />
          <div
            className={`${classes.profileDropdownContent} ${
              showProfileDropdown ? classes.show : ""
            }`}
          >
            <Link to="/profile" onClick={closeDropdowns}>
              View Profile
            </Link>
            <Logout onSuccess={closeDropdowns} />
          </div>
        </div>
        <div className={classes.crossDropdown}>
          <div
            className={`${classes.crossDropdownContent} ${
              showCrossDropdown ? classes.show : ""
            }`}
          >
            <button
              onClick={() =>
                (window.location.href = "/useraddform?role=Bibliotekar")
              }
            >
              Novi Bibliotekar
            </button>
            <button
              onClick={() =>
                (window.location.href = "/useraddform?role=Učenik")
              }
            >
              Novi Učenik
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
