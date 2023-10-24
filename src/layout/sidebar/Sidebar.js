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

const Sidebar = ({ className, sidebarVisible }) => {
  const navigateToDashboard = useNavigateToDashboard();
  const navigateToLibrarians = useNavigateToLibrarians();
  const navigateToStudents = useNavigateToStudents();
  const navigateToBooks = useNavigateToBooks();
  const navigateToAuthors = useNavigateToAuthors();
  const navigateToSettings = useNavigateToSettings();
  const navigateToBorrows = useNavigateToBorrows();

  const userRole = sessionStorage.getItem("libraryRole");

  return (
    <div
      className={`${classes.list} ${
        sidebarVisible ? classes.open : ""
      } ${className}`}
    >
      <div className={classes.listContent}>
        <button onClick={navigateToDashboard} disabled={userRole === "Učenik"}>
          <FcLibrary className={classes.icon} />
        </button>
        <button onClick={navigateToDashboard} disabled={userRole === "Učenik"}>
          <p>Dashboard</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button
          onClick={navigateToLibrarians}
          disabled={userRole === "Učenik" || userRole === "Bibliotekar"}
        >
          <FaRegAddressBook className={classes.icon} />
        </button>
        <button
          onClick={navigateToLibrarians}
          disabled={userRole === "Učenik" || userRole === "Bibliotekar"}
        >
          <p>Bibliotekari</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToStudents} disabled={userRole === "Učenik"}>
          <PiStudentFill className={classes.icon} />
        </button>
        <button onClick={navigateToStudents} disabled={userRole === "Učenik"}>
          <p>Ucenici</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button
          onClick={navigateToBooks}
          className={`${classes.myButton} ${
            userRole === "Ucenik" ? classes.ucenikStyle : ""
          }`}
        >
          <BsBook className={classes.icon} />
        </button>
        <button
          onClick={navigateToBooks}
          className={`${classes.myButton} ${
            userRole === "Ucenik" ? classes.ucenikStyle : ""
          }`}
        >
          <p>Knjige</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToAuthors} disabled={userRole === "Učenik"}>
          <FaRegAddressBook className={classes.icon} />
        </button>
        <button onClick={navigateToAuthors} disabled={userRole === "Učenik"}>
          <p>Autori</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToBorrows} disabled={userRole === "Učenik"}>
          <GoArrowSwitch className={classes.icon} />
        </button>
        <button onClick={navigateToBorrows} disabled={userRole === "Učenik"}>
          <p>Izdavanje</p>
        </button>
      </div>
      <div className={classes.listContent}>
        <button onClick={navigateToSettings} disabled={userRole === "Učenik" || userRole === "Bibliotekar"}>
          <BsGear className={classes.icon} />
        </button>
        <button onClick={navigateToSettings} disabled={userRole === "Učenik" || userRole === "Bibliotekar"}>
          <p>Podesavanja</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
