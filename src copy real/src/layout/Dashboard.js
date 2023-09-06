import React from "react";
import Activities from "./dashboard-content/Activities";
import Reservations from "./dashboard-content/Reservations";
import Statistics from "./dashboard-content/Statistics";
import "./dashboard-content/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="left-pane">
        <Activities />
      </div>
      <div className="right-pane">
        <Reservations />
        <Statistics />
      </div>
    </div>
  );
};

export default Dashboard;
