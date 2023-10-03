import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "./animation.json"; 
import Activities from "./dashboard-content/Activities";
import Statistics from "./dashboard-content/Statistics";
import Reservations from "./dashboard-content/Reservations";
import "./dashboard-content/Dashboard.css";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData, 
  };

  const animationStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px", 
    height: "300px", 
    backgroundColor: "transparent", 
  };

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div className="loading-animation">
          <div style={animationStyle}>
            <Lottie options={defaultOptions} />
          </div>
        </div>
      ) : (
        <>
          <div className="left-pane">
            <Activities />
          </div>
          <div className="right-pane flex flex-col">
            <Reservations />
            <Statistics />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
