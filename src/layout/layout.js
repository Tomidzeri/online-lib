import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Librarians from "../pages/Librerians";
import Students from "../pages/Students";
import Books from "../pages/Books";
import Settings from "../pages/Settings";

const Layout = ({ children, userProfile }) => {
  const currentPath = window.location.pathname;

  return (
    <>
      <Header />
      <Sidebar />
      <div>
      {currentPath === "/librerians" && <Librarians userProfile={userProfile} />}
        {currentPath === "/students" && <Students userProfile={userProfile} />}
        {currentPath === "/books" && <Books />}
        {currentPath === "/settings" && <Settings />}
        {!["/librerians", "/students", "/books", "/settings"].includes(
          currentPath
        ) && children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
