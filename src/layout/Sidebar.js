import React from "react";
import { Link } from "react-router-dom";
import { BsHouseDoor, BsPerson, BsBook, BsGear } from "react-icons/bs"; 
import classes from "./sidebar.module.css";

const Sidebar = ({ className }) => {
  return (
    <div className={`${classes.list} ${className}`}>
      <Link to="/dashboard">
        <BsHouseDoor className={classes.icon} />
        <p>Dashboard</p>
      </Link>
      <Link to="/librarians">
        <BsPerson className={classes.icon} />
        <p>Bibliotekari</p>
      </Link>
      <Link to="/students">
        <BsPerson className={classes.icon} />
        <p>Ucenici</p>
      </Link>
      <Link to="/books">
        <BsBook className={classes.icon} />
        <p>Knjige</p>
      </Link>
      <Link to="/settings">
        <BsGear className={classes.icon} />
        <p>Settings</p>
      </Link>
    </div>
  );
};

export default Sidebar;
