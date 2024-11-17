import React, { useEffect, useState } from "react";
import { Button, Box, TextField, MenuItem } from "@mui/material";
import { Typography, AppBar, Table, Toolbar, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { Tab, Tabs } from '@mui/material';
import '../styles/AdminDashboard.css';

const Meet = ({ onClose }) => {
    const [formData, setFormData] = useState({ meetName: "" });

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
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            
            if(response.ok){
                alert("Meet Created Successfully")
                onClose();
            } else {
                alert("Kindly login as admin again")
            }
        } catch (error) {
            console.error("Error creating meet:", error);
        }
    };

    return (
        <>
            <div className="popup meetPopup">
                <h2 className="popup-title">Create Meet</h2>
                <form onSubmit={handleCreateMeet} className="popup-form">
                    <TextField
                        name="meetName"
                        label="Meet Name"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChange}
                        className="form-field"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="file-input"
                        fullWidth
                    />
                    <Button
                        type="submit"
                        fullWidth
                        className="submit-button"
                    >
                        Create Meet
                    </Button>
                </form>
                <Button onClick={onClose} className="close-button">
                    Close
                </Button>
            </div>
            <div className="overlay" onClick={onClose} />
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
    const [meets, setMeets] = useState([]);

    useEffect(() => {
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
        Object.keys(formData).forEach(key => {
            if (key === 'image' && formData[key]) {
                formDataToSend.append(key, formData[key]);
            } else if (key !== 'image') {
                formDataToSend.append(key, formData[key]);
            }
        });

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
            <div className="popup eventPopup">
                <h2 className="popup-title">Create Event</h2>
                <form onSubmit={handleCreateEvent} className="popup-form">
                    <TextField
                        name="eventTitle"
                        label="Event Title"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChangeEvent}
                        className="form-field"
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
                        className="form-field"
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
                        className="form-field"
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
                        className="form-field"
                    />
                    <TextField
                        name="category"
                        label="Category"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChangeEvent}
                        className="form-field"
                    />
                    <TextField
                        name="eventDescription"
                        label="Event Description"
                        fullWidth
                        margin="normal"
                        required
                        onChange={handleChangeEvent}
                        className="form-field"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    <Button type="submit" fullWidth className="submit-button">
                        Create Event
                    </Button>
                </form>
                <Button onClick={onClose} className="close-button">
                    Close
                </Button>
            </div>
            <div className="overlay" onClick={onClose} />
        </>
    );
};

const AdminDashboard = () => {
    const [meetVisible, setMeetVisible] = useState(false);
    const [meets, setMeets] = useState([]);
    const [eventVisible, setEventVisible] = useState(false);
    const navigate = useNavigate();
    const [events, setEvents] = useState([])
    const [activeTab, setActiveTab] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/*');
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
 

    useEffect(() => {
        const fetchMeets = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("/admin/allMeet", {
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
        const loadAllEvents = async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await fetch('athlete/events', {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                }
              });
              const data = await response.json();
              setEvents(data);
            } catch (error) {
              console.error("Error loading events:", error);
            }
          };
        loadAllEvents();
    fetchMeets();
}, []);

    const openMeet = () => setMeetVisible(true);
    const closeMeet = () => setMeetVisible(false);
    const openEvent = () => setEventVisible(true);
    const closeEvent = () => setEventVisible(false);

    const MeetsTable = () => (
        <TableContainer component={Paper} className="table-container">
            <Table aria-label="created meets table" className="table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header">MEET ID</TableCell>
                        <TableCell className="table-header">MEET NAME</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meets.map((meet) => (
                        <TableRow key={meet.id} className="table-row">
                            <TableCell className="table-cell">{meet.meetId}</TableCell>
                            <TableCell className="table-cell">{meet.meetName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const EventsTable = () => {
       
    
        return (
            <TableContainer component={Paper} className="table-container">
                <Table aria-label="created events table" className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">EVENT TITLE</TableCell>
                            <TableCell className="table-header">MEET NAME</TableCell>
                            <TableCell className="table-header">DATE</TableCell>
                            <TableCell className="table-header">LOCATION</TableCell>
                            <TableCell className="table-header">CATEGORY</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                       {events.map((event) => (
                        <TableRow key={event.id} className="table-row">
                                <TableCell className="table-cell">{event.eventTitle}</TableCell>
                                <TableCell className="table-cell">{event.meetId ? event.meetId.meetName : 'N/A'}</TableCell>
                                <TableCell className="table-cell">{new Date(event.eventDate).toLocaleDateString()}</TableCell>
                                <TableCell className="table-cell">{event.location}</TableCell>
                                <TableCell className="table-cell">{event.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        );
    };
    

    return (
        <div className="adminDashboardHome">
            <AppBar position="static" className="navbar">
                <Toolbar className="navbar-content">
                    <Typography variant="h5" className="navbar-title">
                        Admin Dashboard
                    </Typography>
                    <Box className="navbar-actions">
                        <Link to="" className="logout-link">
                            <Button >
                                Athlete
                            </Button>
                        </Link>
                        <Link to="" className="logout-link">
                            <Button >
                                Coach
                            </Button>
                        </Link>
                        <Link to="/*" className="logout-link">
                            <Button 
                                onClick={handleLogout} 
                                startIcon={<LoginIcon />}
                                className="logout-button"
                            >
                                Logout
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            <div className="dashboard-actions">
                <Button id="btnMeet" onClick={openMeet} className="action-button">
                    ✨ Create Meet
                </Button>

                {meetVisible && <Meet onClose={closeMeet} />}

                <Button id="btnEvent" onClick={openEvent} className="action-button">
                    📅 Create Event
                </Button>

                {eventVisible && <Event onClose={closeEvent} />}

                <Button className="action-button">
                    👥 Shortlist Candidates
                </Button>
                <Button className="action-button">
                    📊 Publish Results
                </Button>
            </div>
            <div className="table-section">
                <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange} 
                    className="tabs-container"
                    centered
                >
                    <Tab label="Created Meets" className="tab" />
                    <Tab label="Created Events" className="tab" />
                </Tabs>

                <div className="table-content">
                    {activeTab === 0 ? <MeetsTable /> : <EventsTable />}
                </div>
            </div>
           
        </div>
    );
};

export default AdminDashboard;