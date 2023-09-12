import React from "react";
import { Link } from "react-router-dom";
import { BsBook, BsGear } from "react-icons/bs";
import { FcLibrary } from "react-icons/fc";
import { FaRegAddressBook } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import classes from "./sidebar.module.css";

const Sidebar = ({ className }) => {
  return (
    <div className={`${classes.list} ${className}`}>
      <span className={classes.line}></span>
      <div className={classes.listContent}>
        <Link to="/dashboard">
          <FcLibrary className={classes.icon} />
        </Link>
        <Link to="/dashboard">
          <p>Dashboard</p>
        </Link>
      </div>
      <div className={classes.listContent}>
        <Link to="/librarians">
          <FaRegAddressBook className={classes.icon} />
        </Link>
        <Link to="/librarians">
          <p>Bibliotekari</p>
        </Link>
      </div>
      <div className={classes.listContent}>
        <Link to="/students">
          <PiStudentFill className={classes.icon} />
        </Link>
        <Link to="/students">
          <p>Ucenici</p>
        </Link>
      </div>
      <div className={classes.listContent}>
        <Link to="/books">
          <BsBook className={classes.icon} />
        </Link>
        <Link to="/books">
          <p>Knjige</p>
        </Link>
      </div>
      <div className={classes.listContent}>
        <Link to="/authors"> 
          <FaRegAddressBook className={classes.icon} /> 
        </Link>
        <Link to="/authors"> 
          <p>Authors</p> 
        </Link>
      </div>
      <div className={classes.listContent}>
        <Link to="/settings">
          <BsGear className={classes.icon} />
        </Link>
        <Link to="/settings">
          <p>Settings</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
