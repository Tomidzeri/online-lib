import React from "react";
import "./styles/Layout.css"; 
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";
import Librarians from "../pages/user-pages/Librarians";
import Students from "../pages/user-pages/Students";
import Books from "../pages/book-pages/Books";
import Settings from "../pages/Settings";
import Dashboard from "./Dashboard"; 

const Layout = ({ children, userProfile }) => {
  const currentPath = window.location.pathname;

  return (
    <div className="layout-container">
      <Header className="header" />
      <div className="main-content">
        <Sidebar className="sidebar" />
        <div className="content-area">
          <span className="content-line"></span>
          {currentPath === "/librarians" && (
            <Librarians userProfile={userProfile} />
          )}
          {currentPath === "/students" && (
            <Students userProfile={userProfile} />
          )}
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
