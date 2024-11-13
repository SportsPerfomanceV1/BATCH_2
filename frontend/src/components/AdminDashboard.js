import React, { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { redirect } from "react-router-dom";

const Meet = ({ onClose }) => {
    // const [meetName, setMeetName] = useState("");
    const [formData, setFormData] = useState({ meetName: ""});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleCreateMeet = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No token found in localStorage");
                return;
            }

            const response = await fetch("/admin/createmeet", {
                method: "POST",
                headers: {
                    
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Pass the token in the Authorization header
                }, body: JSON.stringify(formData),
            });
            // const result = await response.text();
            if(response.ok){
                alert("Meet Created Successfully")
                onClose();
            } else {
                alert("Kindly login as admin again")
            }

            
        } catch (error) {
            
        }
        // console.log("Creating meet with name:", meetName);
        return redirect("/adminDashboard")
    };

    return (
        <>
            <div
                className="meetPopup"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "400px",
                    height: "300px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    borderRadius: "8px",
                    zIndex: 1000,
                }}
            >
                <h2>Create Meet</h2>
                <form onSubmit={handleCreateMeet}>
                    <TextField
                        name="meetName"
                        label="Meet Name"
                        fullWidth
                        margin="normal"
                        required
                        // value={meetName}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        sx={{ backgroundColor: "#000000", color: "#ffffff", marginTop: "1rem" }}
                    >
                        Create Meet
                    </Button>
                </form>
                <Button onClick={onClose} sx={{ marginTop: "1rem" }}>
                    Close
                </Button>
            </div>

            {/* Overlay */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                }}
                onClick={onClose}
            />


        </>

        
    );
};


const Event = ({ onClose }) => {
    const [formData, setFormData] = useState({
        eventTitle: "",
        eventDate: "",
        meetId: "",
        location: "",
        category: "",
        eventDescription: "",
        image: null,
    });
    const [meets, setMeets] = useState([]); // Store available meets

    useEffect(() => {
        // Fetch meets from API
        const fetchMeets = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("admin/allMeet", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const meetData = await response.json();
                setMeets(meetData);
            } catch (error) {
                console.error("Error fetching meets:", error);
            }
        };
        fetchMeets();
    }, []);

    const handleChangeEvent = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleCreateEvent = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("No token found in localStorage");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("eventTitle", formData.eventTitle);
        formDataToSend.append("eventDate", formData.eventDate);
        formDataToSend.append("meetId", formData.meetId);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("eventDescription", formData.eventDescription);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await fetch("/admin/createevent", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (response.ok) {
                alert("Event Created Successfully");
                onClose();
            } else {
                alert("Kindly login as admin again");
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <>
            <div
                className="eventPopup"
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "90%", // Adjusted width for better responsiveness on smaller screens
                            maxWidth: "500px", // Set a max width for larger screens
                            maxHeight: "100vh", // Limit height to make it scrollable within the viewport
                            backgroundColor: "#fff",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            padding: "20px",
                            borderRadius: "8px",
                            zIndex: 1000,
                            overflowY: "auto" // Enables vertical scrolling within the form
                        }}
                    >
                        <h2>Create Event</h2>
                     
        <form onSubmit={handleCreateEvent}>
            <TextField
                name="eventTitle"
                label="Event Title"
                fullWidth
                margin="normal"
                required
                onChange={handleChangeEvent}
            />
            <TextField
                name="eventDate"
                label="Event Date"
                type="date"
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                onChange={handleChangeEvent}
            />
            <TextField
                select
                name="meetId"
                label="Select Meet"
                fullWidth
                margin="normal"
                required
                value={formData.meetId}
                onChange={handleChangeEvent}
            >
                {meets.map((meet) => (
                    <MenuItem key={meet.id} value={meet.meetId}>
                        {meet.meetName}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="location"
                label="Location"
                fullWidth
                margin="normal"
                required
                onChange={handleChangeEvent}
            />
            <TextField
                name="category"
                label="Category"
                fullWidth
                margin="normal"
                required
                onChange={handleChangeEvent}
            />
            <TextField
                name="eventDescription"
                label="Event Description"
                fullWidth
                margin="normal"
                required
                onChange={handleChangeEvent}
            />
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: "1rem" }}
            />
            <Button type="submit" fullWidth sx={{ backgroundColor: "#000000", color: "#ffffff", marginTop: "1rem" }}>
                Create Event
            </Button>
        </form>
        <Button onClick={onClose} sx={{ marginTop: "1rem" }}>
                    Close
                </Button>
        </div>
         {/* Overlay */}
             <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                }}
                onClick={onClose}
            />
        </>
    );
};



const AdminDashboard = () => {
    const [meetVisible, setMeetVisible] = useState(false);

    const [eventVisible, setEventVisible] = useState(false);

    const openMeet = () => {
        setMeetVisible(true);
    };

    const closeMeet = () => {
        setMeetVisible(false);
    };

    const openEvent = () => {
        setEventVisible(true);
    };

    const closeEvent = () => {
        setEventVisible(false);
    };

    return (
        <Box className="adminDashboardHome">
            <Button id="btnMeet" onClick={openMeet}>
                CREATE MEET
            </Button>

            {meetVisible && <Meet onClose={closeMeet} />}

            <Button id="btnEvent" onClick={openEvent}>
                CREATE EVENT
            </Button>

            {eventVisible && <Event onClose={closeEvent} />}
        </Box>
    );
};

export default AdminDashboard;