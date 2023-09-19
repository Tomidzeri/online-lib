import React from "react";
import "./styles/Layout.css";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout({ userProfile }) {
  return (
    <div>
      <Header className="header" />
      <div className="content-area">
        <Sidebar className="sidebar" />
        <main>
          <Outlet userProfile={userProfile} /> 
        </main>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Layout;
