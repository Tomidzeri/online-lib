import React from "react";
// import Ucenici from "../pages/Ucenici";
// import Bibliotekari from "../pages/Bibliotekari";
import { Outlet } from "react-router-dom";
import ProfileContent from "../components/Profile";

function MainContent({ userRole }) {
  return (
    <div>
      {/* Render different components based on the route */}
      <Outlet /> {/* This renders the appropriate component based on the route */}
      {userRole === 1 && <ProfileContent />} {/* Display the profile for bibliotekari */}
    </div>
  );
}

export default MainContent;
