import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "../components/UI/actions/ProfileActionsDropdown";
import ReactModal from "react-modal";
import { GiCrossMark, GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateUser } from "../queries/profileInfo/updateUserData";
import photo from "../Images/photo.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ProfileData } from "../queries/profileInfo/useProfileData";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await ProfileData();
        const userData = userDataResponse.data;

        setUserData(userData.data);

        // Simulate a delay to show the loading icon for a moment
        setTimeout(() => {
          setIsLoading(false); // Set loading state to false after data is fetched
        }, 1000); // Adjust the delay time as needed
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validatePasswordConfirmation = () => {
    if (currentPassword !== userData.password) {
      setPasswordError("Trenutna lozinka nije ispravna.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordUpdate = async () => {
    validatePasswordConfirmation();

    if (passwordError) {
      return;
    }

    try {
      const updatedData = await UpdateUser({
        password: newPassword,
        password_confirmation: passwordConfirmation,
      });
      console.log("Password updated:", updatedData);
      toast.success("Lozinka uspješno izmijenjena.");
      closeModal();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Greška prilikom izmjene lozinke.");
    }
  };

  const navigation = () => {
    if (userData && userData.role === "Bibliotekar") {
      navigate("/librarians");
    } else if (userData && userData.role === "Učenik") {
      navigate("/students");
    }
  };

  const roleDisplay = () => {
    if (userData && userData.role === "Bibliotekar") {
      return <p>Svi Bibliotekari</p>;
    } else if (userData && userData.role === "Učenik") {
      return <p>Svi Ucenici</p>;
    }
  };

  return (
    <div className="mt-12 flex flex-col">
      <div className="w-full">
        <div className="flex flex-row justify-between border-b border-gray-300 w-full fixed">
          <div className="flex flex-col ml-16">
            <Typography variant="h4" align="center" padding="3px">
              {userData?.name} {userData?.surname}
            </Typography>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={navigation}
            >
              {roleDisplay()}
            </button>
          </div>
          <div className="flex items-center mr-12">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={openModal}
            >
              Promeni lozinku
            </button>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => {
                navigate("/editprofile");
              }}
            >
              &nbsp;&nbsp;&nbsp;Izmijeni podatke
            </button>
            <span className="mx-2 border-l border-gray-300 h-8" />
            <div className="flex flex-row justify-center items-center">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-24">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : (
          <div className="flex">
            <div className="flex flex-col justify-center items-center">
              <div className="bg-white rounded-lg shadow-lg ml-24">
                <div className="relative">
                  <img
                    src={photo}
                    alt="Slika"
                    className="w-full h-auto max-h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></div>{" "}
                  {/* this code creates a shadow, pretty cool style */}
                </div>
                <div className="p-4">
                  <h5 className="text-xl font-semibold">Ime i prezime:</h5>
                  <p className="text-gray-700">
                    {userData?.name} {userData?.surname}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-4">
              <div className="bg-white rounded-lg shadow-lg mt-4 mb-10">
                <div className="p-4">
                  <h5 className="text-xl font-semibold">E-mail:</h5>
                  <p className="text-blue-500">{userData?.email}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg mb-10">
                <div className="p-4">
                  <h5 className="text-xl font-semibold">Korisnicko ime:</h5>
                  <p className="text-gray-700">{userData?.username}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg mb-4">
                <div className="p-4">
                  <h5 className="text-xl font-semibold">Tip korisnika:</h5>
                  <p className="text-gray-700">{userData?.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Change Password Modal"
        className="password-modal"
        overlayClassName="password-modal-overlay"
      >
        <div className="password-modal-content">
          <h2>Izmijeni lozinku</h2>
          <input
            type="password"
            placeholder="Trenutna lozinka"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nova lozinka"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Potvrdi lozinku"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          <div className="password-modal-buttons">
            <button onClick={closeModal} className="cancel-button">
              <GiCrossMark color="#f44336" />{" "}
            </button>
            <button onClick={handlePasswordUpdate} className="success-button">
              <GiCheckMark color="#007bff" />{" "}
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Profile;
