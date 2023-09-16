import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../services/Logout";
import { FaBell } from "react-icons/fa";
import { BiCross, BiSolidUserCircle } from "react-icons/bi";
import { MdLocalLibrary } from "react-icons/md";

const Header = ({ className }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCrossDropdown, setShowCrossDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowCrossDropdown(false); // Close the other dropdown if open
  };

  const toggleCrossDropdown = () => {
    setShowCrossDropdown(!showCrossDropdown);
    setShowProfileDropdown(false); // Close the other dropdown if open
  };

  const closeDropdowns = () => {
    setShowProfileDropdown(false);
    setShowCrossDropdown(false);
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
    closeDropdowns();
  };

  const navigateToProfile = () => {
    navigate("/profile");
    closeDropdowns();
  };

  return (
    <header className="bg-blue-900 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex">
        <button
          className="flex items-center text-white"
          onClick={navigateToDashboard}
        >
          <MdLocalLibrary className="text-4xl mr-2" />
          <h1 className="text-white text-2xl">Online Biblioteka</h1>
        </button>
      </div>
      <div className="flex items-center text-white">
        <FaBell className="text-2xl mr-2" />
        <div className="w-1 h-6 bg-white mx-2"></div>
        <BiCross
          className="text-2xl mr-2 cursor-pointer"
          onClick={toggleCrossDropdown}
        />
        <p className="text-white text-xl font-bold mr-2">bildstudio</p>
        <div className="relative inline-block text-white">
          <BiSolidUserCircle
            className="text-3xl cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          <div
            className={`absolute right-0 mt-8 bg-white text-black shadow-lg rounded py-2 w-40 text-center ${
              showProfileDropdown ? "block" : "hidden"
            }`}
          >
            <button
              to="/profile"
              onClick={navigateToProfile}
              className="block px-4 py-2 hover:font-bold hover:underline"
            >
              View Profile
            </button>
            <Logout onSuccess={closeDropdowns} />
          </div>
        </div>
        <div className="relative inline-block">
          <div
            className={`absolute right-0 mt-8 bg-white text-black shadow-lg rounded py-2 w-40 text-center ${
              showCrossDropdown ? "block" : "hidden"
            }`}
          >
            <button
              onClick={() =>
                (window.location.href = "/useraddform?role=Bibliotekar")
              }
              className="block px-4 py-2 hover:font-bold hover:underline"
            >
              Novi Bibliotekar
            </button>
            <button
              onClick={() =>
                (window.location.href = "/useraddform?role=Učenik")
              }
              className="block px-4 py-2 hover:font-bold hover:underline"
            >
              Novi Učenik
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
