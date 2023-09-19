import React from "react";
import classes from "./sidebar.module.css";
import { FcLibrary } from "react-icons/fc";
import { FaRegAddressBook } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { BsBook, BsGear } from "react-icons/bs";
import { GoArrowSwitch } from "react-icons/go";
import {
  useNavigateToDashboard,
  useNavigateToLibrarians,
  useNavigateToStudents,
  useNavigateToBooks,
  useNavigateToAuthors,
  useNavigateToSettings,
  useNavigateToBorrows,
} from "./navigation";

const Sidebar = ({ className }) => {
  const navigateToDashboard = useNavigateToDashboard();
  const navigateToLibrarians = useNavigateToLibrarians();
  const navigateToStudents = useNavigateToStudents();
  const navigateToBooks = useNavigateToBooks();
  const navigateToAuthors = useNavigateToAuthors();
  const navigateToSettings = useNavigateToSettings();
  const navigateToBorrows = useNavigateToBorrows();

  return (
    <div className={`${classes.list} ${className}`}>
      <div className={classes.listContent}>
        <button onClick={navigateToDashboard}>
          <FcLibrary className={classes.icon} />
        </button>
        <button onClick={navigateToDashboard}>
          <p>Dashboard</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToLibrarians}>
          <FaRegAddressBook className={classes.icon} />
        </button>
        <button onClick={navigateToLibrarians}>
          <p>Bibliotekari</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToStudents}>
          <PiStudentFill className={classes.icon} />
        </button>
        <button onClick={navigateToStudents}>
          <p>Ucenici</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToBooks}>
          <BsBook className={classes.icon} />
        </button>
        <button onClick={navigateToBooks}>
          <p>Knjige</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToAuthors}>
          <FaRegAddressBook className={classes.icon} />
        </button>
        <button onClick={navigateToAuthors}>
          <p>Autori</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToBorrows}>
          <GoArrowSwitch className={classes.icon} />
        </button>
        <button onClick={navigateToBorrows}>
          <p>Izdavanje</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToSettings}>
          <BsGear className={classes.icon} />
        </button>
        <button onClick={navigateToSettings}>
          <p>Podesavanja</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
