import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Signup from "../../services/Signup";
import Container from "@mui/material/Container";
import GoogleFontLoader from "react-google-font-loader"; // Import GoogleFontLoader

export default function SignupForm() {
  const {
    name,
    surname,
    email,
    username,
    password,
    passwordConfirmation,
    setName,
    setSurname,
    setEmail,
    setUsername,
    setPassword,
    setPasswordConfirmation,
    handleSignup,
  } = Signup();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
        "linear-gradient(to bottom, #86A8E7 30%, #ffffff 90%)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <GoogleFontLoader
          fonts={[
            {
              font: "Your Chosen Font",
              weights: [400],
            },
          ]}
        />
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 8,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontFamily: "Your Chosen Font, sans-serif",
              marginBottom: 2,
              fontSize: "2rem",
              borderBottom: "2px solid #ccc",
              paddingBottom: "10px",
            }}
          >
            Online Biblioteka
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Surname"
              name="surname"
              autoComplete="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              id="passwordConfirmation"
              autoComplete="new-password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
