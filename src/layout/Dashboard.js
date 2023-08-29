import React from "react";
import Activities from "./dashboard/Activities";
import Reservations from "./dashboard/Reservations";
import Statistics from "./dashboard/Statistics";
import "./dashboard/Dashboard.css";

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
