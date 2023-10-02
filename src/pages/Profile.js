import React, { useEffect, useState } from "react";
// import { fetchUserProfile } from "../queries/profileInfo";
import photo from "../Images/photo.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import UserActionsDropdown from "../components/UI/actions/UserActionsDropdown";
import ReactModal from "react-modal";
import { GiCrossMark, GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import updateUserData from "../queries/korisnici/useUpdateUserData";
import { ProfileData } from "../queries/profileInfo/useProfileData";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { userId } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validatePasswordConfirmation = () => {
    if (password !== passwordConfirmation) {
      setPasswordError("Lozinke se ne poklapaju.");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await ProfileData();
        setUserProfile(user.data); // Access the 'data' property
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async () => {
    validatePasswordConfirmation();

    if (passwordError) {
      return;
    }

    try {
      const updatedData = await updateUserData(userId, {
        password,
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
    if (userProfile && userProfile.role === "Bibliotekar") {
      navigate("/librarians");
    } else if (userProfile && userProfile.role === "Učenik") {
      navigate("/students");
    }
  };

  const roleDisplay = () => {
    if (userProfile && userProfile.role === "Bibliotekar") {
      return <p>Svi Bibliotekari</p>;
    } else if (userProfile && userProfile.role === "Učenik") {
      return <p>Svi Ucenici</p>;
    }
  };

  return (
    <div className="main-content mt-24 ml-20 flex flex-col">
      <div className="w-full">
        <div className="flex flex-row justify-between border-b border-gray-300 mb-14 text-center">
          <div className="flex flex-col">
            <Typography variant="h4" align="center" gutterBottom>
              {userProfile?.name} {userProfile?.surname}
            </Typography>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={navigation}
            >
              {roleDisplay()}
            </button>
          </div>
          <div className="flex items-center">
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
      <div className="w-96">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : userProfile ? (
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
                  {userProfile.name} {userProfile.surname}
                </Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">E-mail:</Typography>
                <Typography>{userProfile.email}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Korisnicko ime:</Typography>
                <Typography>{userProfile.username}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Tip korisnika:</Typography>
                <Typography>{userProfile.role}</Typography>
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
            placeholder="Nova lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Potvrdi lozinku"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <div className="password-modal-buttons">
            <button onClick={closeModal} className="cancel-button">
              <GiCrossMark color="#f44336" />{" "}
            </button>
            <button onClick={handleChangePassword} className="success-button">
              <GiCheckMark color="#007bff" />{" "}
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Profile;
