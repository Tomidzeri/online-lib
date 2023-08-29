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

<<<<<<< HEAD
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
=======
        return ( <
            >
            <
            Header / >
            <
            Sidebar / >
            <
            div > {
                currentPath === "/librarians" && ( <
                    Librarians userProfile = { userProfile }
                    />
                )
            } {
                currentPath === "/students" && < Students userProfile = { userProfile }
                />} { currentPath === "/books" && < Books / > } { currentPath === "/settings" && < Settings / > } {
                    !["/librarians", "/students", "/books", "/settings"].includes(
                        currentPath
                    ) && children
                } <
                /div> <
                Footer / >
                    <
                    />
            );
        };
>>>>>>> 022d0703b8ff49cc20f4229c0b2d601a7592e3ec

        export default Layout;