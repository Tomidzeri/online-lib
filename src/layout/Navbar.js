import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../services/Logout";
import layoutStyles from "../styles/layout.module.css";

import rightIcon from "../svg/right.svg";

function Navbar({ token, setToken }) {
  const [isHovered, setIsHovered] = useState(false);

  const toggleNavbar = () => {
    setIsHovered(!isHovered);
  };

  return (
    <nav
      className={`${layoutStyles.navbar} ${isHovered ? "" : layoutStyles.hidden}`}
      onMouseEnter={toggleNavbar}
      onMouseLeave={toggleNavbar}
    >
      <div className={layoutStyles.navbarContent}>
        <div>
          {!isHovered && <img src={rightIcon} alt="Right Icon" />}
        </div>
        <ul className={`${layoutStyles.navList} ${isHovered ? "" : layoutStyles.hidden}`}>
          {token ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className={layoutStyles.logoutButton}>
                <Logout token={token} setToken={setToken} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
