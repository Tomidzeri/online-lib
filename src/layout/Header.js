import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../services/Logout";
import { FaBell, FaBars } from "react-icons/fa";
import { BiCross, BiSolidUserCircle } from "react-icons/bi";
import { MdLocalLibrary } from "react-icons/md";
import { useNavigation } from "./navigation";
import "./styles/header.css";
import { RiProfileLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCrossDropdown, setShowCrossDropdown] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("libraryRole");

  const redirectToBooks = () => {
    if (userRole === "Učenik") {
      navigate("/books");
    } else {
      navigate("/dashboard");
    }
  };

  const { navigateToProfile, navigateToAddUser } =
    useNavigation();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowCrossDropdown(false);
  };

  const toggleCrossDropdown = () => {
    setShowCrossDropdown(!showCrossDropdown);
    setShowProfileDropdown(false);
  };

  const closeDropdowns = () => {
    setShowProfileDropdown(false);
    setShowCrossDropdown(false);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className="bg-blue-900 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: "#4558BE", height: "4rem" }}
    >
      <div className="flex items-center">
        {window.innerWidth <= 768 && (
          <button
          className="text-white text-2xl"
          onClick={toggleSidebar}
          style={{ marginRight: "1rem" }}
        >
          <FaBars />
        </button>
        )}
        <button className="flex items-center text-white" onClick={redirectToBooks}>
          <MdLocalLibrary className="text-4xl mr-2" />
          <h1
            className={`text-white text-2xl ${
              sidebarVisible ? "hidden" : ""
            }`}
          >
            Online Biblioteka
          </h1>
        </button>
      </div>
      <div className="flex items-center text-white">
        <Link to="/activities" className="text-2xl mr-2">
          <FaBell
            className="cursor-pointer bell-icon"
            aria-label="Activities"
          />
        </Link>
        <div className="w-1 h-6 bg-white mx-2"></div>
        <BiCross
          className="text-2xl mr-2 cursor-pointer cross-icon"
          onClick={toggleCrossDropdown}
        />
        <p className="text-white text-xl font-bold mr-2">bildstudio</p>
        <div className="relative inline-block text-white">
          <BiSolidUserCircle
            className="text-3xl cursor-pointer profile-icon"
            onClick={toggleProfileDropdown}
          />
          <div
            className={`absolute right-0 mt-3 bg-white text-black shadow-lg rounded py-2 w-40 text-center dropdown-menu ${
              showProfileDropdown
                ? "dropdown-open"
                : "dropdown-closed pointer-events-none"
            }`}
          >
            <button
              onClick={navigateToProfile}
              className="block px-4 py-2 hover:font-bold hover:underline flex items-center justify-center"
            >
              <RiProfileLine className="text-2l mr-2" />
              View Profile
            </button>
            <Logout onSuccess={closeDropdowns} />
          </div>
        </div>
        <div className="relative inline-block">
          <div
            className={`absolute right-32 mt-7 bg-white text-black shadow-lg rounded py-2 w-40 text-center dropdown-menu ${
              showCrossDropdown
                ? "dropdown-open"
                : "dropdown-closed pointer-events-none"
            }`}
          >
            <button
              onClick={() => navigateToAddUser("Bibliotekar")}
              className="block px-4 py-2 hover:font-bold hover:underline"
            >
              Novi Bibliotekar
            </button>
            <button
              onClick={() => navigateToAddUser("Učenik")}
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
