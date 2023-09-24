import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../queries/profileInfo";
import photo from "../Images/photo.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const loggedInUsername = sessionStorage.getItem("username");

    if (!token || !loggedInUsername) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const user = await fetchUserProfile(token, loggedInUsername);

        setUserProfile(user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const navigation = () => {
    if (userProfile && userProfile.role === "Bibliotekar") {
      navigate("/librarians");
    } else if (userProfile && userProfile.role === "Student") {
      navigate("/students");
    }
  };

  const roleDisplay = () => {
    if (userProfile && userProfile.role === "Bibliotekar") {
      return <p>Bibliotekari</p>;
    } else {
      return <p>Ucenici</p>;
    }
  };

  return (
    <div className="main-content mt-24 ml-20 flex flex-col">
      <div className="w-full">
        <div className="flex flex-col justify-baseline items-baseline border-b border-gray-300 mb-14 text-center">
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
    </div>
  );
};

export default Profile;
