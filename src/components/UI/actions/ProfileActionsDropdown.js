import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ user, onPasswordReset, onDeleteUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = () => {
    navigate(`/editprofile/${user.id}`);
    toggleDropdown();
  };

  // Function to close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".profile-dropdown-container")) {
      setIsOpen(false);
    }
  };

  // Add event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left profile-dropdown-container">
      <div>
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={handleEditClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              Izmijeni detalje
            </button>
            <button
              onClick={onPasswordReset}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              Resetuj lozinku
            </button>
            <button
              onClick={onDeleteUser}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            >
              Deaktiviraj profil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
