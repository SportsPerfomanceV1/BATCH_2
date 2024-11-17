import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import "../Form.css"; // Ensures the styling is identical for both forms

const Login = () => {
    const [formData, setFormData] = useState({ usernameEmail: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/authenticate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json(); // Expecting JSON response with token and role

            // Store the token and role in local storage
            localStorage.setItem("token", result.token);
            localStorage.setItem("role", result.role);
            
            // Redirect based on the role
            if (result.role === "ADMIN") {
                window.location.href = "/admindashboard";
            } else if (result.role === "ATHLETE") {
                window.location.href = "/athletedashboard"; // Adjust to actual dashboard for athlete
            }if (result.role === "COACH") {
                window.location.href = "/coachdashboard"; // Adjust to actual dashboard for athlete
            } 
            
            setMessage(response.ok ? `Login successful: ${result.token} \n ${localStorage.getItem("token")}, role: ${result.role}` : `Error: ${result}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Box className="form-container" sx={{marginTop:'100px'}}> {/* Applying same styling for consistency */}
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000000" }}>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="usernameEmail" label="Username or Email" onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" fullWidth sx={{ backgroundColor: "#000000", color: "#ffffff", marginTop: "1rem" }}>Login</Button>
            </form>
            {message && <Typography sx={{ color: "#000000", marginTop: "1rem" }}>{message}</Typography>}
            
        </Box>
    );
};

export default Login;
