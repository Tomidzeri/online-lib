import React, { useEffect, useState } from "react";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserActionsDropdown from "../components/UI/actions/UserActionsDropdown";
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

        setIsLoading(false);
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
          <div className="flex items-center mr-8">
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
              <UserActionsDropdown />
            </div>
          </div>
        </div>
      </div>
      <div className="w-96 mt-24 ml-16">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : userData ? (
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Paper>
                <Avatar
                  src={photo}
                  alt="User Photo"
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    margin: "0 auto",
                    marginTop: "2rem",
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Ime i prezime:</Typography>
                <Typography>
                  {userData.name} {userData.surname}
                </Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">E-mail:</Typography>
                <Typography>{userData.email}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Korisnicko ime:</Typography>
                <Typography>{userData.username}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Tip korisnika:</Typography>
                <Typography>{userData.role}</Typography>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <p>Failed to load profile data.</p>
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
