import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Box, IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Login from "./Login"; // Ensure correct path
import Register from "./Register"; // Ensure correct path

const HomePage = () => {
  const [activeForm, setActiveForm] = useState(null); // State to track active form

  const isFormActive = activeForm === "login" || activeForm === "register";

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#ffffff", marginBottom: "5px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 2rem" }}>
          {isFormActive ? (
            <IconButton
              onClick={() => setActiveForm(null)}
              sx={{ color: "#000000" }}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (" "
          )}
            <Typography variant="h5" sx={{ color: "#000000", fontWeight: "bold" }}>
              Sports Performance
            </Typography>
          {!isFormActive && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                startIcon={<PersonAddIcon />}
                sx={{ marginRight: "1rem", color: "#000000", "&:hover": { color: "#fff" } }}
                onClick={() => setActiveForm("register")}
              >
                Register
              </Button>
              <Button
                startIcon={<LoginIcon />}
                sx={{ color: "#000000", "&:hover": { color: "#fff" } }}
                onClick={() => setActiveForm("login")}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url('https://s11.gr/soccer11/diafora/files/1788/velocity-sports-performance-training-1350.700x400.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: isFormActive ? 0.6 : 0.9,
            transition: "opacity 0.5s ease",
            zIndex: -1,
          },
        }}
      >
        {activeForm === "login" && <Login />}
        {activeForm === "register" && <Register />}
        
      </Box>
    </div>
  );
};

export default HomePage;
