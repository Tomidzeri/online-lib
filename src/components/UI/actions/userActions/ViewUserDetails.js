import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserDetails from "../../../../queries/korisnici/useUserDetails";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import photo from "../../../../Images/photo.jpg";
import { Grid, Typography, Paper } from "@mui/material";
import { format } from "date-fns";
import ProfileDropdown from "../ProfileActionsDropdown";
import updateUserData from "../../../../queries/korisnici/useUpdateUserData";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCrossMark, GiCheckMark } from "react-icons/gi";

function ViewUserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useUserDetails(userId);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loginCount = sessionStorage.getItem("loginCount");
  const lastLoginTime = sessionStorage.getItem("loginTime");
  const formattedLastLoginTime = lastLoginTime
    ? format(new Date(lastLoginTime), "dd MMMM yyyy HH:mm:ss")
    : "";

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const navigation = () => {
    if (user.role === "Bibliotekar") {
      navigate("/librarians");
    } else {
      navigate("/students");
    }
  };

  const roleDisplay = () => {
    if (user) {
      if (user.role === "Bibliotekar") {
        return <p>Bibliotekari</p>;
      } else if (user.role === "Učenik") {
        return <p>Ucenici</p>;
      }
    }
    return <p>Administratori</p>;
  };

  const validatePasswordConfirmation = () => {
    if (password !== passwordConfirmation) {
      setPasswordError("Lozinke se ne poklapaju.");
    } else {
      setPasswordError("");
    }
  };

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

  return (
    <div className="mt-12 ml-15">
      <div className="w-full">
        <div className="flex justify-between border-b border-gray-300 w-full">
          <div className="flex flex-col">
            <h2
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="text-5xl font-bold text-left ml-20"
            >
              {user?.name} {user?.surname}
            </h2>
            <div className="flex items-center ml-20">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={navigation}
              >
                {roleDisplay()}
              </button>
              <p className="text-blue-500">&nbsp;/ ID-{user?.id}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={openModal}
              >
                Izmijeni lozinku
              </button>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  navigate(`/edituserform/${user.id}`);
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
      </div>
      <div className="w-9/12 mt-10 ml-20">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                <Typography variant="h6">Ime i prezime:</Typography>
                <Typography>
                  {user.name} {user.surname}
                </Typography>
              </Paper>
              <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                <Typography variant="h6">E-mail:</Typography>
                <Typography sx={{ color: "blue" }}>{user.email}</Typography>
              </Paper>
              <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                <Typography variant="h6">Korisnicko ime:</Typography>
                <Typography>{user.username}</Typography>
              </Paper>
              <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                <Typography variant="h6">Tip korisnika:</Typography>
                <Typography>{user.role}</Typography>
              </Paper>
              <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                <Typography variant="h6">Broj logovanja:</Typography>
                <Typography>{loginCount}</Typography>
              </Paper>
              <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                <Typography variant="h6">Poslednji put logovan/a:</Typography>
                <Typography>{formattedLastLoginTime}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                sx={{
                  marginBottom: "2rem",
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={photo}
                  alt="Slika"
                  style={{
                    width: "30rem",
                    height: "35rem",
                    objectFit: "cover",
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
      {/* Password Modal */}
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
}

export default ViewUserDetails;
