import React, { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { styled, width } from "@mui/system";
import axios from "axios";
import { Tab, Tabs } from '@mui/material';
import { Typography, AppBar, Table, Toolbar, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , DialogTitle ,DialogContent, Dialog } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import Meet from "./AdminComponents/Meet";
import Event from "./AdminComponents/Event";
import PublishResults from "./AdminComponents/PublishResult";
import ShortlistCandidatesModal from "./AdminComponents/Shortlist";
import '../styles/AdminDashboard.css';

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
      
        const handleUpdateEvent = async () => {
            try {
              const token = localStorage.getItem("token");
              const formData = new FormData();
          
              // Add updated fields to the FormData object
              if (updatedEvent.eventTitle) {
                formData.append("eventTitle", updatedEvent.eventTitle);
              }
              if (updatedEvent.eventDate) {
                formData.append("eventDate", updatedEvent.eventDate);
              
              }
              if (updatedEvent.location) {
                formData.append("location", updatedEvent.location);
              
              }
              if (updatedEvent.category) {
                formData.append("category", updatedEvent.category);
              
              }
              if (updatedEvent.eventDescription) {
                formData.append("eventDescription", updatedEvent.eventDescription);
              }
              
              
              // Add image if it exists
              if (updatedEvent.image) {
                formData.append("image", updatedEvent.image);
              }
          
            //   // Include `meetId` if available
            //   if (updatedEvent.meetId) {
            //     formData.append("meetId", updatedEvent.meetId);
            //   }
          
              const response = await fetch(`/admin/updateevent/${updatedEvent.eventId}`, {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              });
          
              if (!response.ok) {
                throw new Error("Failed to update event.");
              }
          
              const updatedEventData = await response.json();
          
              // Update the event list locally
              const updatedEvents = events.map((event) =>
                event.eventId === updatedEventData.eventId ? updatedEventData : event
              );
              setEvents(updatedEvents);
          
              alert("Updated Event Details Successfully");
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
             <DialogTitle
               style={{
                 backgroundColor: '#445069',
                 color: 'white',
                 textAlign: 'center',
                 padding: '16px',
                 fontWeight: 'bold',
                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
               }}
             >
               {selectedEvent.eventTitle}
             </DialogTitle>
             <DialogContent
               style={{
                 padding: '24px',
                 backgroundColor: '#f5f5f5',
                 borderRadius: '8px',
                 boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
               }}
             >
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                 {/* Image Section */}
                 <div style={{ flex: '1', paddingRight: '20px', display: 'flex', justifyContent: 'center' }}>
                   <img
                     src={
                       selectedEvent.imageBase64
                         ? `data:image/jpeg;base64,${selectedEvent.imageBase64}`
                         : '/default-profile.jpg'
                     }
                     alt="Event"
                     style={{
                       width: '100%',
                       maxWidth: '350px',
                       height: 'auto',
                       borderRadius: '8px',
                       boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                     }}
                   />
                 </div>
           
                 {/* Details Section */}
                 <div
                   style={{
                     flex: '2',
                     backgroundColor: '#eae4e4',
                     borderRadius: '8px',
                     padding: '20px',
                     boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                   }}
                 >
                   <Typography
                     variant="h6"
                     style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}
                   >
                     <b>Date:</b> {selectedEvent.eventDate.split('T')[0]}
                   </Typography>
                   <Typography
                     variant="h6"
                     style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}
                   >
                     <b>Location:</b> {selectedEvent.location}
                   </Typography>
                   <Typography
                     variant="h6"
                     style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}
                   >
                     <b>Category:</b> {selectedEvent.category}
                   </Typography>
                   <Typography
                     variant="h6"
                     style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}
                   >
                     <b>Description:</b> {selectedEvent.eventDescription}
                   </Typography>
                 </div>
               </div>
           
               {/* Registrations Table */}
               {registrations.length > 0 && (
                 <div
                   style={{
                     backgroundColor: '#ffffff',
                     borderRadius: '8px',
                     padding: '20px',
                     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                   }}
                 >
                   <Typography
                     variant="h6"
                     style={{ marginBottom: '12px', fontSize: '18px', fontWeight: 'bold', color: '#333' }}
                   >
                     Registrations:
                   </Typography>
                   <Table>
                     <TableHead>
                       <TableRow>
                         <TableCell style={{ fontWeight: 'bold', color: '#555' }}>Name</TableCell>
                         <TableCell style={{ fontWeight: 'bold', color: '#555' }}>Email</TableCell>
                         <TableCell style={{ fontWeight: 'bold', color: '#555' }}>Actions</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                       {registrations.map((reg) => (
                         <TableRow key={reg.registrationId}>
                           <TableCell>{`${reg.athlete.firstName} ${reg.athlete.lastName}`}</TableCell>
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
        <Dialog open={profileModalOpen} onClose={handleCloseProfileModal} maxWidth="md" fullWidth>
        <DialogTitle
          style={{
            backgroundColor: '#E68369',
            color: 'white',
            padding: '16px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            textAlign: 'center',
          }}
        >
          <strong>Athlete Profile</strong>
        </DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '24px',
            backgroundColor: '#fafafa',
            borderRadius: '8px',
            boxShadow: '0 6px 14px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px', // Increase the maxWidth of the content section
          }}
        >
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center', paddingRight: '20px' }}>
            <img
              src={athleteDetails.photoBase64 ? `data:image/jpeg;base64,${athleteDetails.photoBase64}` : '/default-profile.jpg'}
              alt="Athlete"
              style={{
                width: '100%',
                maxWidth: '400px', // Increase image maxWidth for a larger image
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>
          <div
            style={{
              flex: '2',
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
              maxWidth: '650px', // Increase maxWidth of the details box
            }}
          >
            <Typography
              variant="h6"
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: '400',
                color: '#333',
              }}
            >
              <strong>Name:</strong> {athleteDetails.firstName} {athleteDetails.lastName}
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: '400',
                color: '#333',
              }}
            >
              <strong>Gender:</strong> {athleteDetails.gender}
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: '400',
                color: '#333',
              }}
            >
              <strong>Category:</strong> {athleteDetails.category}
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: '400',
                color: '#333',
              }}
            >
              <strong>Height:</strong> {athleteDetails.height} cm
            </Typography>
            <Typography
              variant="h6"
              style={{
                marginBottom: '20px',
                fontSize: '16px',
                fontWeight: '400',
                color: '#333',
              }}
            >
              <strong>Weight:</strong> {athleteDetails.weight} kg
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px' }}>
              <Button
                onClick={handleCloseProfileModal}
                color="primary"
                variant="contained"
                style={{
                  backgroundColor: '#3f51b5',
                  color: 'white',
                  fontWeight: '500',
                  padding: '8px 24px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  textTransform: 'none',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                Close
              </Button>
            </div>
          </div>
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