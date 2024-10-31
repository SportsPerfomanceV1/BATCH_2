// src/components/Login.js
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
            const result = await response.text();
            setMessage(response.ok ? `Login successful: ${result}` : `Error: ${result}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Box className="form-container"> {/* Applying same styling for consistency */}
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
