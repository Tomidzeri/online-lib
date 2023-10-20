// CurrentInfoTab.js
import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { format } from "date-fns";
import defaultPhoto from "../../../../../Images/photo.jpg";

const BasicStudentInfo = ({ user, loading, loginCount, lastLoginTime }) => {
  const formattedLastLoginTime = lastLoginTime
    ? format(new Date(lastLoginTime), "dd MMMM yyyy HH:mm:ss")
    : "";

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          {/* Loading indicator */}
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
                  marginTop: "2.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={user.photoPath || defaultPhoto}
                  alt="Slika"
                  style={{
                    width: "30rem",
                    height: "35rem",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = defaultPhoto;
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
      )}
    </div>
  );
};

export default BasicStudentInfo;
