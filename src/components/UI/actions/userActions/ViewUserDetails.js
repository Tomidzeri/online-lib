import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserDetails from "../../../../queries/korisnici/useUserDetails";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import photo from "../../../../Images/photo.jpg";
import { Grid, Typography, Paper } from "@mui/material";

function ViewUserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useUserDetails(userId);
  const [loading, setLoading] = useState(true);

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
    return <p>Admins</p>;
  };

  return (
    <div className="main-content mt-24 ml-20 flex flex-col">
      <div className="w-full">
        <div className="flex flex-col justify-baseline items-baseline border-b border-gray-300 mb-14 text-center">
          <Typography variant="h4" align="center" gutterBottom>
            {user?.name} {user?.surname}
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
      <div className="w-9/12">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Ime i prezime:</Typography>
                <Typography>
                  {user.name} {user.surname}
                </Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">E-mail:</Typography>
                <Typography>{user.email}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Korisnicko ime:</Typography>
                <Typography>{user.username}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ padding: "2rem", marginBottom: "2rem" }}
              >
                <Typography variant="h6">Tip korisnika:</Typography>
                <Typography>{user.role}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                sx={{
                  padding: "2rem",
                  marginBottom: "2rem",
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
                    height: "30rem",
                    objectFit: "cover",
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}

export default ViewUserDetails;
