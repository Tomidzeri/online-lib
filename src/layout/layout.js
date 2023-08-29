// Layout.js
import React from "react";
import "./Layout.css"; // Import the CSS file
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Librarians from "../pages/Librarians";
import Students from "../pages/Students";
import Books from "../pages/Books";
import Settings from "../pages/Settings";
import Dashboard from "./Dashboard"; // Import the Dashboard component

const Layout = ({ children, userProfile }) => {
  const currentPath = window.location.pathname;

  return (
    <div className="layout-container">
      <Header className="header" />
      <div className="main-content">
        <Sidebar className="sidebar" />
        <div className="content-area">
          {currentPath === "/librarians" && (
            <Librarians userProfile={userProfile} />
          )}
          {currentPath === "/students" && <Students userProfile={userProfile} />}
          {currentPath === "/books" && <Books />}
          {currentPath === "/settings" && <Settings />}
          {currentPath === "/dashboard" && <Dashboard />}

          {![
            "/librarians",
            "/students",
            "/books",
            "/settings",
            "/dashboard",
          ].includes(currentPath) && children}
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default Layout;
