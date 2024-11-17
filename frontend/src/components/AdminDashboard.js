import React, { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { redirect } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
// import "../styles/shortlist.css";

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



// const ShortlistCandidatesModal = ({ isOpen, onClose }) => {
//     const [registrations, setRegistrations] = useState([]);
  
//     useEffect(() => {
        
//       if (isOpen) {
//         const token = localStorage.fetch("token");
//         axios
//           .get('/admin/registrations/pending', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//           .then((response) => {
//             setRegistrations(response.data);
//           })
//           .catch((error) => console.error('Error fetching pending registrations:', error));
//       }
//     }, [isOpen]);
  
//     const handleApprove = (registrationId) => {
//         const token = localStorage.fetch("token");
//       axios
//         .put(`/admin/registration/${registrationId}?status=Approved`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((response) => {
//           console.log(response.data);
//           // Re-fetch the pending registrations after approving
//           setRegistrations(registrations.filter(reg => reg.registrationId !== registrationId));
//         })
//         .catch((error) => console.error('Error approving registration:', error));
//     };
  
//     const handleReject = (registrationId) => {
//         const token = localStorage.fetch("token");
//       axios
//         .put(`/admin/registration/${registrationId}?status=Rejected`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((response) => {
//           console.log(response.data);
//           // Re-fetch the pending registrations after rejecting
//           setRegistrations(registrations.filter(reg => reg.registrationId !== registrationId));
//         })
//         .catch((error) => console.error('Error rejecting registration:', error));
//     };
  
//     const handleViewEvent = (eventId) => {
//         const token = localStorage.fetch("token");
//       axios
//         .get(`/admin/events/${eventId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((response) => {
//           alert('Event: ' + response.data.name + '\n' + response.data.description);
//         })
//         .catch((error) => console.error('Error fetching event:', error));
//     };
  
//     const handleViewAthlete = (athleteId) => {
//         const token = localStorage.fetch("token");
//       axios
//         .get(`/admin/athlete/${athleteId}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((response) => {
//           alert('Athlete: ' + response.data.name + '\n' + response.data.age);
//         })
//         .catch((error) => console.error('Error fetching athlete:', error));
//     };
  
//     return (
//         <>
//         <div
//                 className="shortPopup"
//                 style={{
//                     position: "fixed",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     width: "90%", // Adjusted width for better responsiveness on smaller screens
//                     maxWidth: "100vh", // Set a max width for larger screens
//                     maxHeight: "100vh",
//                      // Limit height to make it scrollable within the viewport
//                     backgroundColor: "#fff",
//                     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//                     padding: "20px",
//                     borderRadius: "8px",
//                     zIndex: 1000,
//                     overflowY: "auto" // Enables vertical scrolling within the form
//                 }}
//             >
//       <div className={`modal ${isOpen ? 'open' : ''}`}>
//         <div className="modal-content">
//           <button className="close-btn" onClick={onClose}>&times;</button>
//           <h2>Pending Registrations</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Event Name</th>
//                 <th>Athlete Name</th>
//                 <th>View Event</th>
//                 <th>View Athlete</th>
//                 <th>Approve</th>
//                 <th>Reject</th>
//               </tr>
//             </thead>
//             <tbody>
//               {registrations.map((reg) => (
//                 <tr key={reg.registrationId}>
//                   <td>{reg.eventName}</td>
//                   <td>{reg.athleteName}</td>
//                   <td>
//                     <button onClick={() => handleViewEvent(reg.eventId)}>View Event</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleViewAthlete(reg.athleteId)}>View Athlete</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleApprove(reg.registrationId)}>Approve</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleReject(reg.registrationId)}>Reject</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       </div>
//       <div
//                 style={{
//                     position: "fixed",
//                     top: 0,
//                     left: 0,
//                     width: "100vw",
//                     height: "100vh",
//                     backgroundColor: "rgba(0, 0, 0, 0.5)",
//                     zIndex: 999,
//                 }}
//                 onClick={onClose}
//             />
//       </>
//     );
//   };
const ShortlistCandidatesModal = ({ onClose }) => {
    const [registrations, setRegistrations] = useState([]);
  
    useEffect(() => {
        
            const token = localStorage.getItem("token"); // Fix: Use getItem for localStorage
            axios
                .get('/admin/registrations/pending', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setRegistrations(response.data);
                })
                .catch((error) => console.error('Error fetching pending registrations:', error));
        
    });

    const handleApprove = (registrationId) => {
        const token = localStorage.getItem("token"); // Fix: Use getItem for localStorage
        axios
            .put(`/admin/registration/${registrationId}?status=Approved`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                // Re-fetch the pending registrations after approving
                setRegistrations(registrations.filter(reg => reg.registrationId !== registrationId));
            })
            .catch((error) => console.error('Error approving registration:', error));
    };
  
    const handleReject = (registrationId) => {
        const token = localStorage.getItem("token"); // Fix: Use getItem for localStorage
        axios
            .put(`/admin/registration/${registrationId}?status=Rejected`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                // Re-fetch the pending registrations after rejecting
                setRegistrations(registrations.filter(reg => reg.registrationId !== registrationId));
            })
            .catch((error) => console.error('Error rejecting registration:', error));
    };
  
    const handleViewEvent = (eventId) => {
        const token = localStorage.getItem("token"); // Fix: Use getItem for localStorage
        axios
            .get(`/admin/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                alert('Event: ' + response.data.name + '\n' + response.data.description);
            })
            .catch((error) => console.error('Error fetching event:', error));
    };
  
    const handleViewAthlete = (athleteId) => {
        const token = localStorage.getItem("token"); // Fix: Use getItem for localStorage
        axios
            .get(`/admin/athlete/${athleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                alert('Athlete: ' + response.data.name + '\n' + response.data.age);
            })
            .catch((error) => console.error('Error fetching athlete:', error));
    };
  
    return (
        <>
            <div
                className="shortPopup"
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: "100vh",
                    maxHeight: "100vh",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    borderRadius: "8px",
                    zIndex: 1000,
                    overflowY: "auto",
                }}
            >
                    <div className="">
                        <button className="close-btn" onClick={onClose}>&times;</button>
                        <h2>Pending Registrations</h2>
                        <table style={{ width: "100vh", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#f4f4f4" }}>
                                    <th style={styles.th}>Event Name</th>
                                    <th style={styles.th}>Athlete Name</th>
                                    <th style={styles.th}>View Event</th>
                                    <th style={styles.th}>View Athlete</th>
                                    <th style={styles.th}>Approve</th>
                                    <th style={styles.th}>Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((reg) => (
                                    <tr key={reg.registrationId}>
                                        <td style={styles.td}>{reg.eventName}</td>
                                        <td style={styles.td}>{reg.athleteName}</td>
                                        <td style={styles.td}>
                                            <button style={styles.btn} onClick={() => handleViewEvent(reg.eventId)}>View Event</button>
                                        </td>
                                        <td style={styles.td}>
                                            <button style={styles.btn} onClick={() => handleViewAthlete(reg.athleteId)}>View Athlete</button>
                                        </td>
                                        <td style={styles.td}>
                                            <button style={styles.approveBtn} onClick={() => handleApprove(reg.registrationId)}>Approve</button>
                                        </td>
                                        <td style={styles.td}>
                                            <button style={styles.rejectBtn} onClick={() => handleReject(reg.registrationId)}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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

const styles = {
    th: {
        backgroundColor: "#007BFF",
        color: "#fff",
        padding: "12px 15px",
        textAlign: "left",
    },
    td: {
        padding: "12px 15px",
        borderBottom: "1px solid #ddd",
    },
    btn: {
        padding: "6px 12px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    approveBtn: {
        padding: "6px 12px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    rejectBtn: {
        padding: "6px 12px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

  


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
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            // const result = await response.text();
            if (response.ok) {
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

    const [regVisible, setRegVisible] = useState(false);

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

    const openReg = () => {
        setRegVisible(true);
    };

    const closeReg = () => {
        setRegVisible(false);
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
        <DashboardContainer className="adminDashboardHome">
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <StyledButton id="btnMeet" onClick={openMeet}>
                    ✨ Create Meet
                </StyledButton>

                {meetVisible && <Meet onClose={closeMeet} />}

                <Button id="btnEvent" onClick={openEvent} className="action-button">
                    📅 Create Event
                </Button>
                <StyledButton id="btnEvent" onClick={openEvent}>
                    📅 create Event
                </StyledButton>

                {eventVisible && <Event onClose={closeEvent} />}

                <StyledButton onClick={openReg}>👥 Shortlist Candidates</StyledButton>
                {regVisible && <ShortlistCandidatesModal onClose={closeReg} />}

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