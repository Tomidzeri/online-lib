import React from "react";
import { Link } from 'react-router-dom';

import classes from "../styles/layout.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/dashboard" className={classes.link}>
        <h1>Online Biblioteka</h1>
      </Link>
    </header>
  );
}

export default Header;
