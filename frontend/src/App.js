// src/App.js
import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link,useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import AthleteDashboard from "./components/AthleteDashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
const NavigationBar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "0 2rem" }}>
                <Typography variant="h5" sx={{ color: "#000000", fontWeight: "bold" }}>
                    Sports Performance
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/register" style={{ textDecoration: "none", color: "#000000" }}>
                                <Button startIcon={<PersonAddIcon />} sx={{ marginRight: "1rem", color: "#000000" }}>Register</Button>
                            </Link>
                            <Link to="/login" style={{ textDecoration: "none", color: "#000000" }}>
                                <Button startIcon={<LoginIcon />} sx={{ color: "#000000" }}>Login</Button>
                            </Link>
                        </>
                    ) : (
                        <Box sx={{ display: "flex", marginLeft: "auto" }}>
                            <Button
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                                sx={{
                                    color: "#000000",
                                    "&:hover": {
                                        color: "#fff"  // Change this to the desired hover color
                                    }
                                }}
                                
                            >
                                Logout
                            </Button>
                        </Box>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);
    return (
        <Router>
           
            <NavigationBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/athleteDashboard" element={<AthleteDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
