import React, { useState } from "react";
import "./styles/Layout.css";
import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function LayoutApp({ userProfile }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <Header className="header" toggleSidebar={toggleSidebar} />
      <div className="content-area">
        {/* Pass sidebarVisible prop to Sidebar */}
        <Sidebar className="sidebar" sidebarVisible={sidebarVisible} />
        <main>
          <Outlet userProfile={userProfile} />
        </main>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default LayoutApp;
