// src/components/Register.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select } from "@mui/material";
import "../Form.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "ATHLETE",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.text();
            setMessage(response.ok ? `Registration successful: ${result}` : `Error: ${result}`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <Box className="form-container">
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000000" }}>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="username" label="Username" onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="email" label="Email" type="email" onChange={handleChange} fullWidth margin="normal" required />
                <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth margin="normal" required />
                <Select name="role" value={formData.role} onChange={handleChange} fullWidth sx={{ marginTop: "1rem" }}>
                    <MenuItem value="ATHLETE">Athlete</MenuItem>
                    <MenuItem value="COACH">Coach</MenuItem>
                </Select>
                <Button type="submit" fullWidth sx={{ backgroundColor: "#000000", color: "#ffffff", marginTop: "1rem" }}>Register</Button>
            </form>
            {message && <Typography sx={{ color: "#000000", marginTop: "1rem" }}>{message}</Typography>}
         {/* New Button for /admin/test API */}
         {/* <Button onClick={handleAdminTest} fullWidth sx={{ backgroundColor: "#4CAF50", color: "#ffffff", marginTop: "1rem" }}>
                Test Admin API
            </Button> */}
        </Box>
    );
};

export default Register;
