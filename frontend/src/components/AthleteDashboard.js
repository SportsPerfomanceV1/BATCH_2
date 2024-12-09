import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, AppBar, Toolbar, Dialog } from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import LoginIcon from "@mui/icons-material/Login";

import axios from "axios";
import '../styles/athlete.css';
import defaultProfileImage from './images/default-profile.jpg';

function AthleteDashboard() {
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);
  const [events, setEvents] = useState([]);
  // const [coaches, setCoaches] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [assistanceRequests, setAssistanceRequests] = useState([]);


  // const [remarks, setRemarks] = useState({});

  const [currentSection, setCurrentSection] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  //const [selectedTab, setSelectedTab] = useState('Overview');
  const [remark, setRemark] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [selectedEvent2, setSelectedEvent2] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Registered');
  const [selectedSubTab, setSelectedSubTab] = useState('Overview');

  const [assistanceDetails, setAssistanceDetails] = useState({
    status: null,
    coachId: null,
    coach: null,
    requestPending: false,
  });


  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    height: '',
    weight: '',
    category: '',
    coach: '',
  });
  const [topPerformances, setTopPerformances] = useState([]); // Top performances state (list)
  const [error, setError] = useState(""); // Error handling state



  // Fetch top performances
  useEffect(() => {
    const fetchTopPerformances = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/athlete/top-performance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopPerformances(response.data); // Expecting an array
      } catch (err) {
        setError(err.response?.data?.error || "NO DATA YET");
      }
    };

    fetchTopPerformances();
  }, []);


  const filterCompletedEvents = (resultStatus) => {
    const today = new Date();
    return events.filter((event) => {
      const eventDate = new Date(event.eventDate);
      return (
        eventDate < today &&
        (resultStatus === 'Result Pending'
          ? event.resultStatus === 'Pending'
          : event.resultStatus === 'Published')
      );
    });
  };


  const [showDialog, setShowDialog] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState(null);

  const [eventResults, setEventResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const resultsPerPage = 5;

  useEffect(() => {
    const fetchEventResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/athlete/all-results", {
          params: { page, size: resultsPerPage },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.length < resultsPerPage) {
          setHasMore(false);
        }

        setEventResults((prevResults) => [...prevResults, ...response.data]);
      } catch (err) {
        setError(err.response?.data?.error || "NO DATA YET");
      }
    };

    fetchEventResults();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };



  useEffect(() => {
    loadAthleteProfile();
    // fetchAssistanceStatus();
    loadAllEvents();
    loadMyEvents();
    // loadAllCoaches();
    // fetchCoaches();

  }, []);




  const loadAthleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/athlete/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch athlete profile");
      }
  
      const data = await response.json();
  
    // Correctly handle date parsing and formatting to ensure accuracy


      const formattedDisplayDate = data.birthDate ? formatDateForDisplayAndForm(data.birthDate) : 'Data not available';
      const formattedFormDate = data.birthDate ? formatDateForDisplayAndForm(data.birthDate) : '';
  
      // Set athlete data (for display purposes)
      setAthlete({
        firstName: data.firstName || 'Data not available',
        lastName: data.lastName || '',
        birthDate: formattedDisplayDate, // User-friendly format for viewing
        gender: data.gender || 'Data not available',
        height: data.height || 'Data not available',
        weight: data.weight || 'Data not available',
        category: data.category || 'Data not available',
        photoBase64: data.photoBase64 || null,
      });
  
      // Set form data (for editing purposes)
      setUpdatedProfile({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        birthDate: formattedFormDate, // Form-compatible format
        gender: data.gender || '',
        height: data.height || '',
        weight: data.weight || '',
        category: data.category || 'Not specified',
        coach: data.coach || null,
      });
    } catch (error) {
      console.error("Error loading athlete profile:", error);
    }
  };
  
  // Handle form changes dynamically
  const handleProfileChange2 = (event) => {
    const { name, value } = event.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value, // Update only the changed field
    }));
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
      console.log(data);
      console.log(data.eventId);
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const loadMyEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/athlete/events/registered', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setMyEvents(data);
    } catch (error) {
      console.error("Error loading my events:", error);
    }
  };
  const formatDateForDisplayAndForm = (dateString) => {
    if (!dateString) return '';
    const utcDate = new Date(dateString); // Parse the UTC date string
    
    // Adjust for the local timezone offset
    const localDate = new Date(utcDate.getTime() + new Date().getTimezoneOffset() * -60000);
    
    // Format to 'YYYY-MM-DD'
    return localDate.toISOString().split('T')[0];
  };
  const handleViewEvent2 = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/athlete/events/${eventId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setSelectedEvent2(data);
    } catch (error) {
      console.error("Error loading my events:", error);
    }

  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  const handleLogout = () => {
    navigate('/*'); // Redirect to login page
  };

  const handleEditProfile = () => {
    setEditingProfile(true);
  };
  const handleOpenRegisterPopup = (event) => setRegisteringEvent(event);

  const handleViewEvent = (event) => setSelectedEvent(event);


  const handleCloseModal = () => {
    setEditingProfile(false); // Close the modal
    setSelectedEvent(null);   // Reset the selected event state
    setRegisteringEvent(null); // Reset the registering event state
    setRemark('');
  };
  const handleCloseModal1 = () => {
    setSelectedEvent2(null);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Store the uploaded image
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setUpdatedProfile({
      ...updatedProfile,
      [name]: value,
    });
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();
  
    // Append fields to the formData only if they are not empty or unchanged
    if (updatedProfile.firstName.trim()) formData.append('firstName', updatedProfile.firstName.trim());
    if (updatedProfile.lastName.trim()) formData.append('lastName', updatedProfile.lastName.trim());
    if (updatedProfile.birthDate) formData.append('birthDate', updatedProfile.birthDate);
    if (updatedProfile.gender.trim()) formData.append('gender', updatedProfile.gender.trim());
    if (updatedProfile.height.trim()) formData.append('height', updatedProfile.height.trim());
    if (updatedProfile.weight.trim()) formData.append('weight', updatedProfile.weight.trim());
    if (updatedProfile.category.trim()) formData.append('category', updatedProfile.category.trim());
    if (newImage) formData.append('photoUrl', newImage); // Add photo only if a new one is uploaded
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/athlete/createProfile', {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setEditingProfile(false); // Close the modal
        loadAthleteProfile(); // Reload the updated profile
        alert("Profile updated successfully!");
      } else {
        const errorDetails = await response.json();
        console.error('Error saving profile:', errorDetails);
        alert("Failed to update the profile. Please try again.");
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  

  const handleRegisterForEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/athlete/registerForEvent/${eventId}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          remarks: remark
        })
      });

      if (response.ok) {
        loadAllEvents();
        loadMyEvents(); // Reload my events after registering
        setShowSuccessPopup(true);
        handleCloseModal();
      } else {
        console.log(`${eventId}`);
        console.error('Error registering for event:', response);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };


  const filterMyEvents = () => {
    switch (selectedSubTab) {
      case 'Pending':
        return myEvents.filter(event => event.status === 'Pending');
      case 'Approved':
        return myEvents.filter(event => event.status === 'Approved');
      case 'Rejected':
        return myEvents.filter(event => event.status === 'Rejected');
      default:
        return myEvents;
    }
  };



  const [selectedSubTab2, setSelectedSubTab2] = useState('Result Pending');
  const [events2, setEvents2] = useState([]);
  const [selectedEvent3, setSelectedEvent3] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [athleteResult, setAthleteResult] = useState(null);

  // Fetch events based on selected tab
  useEffect(() => {
    const fetchEvents2 = async () => {
      const token = localStorage.getItem("token");
      const endpoint =
        selectedSubTab2 === 'Result Pending'
          ? `athlete/events/no-results`
          : `athlete/events/with-results`;
          setEvents2([]);
      try {
        
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        const data = await response.json();
        setEvents2(data || []); // Fallback to an empty array if API returns null
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents2([]); // Handle error gracefully by setting events to empty
      }
    };

    fetchEvents2();
  }, [selectedSubTab2]);

  // Handle viewing an event
  const handleViewEvent3 = async (eventId) => {

    const token = localStorage.getItem("token");
    const response = await fetch(`athlete/events/${eventId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    const data = await response.json();
    setSelectedEvent3(data); // Set the selected event details

    try {

      const athleteResultResponse = await fetch(
        `athlete/results/event/${eventId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      }
      );
      const resultData = await athleteResultResponse.json();
      setAthleteResult(resultData);

      // Fetch leaderboard for the event
      const leaderboardResponse = await fetch(`athlete/event/leaderboard/${eventId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      const leaderboardData = await leaderboardResponse.json();
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching event details:', error);
      // setSelectedEvent3(null);
      setAthleteResult(null);
      setLeaderboard([]);
    }


  }





  // const [currentSection, setCurrentSection] = useState('coach'); // Assuming 'coach' section is the active one
  const [assistanceRequest, setAssistanceRequest] = useState(null);
  const [coaches, setCoaches] = useState([]);
  const [coachDetails, setCoachDetails] = useState(null);
  const [coachAchievements, setCoachAchievements] = useState([]);
  const [coachWeightPlan, setCoachWeightPlan] = useState([]);
  const [coachDietPlan, setCoachDietPlan] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [selectedCoachId, setSelectedCoachId] = useState(null);



  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch Assistance Request
    axios.get('/athlete/getassistancereq', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const assistanceData = response.data;
        setAssistanceRequest(assistanceData);

        if (assistanceData && assistanceData.status === 'Accepted') {
          // Fetch Coach Details
          axios.get(`/athlete/coach/${assistanceData.coachId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(coachResponse => {
              setCoachDetails(coachResponse.data);
            })
            .catch(error => {
              console.error('Error fetching coach details:', error);
            });

          // Fetch Coach's Achievements
          axios.get(`/athlete/achievements/coach/${assistanceData.coachId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(achievementsResponse => {
              setCoachAchievements(achievementsResponse.data);
            })
            .catch(error => {
              console.error('Error fetching coach achievements:', error);
            });

          // Fetch Coach's Weight Plan
          axios.get(`/athlete/getweightplan`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(weightPlanResponse => {
              setCoachWeightPlan(weightPlanResponse.data);
            })
            .catch(error => {
              console.error('Error fetching coach weight plans:', error);
            });

          // Fetch Coach's Diet Plan
          axios.get(`/athlete/getdailydiets`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(dietPlanResponse => {
              setCoachDietPlan(dietPlanResponse.data);
            })
            .catch(error => {
              console.error('Error fetching coach diet plans:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error fetching assistance request:', error);
      });

    // Fetch All Coaches
    axios.get('/athlete/getallcoaches', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCoaches(response.data);
      })
      .catch(error => {
        console.error('Error fetching coaches:', error);
      });



  }, [token]); // Add dependencies if needed







  const handleShowCoachProfile = (coachId) => {
    // Fetch Coach's General Info
    axios.get(`/athlete/coach/${coachId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCoachDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching coach details:', error);
      });

    // Fetch Coach's Achievements
    axios.get(`/athlete/achievements/coach/${coachId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCoachAchievements(response.data);
      })
      .catch(error => {
        console.error('Error fetching coach achievements:', error);
      });

    // Fetch Coach's Weight Plan
    axios.get(`/athlete/getweightplan`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCoachWeightPlan(response.data);
      })
      .catch(error => {
        console.error('Error fetching coach weight plans:', error);
      });

    // Fetch Coach's Diet Plan
    axios.get(`/athlete/getdailydiets`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCoachDietPlan(response.data);
      })
      .catch(error => {
        console.error('Error fetching coach diet plans:', error);
      });

    setSelectedCoachId(coachId);
    setShowModal(true);
  };

  const handleRequestAssistance = async (coachId) => {
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('coachId', coachId);
      formData.append('remarks', remarks[coachId] || '');

      const response = await fetch(`/athlete/createassistancereq`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        alert('Assistance request sent successfully!');
        loadAthleteProfile();
      } else {
        const errorData = await response.json();
        console.error('Error requesting assistance:', errorData.message);
        alert('Failed to send assistance request. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting assistance:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    header: {
      fontSize: '2em',
      marginBottom: '20px',
      textAlign: 'center',
    },
    coachList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '20px',
    },
    coachCard: {
      width: '250px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
    },
    coachImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    coachName: {
      fontSize: '1.5em',
      marginTop: '10px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    modal: {
      display: showModal ? 'block' : 'none',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      width: '60%',
      maxWidth: '700px',
      textAlign: 'center',
    },
    closeModal: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      fontSize: '20px',
      cursor: 'pointer',
    },
    achievementsBox: {
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    remarkTextarea: {
      width: '100%',
      padding: '10px',
      marginTop: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
    },
  };


  return (
    <div className="athlete-dashboard">

      <AppBar position="static" className="navbar">
        <Toolbar className="navbar-content">
          <Typography variant="h5" className="navbar-title">
            Athletics
          </Typography>
          <Box className="navbar-actions">
            <Link to="" className="logout-link" >
              <Button className="logout-button" onClick={() => setCurrentSection('profile')}>
                Profile
              </Button>
            </Link>
            <Link to="" className="logout-link">
              <Button className="logout-button" onClick={() => setCurrentSection('events')}>
                Events
              </Button>
            </Link>
            <Link to="" className="logout-link">
              <Button className="logout-button" onClick={() => setCurrentSection('myEvents')}>
                My Events
              </Button>
            </Link>
            <Link to="" className="logout-link">
              <Button className="logout-button" onClick={() => setCurrentSection('coach')}>
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
      <h1></h1>


      <div className="content">
        {currentSection === 'profile' && (
          <>
            <div className="transition-container">
              <div className="centered-jump">
                <p></p>
                <h2> Profile</h2>
              </div>
              <div className="profile-section">
                {athlete && (
                  <>

                    <img
                      src={athlete.photoBase64 ? `data:image/jpeg;base64,${athlete.photoBase64}` : defaultProfileImage}
                      alt="Profile"
                      className="profile-photo"
                    />

                    <div className="athlete-info">
                      <p>Name: {athlete.firstName} {athlete.lastName}</p>
                      <p>Date of Birth: {athlete.birthDate ? athlete.birthDate.split('T')[0] : 'N/A'}
                      </p>
                      <p>Gender: {athlete.gender}</p>
                      <p>Height: {athlete.height}</p>
                      <p>Weight: {athlete.weight}</p>
                      <p>Category: {athlete.category}</p>
                      <button onClick={handleEditProfile}>Edit Profile</button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="top-performance-card" style={{ margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "24px" }}>Top 5 Performances</h2>
              {error ? (
                <div className="error-message" style={{ color: "red", textAlign: "center" }}>{error}</div>
              ) : topPerformances.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
                      <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Event Name</th>
                      <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Meet Name</th>
                      <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Score</th>
                      <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformances.slice(0, 5).map((performance, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.eventName}</td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.meetName}</td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #eee", textAlign: "center" }}>{performance.score}</td>
                        <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ textAlign: "center", color: "#666" }}>No top performances found.</p>
              )}
            </div>

            <div style={dashboardStyles}>
              <div style={cardStyles}>
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "24px" }}>All Event Results</h2>
                {error ? (
                  <div className="error-message" style={{ color: "red", textAlign: "center" }}>{error}</div>
                ) : (
                  <table style={tableStyles}>
                    <thead>
                      <tr style={headerRowStyles}>
                        <th>Event Name</th>
                        <th>Meet Name</th>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventResults.map((result, index) => (
                        <tr key={index} style={rowStyles}>
                          <td>{result.eventName}</td>
                          <td>{result.meetName}</td>
                          <td>{formatDateForDisplayAndForm(result.eventDate)}</td>
                          <td>{result.score}</td>
                          <td>{result.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {hasMore && !error && (
                  <button onClick={loadMore} style={buttonStyles}>
                    Load More
                  </button>
                )}
                {!hasMore && !error && (
                  <p style={noMoreStyles}>No more results to display.</p>
                )}
              </div>
              {/* Existing elements below */}
              <div>
                {/* Add other admin dashboard components here */}
              </div>
            </div>



          </>
        )}

{editingProfile && (
  <div className="modal">
    <div className="modal-content">
      <h2>Edit Profile</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* First Name */}
        <label>
          <input
            type="text"
            name="firstName"
            value={updatedProfile.firstName}
            onChange={handleProfileChange2} // Updated handler
            placeholder=" " /* Placeholder for compatibility */
          />
          <span>First Name</span>
        </label>

        {/* Last Name */}
        <label>
          <input
            type="text"
            name="lastName"
            value={updatedProfile.lastName}
            onChange={handleProfileChange2} // Updated handler
            placeholder=" "
          />
          <span>Last Name</span>
        </label>

        {/* Date of Birth */}
        <label>
          <input
            type="date"
            name="birthDate"
            value={updatedProfile.birthDate}
            onChange={handleProfileChange2} // Updated handler
            placeholder=" "
          />
          <span>Date of Birth</span>
        </label>

        {/* Gender */}
        <label>
          <input
            type="text"
            name="gender"
            value={updatedProfile.gender}
            onChange={handleProfileChange2} // Updated handler
            placeholder=" "
          />
          <span>Gender</span>
        </label>

        {/* Height */}
        <label>
          <input
            type="text"
            name="height"
            value={updatedProfile.height}
            onChange={handleProfileChange2} // Updated handler
            placeholder=" "
          />
          <span>Height</span>
        </label>

        {/* Weight */}
        <label>
          <input
            type="text"
            name="weight"
            value={updatedProfile.weight}
            onChange={handleProfileChange2} // Updated handler
            placeholder=" "
          />
          <span>Weight</span>
        </label>

        {/* Category */}
        <label>
          <input
            type="text"
            name="category"
            value={updatedProfile.category}
            onChange={handleProfileChange2} // Updated handler
            placeholder=" "
          />
          <span>Category</span>
        </label>

        {/* Image Upload */}
        <label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              marginTop: "1rem",
              padding: "10px",
              border: "2px dashed gray",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "border-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = "green")}
            onMouseLeave={(e) => (e.target.style.borderColor = "gray")}
          />
        </label>
        <p></p>

        {/* Modal Actions */}
        <div className="modal-actions">
          <button
            type="button"
            onClick={handleSaveProfile}
            className="btn2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="btn2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

        {currentSection === 'events' && (
          <div className="transition-container">
            <div className="events-section">
              <div className="centered-jump">
                <h2> Events</h2>
              </div>
              <div className="events-container">
                {events.map(event => (
                  <div key={event.eventId} className="event-card">
                    <img
                      src={event.imageBase64 ? `data:image/jpeg;base64,${event.imageBase64}` : '/default-profile.jpg'}
                      alt={event.eventTitle} onClick={() => handleViewEvent(event)} />
                    <h3 style={{ textAlign: 'center' }}>{event.eventTitle}</h3>
                    <p>Meet: {event.meetId.meetName}</p>
                    <p>Category: {event.category}</p>
                    <button className="button-19" onClick={() => handleViewEvent(event)}>View</button>
                    <p></p>
                    <button className="button-19" onClick={() => handleOpenRegisterPopup(event)}>Register</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedEvent && (
          <div className="modal">
            <div className="modal-content" style={{ height: '90%' }}>
              <h2>{selectedEvent.eventTitle}</h2>
              <img src={selectedEvent.imageBase64 ? `data:image/jpeg;base64,${selectedEvent.imageBase64}` : '/default-profile.jpg'}
                alt={selectedEvent.eventTitle} onClick={() => handleViewEvent(selectedEvent)} width={'385px'} height={'200px'} style={
                  {
                    paddingLeft: "5%"
                  }
                } />
              <p>Meet: {selectedEvent.meetId.meetName}</p>
              <p>Category: {selectedEvent.category}</p>
              <p>Description: {selectedEvent.eventDescription}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Event Date: {formatDateForDisplayAndForm(selectedEvent.eventDate)}</p>
              <textarea placeholder="Remarks (optional)" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
              <p></p>

              <button onClick={() => handleRegisterForEvent(selectedEvent.eventId)} style={{ width: '210px', marginRight: '13px' }}>Register</button>
              <button onClick={handleCloseModal} style={{ width: '210px' }}>Close</button>
            </div>
          </div>
        )}

        {registeringEvent && (
          <div className="modal" >
            <div className="modal-content" style={{ width: '400px', height: '300px', textAlign: 'center' }}>
              <h1>Register for {registeringEvent.eventTitle}</h1>
              <textarea placeholder="Add your remark" required value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
              <p></p>
              <button onClick={() => handleRegisterForEvent(registeringEvent.eventId)} style={{ width: '150px', marginRight: '15px' }}>Submit</button>
              <button onClick={handleCloseModal} style={{ width: '150px', marginRight: '15px' }}>Cancel</button>
            </div>
          </div>
        )}
        {showSuccessPopup && (
          <div className="modal">
            <div className="modal-content" style={{ textAlign: 'center', height: '200px' }}>
              <h2>Registration Successful!</h2>
              <p>You have successfully registered for the event.</p>
              <button onClick={closeSuccessPopup} style={{ marginTop: '20px' }}>OK</button>
            </div>
          </div>
        )}
        {
}


        {currentSection === 'myEvents' && (
          <div className="transition-container">
            <div className="my-events-section">
              <div className="centered-jump">
                <h2>My Events</h2>
              </div>

              {/* Add the new buttons */}
              <div className="event-buttons">
                <button
                  className={selectedTab === 'Registered' ? 'active' : ''}
                  onClick={() => setSelectedTab('Registered')}
                >
                  REGISTERED EVENTS
                </button>
                <button
                  className={selectedTab === 'Completed' ? 'active' : ''}
                  onClick={() => setSelectedTab('Completed')}
                >
                  COMPLETED EVENTS
                </button>
              </div>

              {/* Registered Events Section */}
              {selectedTab === 'Registered' && (
                <div>
                  <div className="tabs">
                    {['Overview', 'Pending', 'Approved', 'Rejected'].map((tab) => (
                      <button
                        key={tab}
                        className={selectedSubTab === tab ? 'active' : ''}
                        onClick={() => setSelectedSubTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <th>Meet Name</th>
                        <th>Registration Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterMyEvents(selectedSubTab).map((regis) => (
                        <tr key={regis.registrationId}>
                          <td>{regis.eventName}</td>
                          <td>{regis.meetName}</td>
                          <td>{formatDateForDisplayAndForm(regis.registrationDate)}</td>
                          <td>{regis.status}</td>
                          <td>
                            <button
                              className="button-19"
                              onClick={() => handleViewEvent2(regis.eventId)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Completed Events Section */}
              {selectedTab === 'Completed' && (
                <div>
                  <div classname="tabs">
                    {['Result Pending', 'Result Published'].map((tab) => (
                      <button
                        key={tab}
                        className={selectedSubTab2 === tab ? 'active' : ''}
                        onClick={() => setSelectedSubTab2(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Event Name</th>
                        <th>Meet Name</th>
                        <th>Event Date</th>
                        <th>Result Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events2 && (events2.map((event) => (
                        <tr key={event.eventId}>
                          <td>{event.eventTitle}</td>
                          <td>{event.meetName}</td>
                          <td>{formatDateForDisplayAndForm(event.eventDate)}</td>
                          <td>
                            {selectedSubTab2 === 'Result Pending' ? 'Pending' : 'Published'}
                          </td>
                          <td>
                            <button
                              className="button-19"
                              onClick={() => handleViewEvent3(event.eventId)}
                            >
                              View
                            </button>
                          </td>
                        </tr>

                        
                      )
                    
                    )
                      )}
                    </tbody>
                  </table>
                  {selectedEvent3 && (
                    <div className="modal-content"
                    >
                      <h2>{selectedEvent3.eventTitle}</h2>
                      <img
                        src={`data:image/png;base64,${selectedEvent3.imageBase64}`}
                        alt={selectedEvent3.eventTitle}
                      />
                      <p>Meet Name: {selectedEvent3.meetName}</p>
                      <p>Event Date: {formatDateForDisplayAndForm(selectedEvent3.eventDate)}</p>
                      <p>Event Description: {selectedEvent3.eventDescription}</p>
                      <p>Event Category: {selectedEvent3.category}</p>
                      <p>Event Location: {selectedEvent3.location}</p>

                      {/* Athlete Result */}
                      {selectedSubTab2 === 'Result Published' && athleteResult && athleteResult.comment && leaderboard && (
                        <div>
                          <h3>Your Result</h3>
                          <table>
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Score</th>
                                <th>Comment</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  {leaderboard.findIndex(entry => entry.athleteName === athleteResult.athleteName) + 1}
                                </td>
                                <td>{athleteResult.score}</td>
                                <td>{athleteResult.comment}</td>
                              </tr>
                            </tbody>
                          </table>

                        </div>
                      )}
                      

                      {/* Leaderboard */}
                      {leaderboard && (
                        <div>
                          <h3>Leaderboard</h3>
                          <table>
                            <thead>
                              <tr>
                                <th>Rank</th>
                                <th>Athlete Name</th>
                                <th>Score</th>
                                <th>Comment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {leaderboard.length > 0 ? (
                                leaderboard.map((entry, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td> {/* Rank is just the index + 1 */}
                                    <td>{entry.athleteName}</td>
                                    <td>{entry.score}</td>
                                    <td>{entry.comment}</td> {/* Assuming 'comment' is part of the entry */}
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4">No leaderboard data available.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                    </div>


               
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      

        {selectedEvent2 && (
          <div
            className="modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                maxWidth: "600px",
                width: "100%",
                height: "530px",
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
              }}
            >
              <h2 style={{ margin: "10px 0", fontSize: "24px", fontWeight: "bold" }}>
                {selectedEvent2.eventTitle}
              </h2>
              {selectedEvent2.imageBase64 && (
                <img
                  src={`data:image/jpeg;base64,${selectedEvent2.imageBase64}`}
                  alt={selectedEvent2.eventTitle}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                />
              )}
              <div
                style={{
                  padding: "20px",
                  boxSizing: "border-box",
                  borderRadius: "0 0 8px 8px",
                  backgroundColor: "#f1eeee",
                }}
              >
                <p><b>Meet Name: </b>{selectedEvent2.meetName}</p>
                <p><b>Category: </b>{selectedEvent2.category}</p>
                <p><b>Event Description: </b>{selectedEvent2.eventDescription}</p>
                <p><b>Event Date: </b>{formatDateForDisplayAndForm(selectedEvent2.eventDate)}</p>
                <p><b>Location: </b>{selectedEvent2.location}</p>
                <button
                  onClick={handleCloseModal1}
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#007BFF"}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      

        {currentSection === 'coach' && (

          <>   {/* If there is an assistance request */}
            {assistanceRequest && assistanceRequest.status === 'Accepted' && (
              <>
                <div style={styles2.container}>
                  <div style={styles2.coachCard}>
                    {/* Coach Profile Section */}
                    <img
                      src={
                        coachDetails?.imageBase64
                          ? `data:image/jpeg;base64,${coachDetails.imageBase64}`
                          : '/default-profile.jpg'
                      }
                      alt={`${coachDetails?.firstName} ${coachDetails?.lastName}`}
                      style={styles2.coachImage}
                    />
                    <h3 style={styles2.coachName}>
                      {coachDetails?.firstName} {coachDetails?.lastName}
                    </h3>
                    <p style={styles2.coachInfo}>
                      <strong>Expertise:</strong> {coachDetails?.expertise || 'N/A'}
                    </p>
                    <p style={styles2.coachInfo}>
                      <strong>Email:</strong> {coachDetails?.email || 'N/A'}
                    </p>

                    {/* Achievements Section */}
                    <div style={styles2.section}>
                      <h4 style={styles2.sectionTitle}>Achievements</h4>
                      {coachAchievements?.length > 0 ? (
                        coachAchievements.map((achievement, index) => (
                          <div key={index} style={styles2.achievementsBox}>
                            <h5 style={styles2.achievementTitle}>{achievement.title}</h5>
                            <p style={styles2.achievementDescription}>{achievement.description}</p>
                          </div>
                        ))
                      ) : (
                        <p style={styles2.emptyText}>No achievements available</p>
                      )}
                    </div>

                    {/* Weight Plan Section */}
                    <div style={styles2.section}>
                      <h4 style={styles2.sectionTitle}>Weight Plan</h4>
                      {coachWeightPlan ? (
                        <>
                         
                          <p>
                            <strong>Start Weight:</strong> {coachWeightPlan.startWeight} kg
                          </p>
                          <p>
                            <strong>Target Weight:</strong> {coachWeightPlan.targetWeight} kg
                          </p>
                          <p>
                            <strong>Preference:</strong> {coachWeightPlan.preference}
                          </p>
                          <p>
                            <strong>Daily Calorie Goal:</strong> {coachWeightPlan.dailyCalorieGoal} kcal
                          </p>
                        </>
                      ) : (
                        <p style={styles2.emptyText}>No weight plan available</p>
                      )}
                    </div>

                    {/* Diet Plan Section */}
                    <div style={styles2.section}>
                      <h4 style={styles2.sectionTitle}>Diet Plan</h4>
                      {coachDietPlan?.length > 0 ? (
                        <ul style={styles2.dietList}>
                          {coachDietPlan.map((diet, index) => (
                            <li key={index} style={styles2.dietItem}>
                              <p>
                                <strong>Date:</strong> {new Date(diet.date).toLocaleDateString()}
                              </p>
                              <p>
                                <strong>Calories:</strong> {diet.calories} kcal
                              </p>
                              {/* <p>
                  <strong>Current Weight:</strong> {diet.currentWeight} kg
                </p> */}
                              {/* <p>
                  <strong>Weight Plan ID:</strong> {diet.weightPlanId}
                </p> */}
                              <p>
                                <strong>Protein Intake:</strong> {diet.protein} grams
                              </p>
                              <p>
                                <strong>Carbohydrate Intake:</strong> {diet.carbohydrate} grams
                              </p>
                              <p>
                                <strong>Fat Intake:</strong> {diet.fat} grams
                              </p>
                              <p>
                                <strong>Fibre Intake:</strong> {diet.fibre} grams
                              </p>
                              <p>
                                <strong>Water Intake:</strong> {diet.water} Litre
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={styles2.emptyText}>No diet plan available</p>
                      )}
                    </div>
                  </div>
                </div>
              </>

            )}

            {/* If assistance request is pending */}
            {assistanceRequest && assistanceRequest.status === 'Pending' && (
              <>
                <div style={styles.coachList}>
                  <div style={styles.coachCard}>
                    <img
                      src={coachDetails?.imageBase64 ? `data:image/jpeg;base64,${coachDetails?.imageBase64}` : '/default-coach.jpg'}
                      alt={`${coachDetails?.firstName} ${coachDetails?.lastName}`}
                      style={styles.coachImage}
                    />

                    <h3 style={styles.coachName}>{coachDetails?.firstName} {coachDetails?.lastName}</h3>
                    <p style={styles2.coachInfo}>
                      <strong>Expertise:</strong> {coachDetails?.expertise || 'N/A'}
                    </p>
                    <p style={styles2.coachInfo}>
                      <strong>Email:</strong> {coachDetails?.email || 'N/A'}
                    </p>
                    <h4>Achievements</h4>
                    {coachAchievements?.map((achievement, index) => (
                      <div key={index} style={styles.achievementsBox}>
                        <h5>{achievement.title}</h5>
                        <p>{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* If no assistance request or if it's rejected */}
            {!assistanceRequest || assistanceRequest.status === 'Rejected' && (
              <>
                {/* <h1>HElllo</h1> */}
                <div style={styles.coachList}>
                  {coaches?.map((coach) => (
                    <div
                      key={coach.coachId}
                      style={styles.coachCard}
                      onClick={() => handleShowCoachProfile(coach.coachId)}
                    >
                      <img
                        src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-coach.jpg'}
                        alt={`${coach.firstName} ${coach.lastName}`}
                        style={styles.coachImage}
                      />
                      <h3 style={styles.coachName}>{coach.firstName} {coach.lastName}</h3>

                      <button style={styles.button}>View Profile</button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Modal for Coach Profile */}
            {showModal && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <span style={styles.closeModal} onClick={() => setShowModal(false)}>&times;</span>
                  <h3>{coachDetails?.firstName} {coachDetails?.lastName}</h3>
                  <img
                    src={coachDetails?.imageBase64 ? `data:image/jpeg;base64,${coachDetails?.imageBase64}` : '/default-coach.jpg'}
                    alt={`${coachDetails?.firstName} ${coachDetails?.lastName}`}
                    style={styles.coachImage}
                  />
                    <p style={styles2.coachInfo}>
                      <strong>Expertise:</strong> {coachDetails?.expertise || 'N/A'}
                    </p>
                    <p style={styles2.coachInfo}>
                      <strong>Email:</strong> {coachDetails?.email || 'N/A'}
                    </p>
                  <h4>Achievements</h4>
                  {coachAchievements?.map((achievement, index) => (
                    <div key={index} style={styles.achievementsBox}>
                      <h5>{achievement.title}</h5>
                      <p>{achievement.description}</p>
                    </div>
                  ))}
                  <h4>Request Assistance</h4>
                  <textarea
                    style={styles.remarkTextarea}
                    placeholder="Enter remarks..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                  <button
                    style={styles.button}
                    onClick={() => handleRequestAssistance(coachDetails.coachId)}
                  >
                    Request Assistance
                  </button>
                </div>
              </div>
            )}


          </>
        )}

      </div>
    </div>
  );

}

// Inline styles
const dashboardStyles = {
  padding: "20px",
  backgroundColor: "#f0f4f8",
};

const cardStyles = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  backgroundColor: "#fff",
};

const headerStyles = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
};

const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
};

const headerRowStyles = {
  backgroundColor: "#007BFF",
  color: "white",
  textAlign: "left",
};

const rowStyles = {
  borderBottom: "1px solid #ccc",
};

const buttonStyles = {
  display: "block",
  margin: "10px auto",
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const noMoreStyles = {
  textAlign: "center",
  color: "#777",
};

const errorStyles = {
  textAlign: "center",
  color: "red",
  fontWeight: "bold",
};

const styles2 = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  },
  coachCard: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
  coachImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '3px solid #007BFF',
  },
  coachName: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#333',
  },
  coachInfo: {
    fontSize: '16px',
    color: '#666',
    margin: '5px 0',
  },
  section: {
    marginTop: '20px',
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: '10px',
    borderBottom: '2px solid #007BFF',
    paddingBottom: '5px',
  },
  achievementsBox: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
  achievementTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '5px 0',
  },
  achievementDescription: {
    fontSize: '14px',
    color: '#555',
  },
  emptyText: {
    fontSize: '14px',
    color: '#999',
    fontStyle: 'italic',
  },
  dietList: {
    listStyleType: 'none',
    padding: '0',
  },
  dietItem: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
};


export default AthleteDashboard;