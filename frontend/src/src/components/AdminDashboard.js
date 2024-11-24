import React, { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { styled, width } from "@mui/system";
import axios from "axios";
import { Tab, Tabs } from '@mui/material';
import { Typography, AppBar, Table, Toolbar, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , DialogTitle ,DialogContent, Dialog } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import '../styles/AdminDashboard.css';
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

const ShortlistCandidatesModal = ({ onClose }) => {
    const [registrations, setRegistrations] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [openEventDialog, setOpenEventDialog] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [athleteDetails, setAthleteDetails] = useState({});

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
                setSelectedEvent(response.data);
                setOpenEventDialog(true);
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
                setAthleteDetails(response.data);

                setProfileModalOpen(true);
            })
            .catch((error) => console.error('Error fetching athlete:', error));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');  // Ensure two digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };
      

    const handleCloseEventDialog = () => {
        setOpenEventDialog(false); 
        ;// Close the dialog
    };

    const handleCloseProfileModal = () => {
        setProfileModalOpen(false); // Close athlete profile dialog
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
                    maxWidth: "106vh",
                    maxHeight: "100vh",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    borderRadius: "8px",
                    zIndex: 1000,
                    overflowY: "auto",
                }}
            >
                    <div className="" >
                        <button className="close-btn" onClick={onClose}>&times;</button>
                        <h2 style={{textAlign:'center'}} >Pending Registrations</h2>
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
                                        <td style={styles.td}>{reg.athlete.firstName} {reg.athlete.lastName}</td>
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
                    <Dialog open={openEventDialog} onClose={handleCloseEventDialog} maxWidth="md" fullWidth>
                <DialogTitle align="center">
                    <strong>{selectedEvent.eventTitle}</strong>
                </DialogTitle>
                <DialogContent>
                <img src={selectedEvent.imageBase64 ?` data:image/jpeg;base64,${selectedEvent.imageBase64} `: '/default-profile.jpg'}  style={{paddingLeft:"24%", width:'400px' ,height:'220px'}}/>

                <Typography variant="h6">Date: {formatDate(selectedEvent.eventDate)}</Typography>
                    <Typography variant="h6">Location: {selectedEvent.location}</Typography>
                    <Typography variant="h6">Category: {selectedEvent.category}</Typography>
                    <Typography variant="h6">Description: {selectedEvent.eventDescription}</Typography>
                    <Button onClick={handleCloseEventDialog} color="primary" variant="contained" style={{ marginTop: '20px' ,marginLeft:'87%'}}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>

            <Dialog open={profileModalOpen} onClose={handleCloseProfileModal} maxWidth="sm" fullWidth>
                <DialogTitle style={{textAlign:'center'}}><b>Athlete Profile</b></DialogTitle>
                <DialogContent>
                <img
            src={athleteDetails.photoBase64 ? `data:image/jpeg;base64,${athleteDetails.photoBase64}` : '/default-profile.jpg'}
            alt="Athlete" style={{paddingLeft:"3%", width:'400px' ,height:'220px'}}
             />
                    <Typography variant="h6">
                        Name: {athleteDetails.firstName} {athleteDetails.lastName}
                    </Typography>
                    <Typography variant="h6">Gender: {athleteDetails.gender}</Typography>
                    <Typography variant="h6">Category: {athleteDetails.category}</Typography>
                    <Typography variant="h6">Height: {athleteDetails.height} cm</Typography>
                    <Typography variant="h6">Weight: {athleteDetails.weight} kg</Typography>
                    <Button onClick={handleCloseProfileModal} color="primary" variant="contained" style={{ marginTop: '20px',marginLeft:'80%' }}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
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
            <div className="resultPopupoutside">
    <div className="resultPopup">
    <button className="close-btn" onClick={onClose} style={{
            width: '20px',
            position: 'absolute',
            top: '10px',
            left: '10px',
            justifyContent: 'left',
        }}>&times;</button>
        <h2>Publish Event Results</h2>
        {!selectedEvent ? (
            <div>
            <h3>Events with Pending Results</h3>
            <table className="eventTable">
                <thead>
                    <tr>
                        <th>Event Title</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.eventId}>
                            <td>{event.eventTitle}</td>
                            <td>{event.eventDate.split(' ')[0]}</td>
                            <td>
                                <button style={{width:'250px',backgroundColor:'rgb(67, 218, 67)'}}onClick={() => handleEventClick(event.eventId)}>
                                    Publish Results
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        ) : (
            <div>
                <h3>Results for Event ID: {selectedEvent}</h3>
                <div>
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
                                    <td><img src={athlete.athletePicture} alt="Athlete" style={{paddingLeft:"24%", width:'400px' ,height:'220px'}} /></td>
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
                <button className="submitButton" onClick={handleSubmit}>Submit Results</button>
                <button className="cancelButton" onClick={() => setSelectedEvent(null)}>Cancel</button>
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
                className="popup eventPopup"
            >
                <h2 style={{ marginLeft: '36%' }}>Create Meet</h2>

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
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: e.target.files[0],
        }));
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
                className="popup eventPopup"
                
            >
                <h2 style={{ marginLeft: '36%' }}>Create Event</h2>

                <form onSubmit={handleCreateEvent} className="popup-form">
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
                <Button onClick={onClose} className="close-button">
                    Close
                </Button>
            </div>
            <div className="overlay" onClick={onClose} />
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
    const navigate=useNavigate();
    const [regVisible, setRegVisible] = useState(false);
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
              const response = await fetch('admin/events', {
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
        const [events, setEvents] = useState([]);
        const [selectedEvent, setSelectedEvent] = useState(null);
        const [open, setOpen] = useState(false);
        const [registrations, setRegistrations] = useState([]);
        const [athleteDetails, setAthleteDetails] = useState(null);
        const [profileModalOpen, setProfileModalOpen] = useState(false);
        const [editEventOpen, setEditEventOpen] = useState(false);
        const [updatedEvent, setUpdatedEvent] = useState(null);
      
        useEffect(() => {
          const fetchEvents = async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await fetch("/admin/events", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              });
              if (!response.ok) throw new Error("Failed to fetch events.");
              const data = await response.json();
              setEvents(data);
            } catch (error) {
              console.error("Error fetching events:", error);
            }
          };
          
          fetchEvents();
        }, []);
      
        const fetchRegistrations = async (eventId) => {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch("/admin/registrations", {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to fetch registrations.");
            const data = await response.json();
            const filteredRegistrations = data.filter((reg) => reg.eventId === eventId);
            setRegistrations(filteredRegistrations);
          } catch (error) {
            console.error("Error fetching registrations:", error);
          }
        };
        
        const handleViewAthleteProfile = async (athleteId) => {
            try {
              const token = localStorage.getItem("token");
              const response = await fetch(`/admin/athlete/${athleteId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              });
              if (!response.ok) throw new Error("Failed to fetch athlete details.");
              const data = await response.json();
              setAthleteDetails(data);
              setProfileModalOpen(true);
            } catch (error) {
              console.error("Error fetching athlete details:", error);
            }
          };
        

        const handleViewEvent = (event) => {
          setSelectedEvent(event);
          setOpen(true);
          fetchRegistrations(event.eventId);
        };
      
        const handleDeleteEvent = async (eventId) => {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/admin/events/${eventId}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to delete event.");
            // Refresh events after deletion
            const updatedEvents = events.filter((event) => event.eventId !== eventId);
            setEvents(updatedEvents);
            setOpen(false);
          } catch (error) {
            console.error("Error deleting event:", error);
          }
        };
      
        const handleEditEvent = (event) => {
          setUpdatedEvent(event); // Store the selected event data for editing
          setEditEventOpen(true);
        };
      
        const handleUpdateEvent = async () => {
            const formData = new FormData();
            formData.append('eventTitle',updatedEvent.eventTitle);
            formData.append('eventDate',updatedEvent.eventDate);
            formData.append('location',updatedEvent.location);
            formData.append('Category',updatedEvent.category);
            formData.append('eventDescription',updatedEvent.eventDescription);
          try {
            const token = localStorage.getItem("token");
            const response = await fetch('/admin/createevent', {
              method: "POST",
              body: formData,
              headers: { 
               
                Authorization: `Bearer ${token}`,
              }
    
            });
            if (response.ok) {
                alert("Updated Event Details Successfully");
            }
            const updatedEvents = events.map((event) =>
              event.eventId === updatedEvent.eventId ? updatedEvent : event
            );
            setEvents(updatedEvents);
            setEditEventOpen(false);
            setUpdatedEvent(null);
          } catch (error) {
            console.error("Error updating event:", error);
          }
        };
      
        const handleCloseEventDialog = () => {
          setOpen(false);
          setSelectedEvent(null);
          setRegistrations([]);
        };
      
        const handleCloseProfileModal = () => {
          setProfileModalOpen(false);
          setAthleteDetails(null);
        };
      
        const handleCloseEditEventModal = () => {
          setEditEventOpen(false);
          setUpdatedEvent(null);
        };
      
        return (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>EVENT TITLE</TableCell>
                    <TableCell>MEET NAME</TableCell>
                    <TableCell>ACTIONS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.length > 0 ? (
                    events.map((event) => (
                        <TableRow key={event.eventId}>
                        <TableCell>{event.eventTitle}</TableCell>
                        <TableCell>{event.meetId?.meetName || "N/A"}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewEvent(event)}
                          >
                            View Event
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No events available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
      
            {selectedEvent && (
              <Dialog open={open} onClose={handleCloseEventDialog} maxWidth="md" fullWidth>
                <DialogTitle align="center" ><strong>{selectedEvent.eventTitle}</strong></DialogTitle>
                <DialogContent>
                <img src={selectedEvent.imageBase64 ?` data:image/jpeg;base64,${selectedEvent.imageBase64} `: '/default-profile.jpg'} style={{paddingLeft:"24%", width:'400px' ,height:'220px'}}/>

                  <Typography variant="h6"><b>Date: </b>{selectedEvent.eventDate.split('T')[0]}</Typography>
                  <Typography variant="h6"><b>Location: </b>{selectedEvent.location}</Typography>
                  <Typography variant="h6"><b>Category: </b>{selectedEvent.category}</Typography>
                  <Typography variant="h6"><b>Description: </b>{selectedEvent.eventDescription}</Typography>
      
                  {registrations.length > 0 && (
                    <>
                      <Typography variant="h6">Registrations:</Typography>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {registrations.map((reg) => (
                            <TableRow key={reg.registrationId}>
                              <TableCell>{reg.athlete.firstName} {reg.athlete.lastName}</TableCell>
                              <TableCell>{reg.athlete.email}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => handleViewAthleteProfile(reg.athleteId)}
                                >
                                  View Profile
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </>
                  )}
      
                  {registrations.length === 0 && (
                    <div>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteEvent(selectedEvent.eventId)}
                      >
                        Delete Event
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditEvent(selectedEvent)}
                        style={{ marginLeft: '10px' }}
                      >
                        Edit Event
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            )}
      
            {editEventOpen && updatedEvent && (
              <Dialog open={editEventOpen} onClose={handleCloseEditEventModal} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Event Title"
                    fullWidth
                    value={updatedEvent.eventTitle}
                    onChange={(e) => setUpdatedEvent({ ...updatedEvent, eventTitle: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    label="Event Date"
                    type="date"
                    fullWidth
                    value={updatedEvent.eventDate}
                    onChange={(e) => setUpdatedEvent({ ...updatedEvent, eventDate: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    label="Location"
                    fullWidth
                    value={updatedEvent.location}
                    onChange={(e) => setUpdatedEvent({ ...updatedEvent, location: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    label="Category"
                    fullWidth
                    value={updatedEvent.category}
                    onChange={(e) => setUpdatedEvent({ ...updatedEvent, category: e.target.value })}
                    margin="normal"
                  />
                  <TextField
                    label="Event Description"
                    fullWidth
                    value={updatedEvent.eventDescription}
                    onChange={(e) => setUpdatedEvent({ ...updatedEvent, eventDescription: e.target.value })}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateEvent}
                    style={{ marginTop: '10px' }}
                  >
                    Update Event
                  </Button>
                </DialogContent>
              </Dialog>
            )}
            {athleteDetails && (
        <Dialog open={profileModalOpen} onClose={handleCloseProfileModal} maxWidth="sm" fullWidth>
          <DialogTitle style={{ textAlign: 'center' }}>Athlete Profile</DialogTitle>
          <DialogContent 
           style={{
            justifyContent: 'center',
            textAlign: 'center',
          }}
          >
          <img
            src={athleteDetails.photoBase64 ? `data:image/jpeg;base64,${athleteDetails.photoBase64}` : '/default-profile.jpg'}
            alt="Athlete"  style={{paddingLeft:"3%", width:'400px' ,height:'220px'}}
             />
             <p></p>
            <Typography variant="h6">
              Name: {athleteDetails.firstName} {athleteDetails.lastName}
            </Typography>
            <Typography variant="h6">Gender: {athleteDetails.gender}</Typography>
            <Typography variant="h6">Category: {athleteDetails.category}</Typography>
            <Typography variant="h6">Height: {athleteDetails.height} cm</Typography>
            <Typography variant="h6">Weight: {athleteDetails.weight} kg</Typography>

            
                </DialogContent>
              </Dialog>
            )}
          </>
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
                
        <DashboardContainer  >
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <StyledButton id="btnMeet" onClick={openMeet} className="action-button">
                    ✨ CREATE MEET
                </StyledButton>

                {meetVisible && <Meet onClose={closeMeet} />}

                <StyledButton id="btnEvent" onClick={openEvent} className="action-button">
                    📅 CREATE EVENT
                </StyledButton>

                {eventVisible && <Event onClose={closeEvent} />}

                <StyledButton onClick={openReg} className="action-button">👥 SHORTLIST CANDIDATE</StyledButton>
                {regVisible && <ShortlistCandidatesModal onClose={closeReg} />}

                <StyledButton onClick={openResult} className="action-button">📊 PUBLISH RESULT</StyledButton>
                {resultVisible && <PublishResults onClose={closeResult} />}

            </Box>
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
        </DashboardContainer>
        </div>
</div>
    );
};

export default AdminDashboard;














