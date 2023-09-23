import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Login from "../../services/Login";
import GoogleFontLoader from "react-google-font-loader"; // Import GoogleFontLoader

export default function LoginForm() {
  const { username, password, setUsername, setPassword, handleLogin } = Login();

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
              font: "Roboto",
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
            component="h1"
            variant="h4"
            sx={{
              fontFamily: "Your Chosen Font, sans-serif",
              marginBottom: 2,
              fontSize: "2rem",
              borderBottom: "2px solid #ccc", // Add a border below the title
              paddingBottom: "10px", // Add some spacing below the border
            }}
          >
            Online Biblioteka
          </Typography>
          <Typography component="h2" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
