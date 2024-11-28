// // src/components/Register.js
// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, MenuItem, Select } from "@mui/material";
// import "../Form.css";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         role: "ATHLETE",
//     });
//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("/api/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });
//             const result = await response.text();
//             setMessage(response.ok ? `Registration successful: ${result}` : `Error: ${result}`);
//         } catch (error) {
//             setMessage(`Error: ${error.message}`);
//         }
//     };

//     return (
//         <Box className="form-container">
//             <Typography variant="h5" sx={{ fontWeight: "bold", color: "#000000" }}>Register</Typography>
//             <form onSubmit={handleSubmit}>
//                 <TextField name="username" label="Username" onChange={handleChange} fullWidth margin="normal" required />
//                 <TextField name="email" label="Email" type="email" onChange={handleChange} fullWidth margin="normal" required />
//                 <TextField name="password" label="Password" type="password" onChange={handleChange} fullWidth margin="normal" required />
//                 <Select name="role" value={formData.role} onChange={handleChange} fullWidth sx={{ marginTop: "1rem" }}>
//                     <MenuItem value="ATHLETE">Athlete</MenuItem>
//                     <MenuItem value="COACH">Coach</MenuItem>
//                 </Select>
//                 <Button type="submit" fullWidth sx={{ backgroundColor: "#000000", color: "#ffffff", marginTop: "1rem" }}>Register</Button>
//             </form>
//             {message && <Typography sx={{ color: "#000000", marginTop: "1rem" }}>{message}</Typography>}
//          {/* New Button for /admin/test API */}
//          {/* <Button onClick={handleAdminTest} fullWidth sx={{ backgroundColor: "#4CAF50", color: "#ffffff", marginTop: "1rem" }}>
//                 Test Admin API
//             </Button> */}
//         </Box>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import { UserPlus, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "ATHLETE",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.text();
      setMessage(response.ok ? `Registration successful: ${result}` : `Error: ${result}`);
      if (response.ok) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Home button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-blue-500 transition-colors"
        >
          <Home className="w-6 h-6 text-white" />
        </button>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute animate-spin-slow" viewBox="0 0 100 100" width="400" height="400">
              <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="35" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="25" stroke="white" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Register Form */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <UserPlus className="w-12 h-12 text-blue-400" />
          </div>
          
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Account
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black hover:text-white hover:bg-blue-500 transition-colors"
              >
                <option value="ATHLETE" className="bg-black text-white">Athlete</option>
                <option value="COACH" className="bg-black text-white">Coach</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : "Register"}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg ${message.includes('Error') ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
              {message}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-white-400 hover:text-blue-300 transition-colors"
            >
              Already have an account? Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;