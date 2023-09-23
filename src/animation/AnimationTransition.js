// AnimationTransition.js

import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import LoginForm from "../pages/service-pages/LoginForm";
import Dashboard from "../layout/Dashboard";

const AnimationTransition = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const handleLogin = () => {
    // You can implement your login logic here.
    // Set isLoggedIn to true once the user is logged in.
    setIsLoggedIn(true);
  };

  return (
    <div className="animation-transition-container">
      {isLoading ? (
        <div className="loading-animation">
          <div className="centered-animation"></div>
          <p style={{ color: "blue" }}>Loading...</p>
          <div style={animationStyle}>
            <Lottie options={defaultOptions} />
          </div>
        </div>
      ) : (
        <>
          {isLoggedIn ? (
            <Dashboard />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </>
      )}
    </div>
  );
};

export default AnimationTransition;
