import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GoogleFontLoader from "react-google-font-loader";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import libraryImage from "./library.jpg";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import Signup from "../../services/Signup";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignupForm() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  // State variables for error messages
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

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

  const handleFieldFocus = (errorSetter) => {
    errorSetter(""); // Clear the error when the field gains focus
  };

  const validateForm = () => {
    // Reset all error messages
    setNameError("");
    setSurnameError("");
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setPasswordConfirmationError("");

    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!surname) {
      setSurnameError("Surname is required");
      isValid = false;
    }

    const emailRegex = /^\S+@\S+\.\S+/;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email is not valid");
      isValid = false;
    }

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSignupClick = () => {
    if (validateForm()) {
      handleSignup();
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          background: "linear-gradient(to bottom, #86A8E7 30%, #ffffff 90%)",
        }}
      >
        <CssBaseline />
        <GoogleFontLoader
          fonts={[
            {
              font: "Roboto",
              weights: [400],
            },
          ]}
        />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${libraryImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
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
                onFocus={() => handleFieldFocus(setNameError)} // Clear the error when focused
                error={!!nameError}
                helperText={nameError}
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
                onFocus={() => handleFieldFocus(setSurnameError)} // Clear the error when focused
                error={!!surnameError}
                helperText={surnameError}
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
                onFocus={() => handleFieldFocus(setEmailError)} // Clear the error when focused
                error={!!emailError}
                helperText={emailError}
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
                onFocus={() => handleFieldFocus(setUsernameError)} // Clear the error when focused
                error={!!usernameError}
                helperText={usernameError}
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
                onFocus={() => handleFieldFocus(setPasswordError)} // Clear the error when focused
                error={!!passwordError}
                helperText={passwordError}
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
                onFocus={() => handleFieldFocus(setPasswordConfirmationError)} // Clear the error when focused
                error={!!passwordConfirmationError}
                helperText={passwordConfirmationError}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={handleLoginClick}
                    style={{ cursor: "pointer" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignupForm;
