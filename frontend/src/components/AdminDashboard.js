import React, { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { redirect } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

// Styled Components
const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "10px",
    '&:hover': {
        backgroundColor: "#15c143",
    },
}));

const DashboardContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
});

const MeetTable = styled(TableContainer)({
    marginTop: '20px',
    width: '80%',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
});


const PublishResults = ({ onClose }) => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [athletes, setAthletes] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Fetch events with pending results
        const token = localStorage.getItem("token"); // Or however you store/retrieve the token

        axios.get("/admin/events/pending-results", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setEvents(response.data))
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    const handleEventClick = (eventId) => {
        setSelectedEvent(eventId);
        const token = localStorage.getItem("token");
        axios.get(`/admin/events/${eventId}/athletes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAthletes(response.data);
                setResults(response.data.map(athlete => ({
                    athleteId: athlete.athleteId,
                    score: athlete.score || "",
                    comment: athlete.comment || ""
                })));
            })
            .catch(error => console.error("Error fetching athletes:", error));
    };

    const handleResultChange = (index, field, value) => {
        setResults(prevResults => {
            const updatedResults = [...prevResults];
            updatedResults[index][field] = value;
            return updatedResults;
        });
    };

    const handleSubmit = () => {
        const token = localStorage.getItem("token");
        axios.post(`/admin/events/${selectedEvent}/publish-results`, results, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                alert("Results published successfully!");
                setSelectedEvent(null);
                setAthletes([]);
                setResults([]);
            })
            .catch(error => console.error("Error publishing results:", error));
    };

    return (
        <>
            <div
                className="resultPopup"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%", // Adjusted width for better responsiveness on smaller screens
                    maxWidth: "70vh", // Set a max width for larger screens
                    maxHeight: "100vh", // Limit height to make it scrollable within the viewport
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    borderRadius: "8px",
                    zIndex: 1000,
                    overflowY: "auto" // Enables vertical scrolling within the form
                }}
            >
                <div>
                    <h2>Publish Event Results</h2>
                    {!selectedEvent ? (
                        <div>
                            <h3>Events with Pending Results</h3>
                            <ul>
                                {events.map(event => (
                                    <li key={event.eventId}>
                                        {event.eventTitle} ({event.eventDate})
                                        <button onClick={() => handleEventClick(event.eventId)}>Publish Results</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <h3>Results for Event ID: {selectedEvent}</h3>
                            <div style={{ maxHeight: "90vh", overflowY: "scroll", maxWidth: "90vh", minWidth: "70vh" }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Picture</th>
                                            <th>Name</th>
                                            <th>Score</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {athletes.map((athlete, index) => (
                                            <tr key={athlete.athleteId}>
                                                <td><img src={athlete.athletePicture} alt="Athlete" width="50" /></td>
                                                <td>{athlete.athleteName}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={results[index].score}
                                                        onChange={e => handleResultChange(index, "score", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={results[index].comment}
                                                        onChange={e => handleResultChange(index, "comment", e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button onClick={handleSubmit}>Submit Results</button>
                            <button onClick={() => setSelectedEvent(null)}>Cancel</button>
                        </div>
                    )}
                </div>
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


const Meet = ({ onClose }) => {
    // const [meetName, setMeetName] = useState("");
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
                    "Authorization": `Bearer ${token}` // Pass the token in the Authorization header
                }, body: JSON.stringify(formData),
            });
            // const result = await response.text();
            if (response.ok) {
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
                <h2 style={{ marginLeft: '36%' }}>Create Meet</h2>
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
                <Button onClick={onClose} sx={{
                    marginTop: '5px', marginLeft: '42%',
                    color: "#000000",
                    "&:hover": {
                        color: "#fff",
                        backgroundColor: "#15c143"  // Change this to the desired hover color
                    }
                }}>
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
                <h2 style={{ marginLeft: '36%' }}>Create Event</h2>

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
                <Button onClick={onClose} sx={{
                    marginTop: '5px', marginLeft: '42%',
                    color: "#000000",
                    "&:hover": {
                        color: "#fff",// Change this to the desired hover color
                        backgroundColor: "#15c143"
                    }
                }}>
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
    const [meets, setMeets] = useState([]);
    const [eventVisible, setEventVisible] = useState(false);
    const [resultVisible, setResultVisible] = useState(false);

    // const openPublish = () => {
    //     setPublishVisible(true);
    // };

    // const closePublish = () => {
    //     setPublishVisible(false);
    // };


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
        fetchMeets();
    }, []);

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

    const openResult = () => {
        setResultVisible(true);
    };

    const closeResult = () => {
        setResultVisible(false);
    };

    return (
        <DashboardContainer className="adminDashboardHome">
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <StyledButton id="btnMeet" onClick={openMeet}>
                    ✨ Create Meet
                </StyledButton>

                {meetVisible && <Meet onClose={closeMeet} />}

                <StyledButton id="btnEvent" onClick={openEvent}>
                    📅 create Event
                </StyledButton>

                {eventVisible && <Event onClose={closeEvent} />}

                <StyledButton>👥 Shortlist Candidates</StyledButton>
                <StyledButton onClick={openResult}>📊 Publish Results</StyledButton>
                {resultVisible && <PublishResults onClose={closeResult} />}

            </Box>
            <Typography variant="h5" sx={{ marginTop: '30px' }}>
                Created Meets
            </Typography>
            <MeetTable component={Paper}>
                <Table aria-label="created meets table">
                    <TableHead>
                        <TableRow>
                            <TableCell>MEET ID</TableCell>
                            <TableCell>MEET NAME</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meets.map((meet) => (
                            <TableRow key={meet.id}>
                                <TableCell>{meet.meetId}</TableCell>
                                <TableCell>{meet.meetName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </MeetTable>
        </DashboardContainer>
    );
};

export default AdminDashboard;