// // import React, { useState, useEffect} from 'react';
// // import { Box, Button ,Typography, AppBar, Toolbar} from "@mui/material";
// // import { useNavigate ,Link} from 'react-router-dom';
// // import { format, parseISO} from 'date-fns';
// // import LoginIcon from "@mui/icons-material/Login";

// // import axios from "axios";
// // import '../styles/athlete.css';

// // function AthleteDashboard() {
// //   const navigate = useNavigate();
// //   const [athlete, setAthlete] = useState(null);
// //   const [events, setEvents] = useState([]);
// //   const [coaches, setCoaches] = useState([]);
// //   const [myEvents, setMyEvents] = useState([]);
// //   const [currentSection, setCurrentSection] = useState('profile');
// //   const [editingProfile, setEditingProfile] = useState(false);
// //   const [newImage, setNewImage] = useState(null);
// //   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
// //   const [selectedTab, setSelectedTab] = useState('Overview');
// //   const [remark, setRemark] = useState('');
// //   const [selectedEvent, setSelectedEvent] = useState(null);
// //   const [registeringEvent, setRegisteringEvent] = useState(null);
// //   const [selectedEvent2, setSelectedEvent2] = useState(null);
// //   const [updatedProfile, setUpdatedProfile] = useState({
// //     firstName: '',
// //     lastName: '',
// //     birthDate: '',
// //     gender: '',
// //     height: '',
// //     weight: '',
// //     category: '',
// //     coach: '',
// //   });
// //   const [topPerformances, setTopPerformances] = useState([]); // Top performances state (list)
// //   const [error, setError] = useState(""); // Error handling state

// //   // Fetch athlete details (example endpoint)
// //   // useEffect(() => {
// //   //   const fetchAthleteDetails = async () => {
// //   //     try {
// //   //       const token = localStorage.getItem("token");
// //   //       const response = await axios.get("/athlete/top-performance", {
// //   //         headers: {
// //   //           Authorization: `Bearer ${token}`,
// //   //         },
// //   //       });
// //   //       setAthlete(response.data);
// //   //     } catch (err) {
// //   //       console.error("Failed to fetch athlete details:", err);
// //   //     }
// //   //   };

// //   //   fetchAthleteDetails();
// //   // }, []);

// //   // Fetch top performances
// //   useEffect(() => {
// //     const fetchTopPerformances = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const response = await axios.get("/athlete/top-performance", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setTopPerformances(response.data); // Expecting an array
// //       } catch (err) {
// //         setError(err.response?.data?.error || "Failed to fetch top performances");
// //       }
// //     };

// //     fetchTopPerformances();
// //   }, []);


// //   const [eventResults, setEventResults] = useState([]);
// //   const [page, setPage] = useState(0);
// //   const [hasMore, setHasMore] = useState(true);
// //   const resultsPerPage = 5;

// //   useEffect(() => {
// //     const fetchEventResults = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const response = await axios.get("/athlete/all-results", {
// //           params: { page, size: resultsPerPage },
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         if (response.data.length < resultsPerPage) {
// //           setHasMore(false);
// //         }

// //         setEventResults((prevResults) => [...prevResults, ...response.data]);
// //       } catch (err) {
// //         setError(err.response?.data?.error || "Failed to fetch event results");
// //       }
// //     };

// //     fetchEventResults();
// //   }, [page]);

// //   const loadMore = () => {
// //     setPage((prevPage) => prevPage + 1);
// //   };



// //   useEffect(() => {
// //     loadAthleteProfile();
// //     loadAllEvents();
// //     loadMyEvents();
// //     loadAllCoaches();
// //   }, []);

// //   const loadAthleteProfile = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch('/athlete/profile', {
// //         method: "GET",
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //           "Content-Type": "application/json" 
// //         }
// //       });
// //       const data = await response.json();
// //       const parsedDate = parseISO(data.birthDate); // Parsing the date string to Date object
// //       const formattedDate = (parsedDate.getMonth() + 1).toString().padStart(2, '0') + '/' + 
// //       parsedDate.getDate().toString().padStart(2, '0') + '/' + 
// //       parsedDate.getFullYear();
// //       setAthlete(data);
// //       setUpdatedProfile({
// //         firstName: data.firstName,
// //         lastName: data.lastName,
// //         birthDate: data.birthDate,
// //         gender: data.gender,
// //         height: data.height,
// //         weight: data.weight,
// //         category: data.category,
// //         coach: data.coach,
// //       });
// //     } catch (error) {
// //       console.error("Error loading athlete profile:", error);
// //     }
// //   };



// //   const loadAllEvents = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch('athlete/events', {
// //         method: "GET",
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //         }
// //       });
// //       const data = await response.json();
// //       console.log(data);
// //       console.log(data.eventId);
// //       setEvents(data);
// //     } catch (error) {
// //       console.error("Error loading events:", error);
// //     }
// //   };


// //   // const availableCoaches = async () => {
// //   //   try {
// //   //     const response = await fetch('/api/coaches');
// //   //     const data = await response.json();
// //   //     return data; // returns a list of available coaches
// //   //   } catch (error) {
// //   //     console.error('Error fetching available coaches:', error);
// //   //   }
// //   // };


// //   const loadAllCoaches = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch('/coach', {
// //         method: "GET",
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //         }
// //       });
// //       const data = await response.json();
// //       console.log(data);
// //       setCoaches(data);
// //     } catch (error) {
// //       console.error("Error loading events:", error);
// //     }
// //   };

// //   const loadMyEvents = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch('/athlete/events/registered', {
// //         method: "GET",
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //         }
// //       });
// //       const data = await response.json();
// //       setMyEvents(data);
// //     } catch (error) {
// //       console.error("Error loading my events:", error);
// //     }
// //   };

// //   const handleViewEvent2 = async (eventId) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(`/athlete/events/${eventId}`, {
// //         method: "GET",
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //         }
// //       });
// //       const data = await response.json();
// //       setSelectedEvent2(data);
// //     } catch (error) {
// //       console.error("Error loading my events:", error);
// //     }

// //   };

// //   const closeSuccessPopup = () => {
// //     setShowSuccessPopup(false);
// //   };

// //   const handleLogout = () => {
// //     navigate('/*'); // Redirect to login page
// //   };

// //   const handleEditProfile = () => {
// //     setEditingProfile(true);
// //   };
// //   const handleOpenRegisterPopup = (event) => setRegisteringEvent(event);

// //   const handleViewEvent = (event) => setSelectedEvent(event);


// //   const handleCloseModal = () => {
// //     setEditingProfile(false); // Close the modal
// //     setSelectedEvent(null);   // Reset the selected event state
// //     setRegisteringEvent(null); // Reset the registering event state
// //     setRemark(''); 
// //   };
// //   const handleCloseModal1 = () => {
// //     setSelectedEvent2(null); 
// //   };

// //   const handleImageChange = (e) => {
// //     setNewImage(e.target.files[0]); // Store the uploaded image
// //   };

// //   const handleProfileChange = (e) => {
// //     const { name, value } = e.target;

// //     setUpdatedProfile({
// //       ...updatedProfile,
// //       [name]: value,
// //     });
// //   };

// //   const handleSaveProfile = async () => {
// //     const formData = new FormData();
// //     formData.append('firstName', updatedProfile.firstName);
// //     formData.append('lastName', updatedProfile.lastName);
// //     formData.append('birthDate', updatedProfile.birthDate);
// //     formData.append('gender', updatedProfile.gender);
// //     formData.append('height', updatedProfile.height);
// //     formData.append('weight', updatedProfile.weight);
// //     formData.append('category', updatedProfile.category);
// //     formData.append('coach', updatedProfile.coach);
// //     if (newImage) formData.append('photoUrl', newImage);

// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch('/athlete/createProfile', {
// //         method: 'POST',
// //         body: formData,
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //         }
// //       });

// //       if (response.ok) {
// //         setEditingProfile(false);
// //         <p>Updated</p>
// //         loadAthleteProfile(); // Reload the profile data
// //       } else {
// //         console.error('Error saving profile:', response);
// //       }
// //     } catch (error) {
// //       console.error('Error saving profile:', error);
// //     }
// //   };

// //   const handleRegisterForEvent = async (eventId) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await fetch(`/athlete/registerForEvent/${eventId}`, {
// //         method: 'POST',
// //         headers: {
// //           "Authorization": `Bearer ${token}`,
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({
// //           remarks: remark
// //         })
// //       });

// //       if (response.ok) {
// //         loadAllEvents();
// //         loadMyEvents(); // Reload my events after registering
// //         setShowSuccessPopup(true); 
// //         handleCloseModal();
// //       } else {
// //         console.log(`${eventId}`);
// //         console.error('Error registering for event:', response);
// //       }
// //     } catch (error) {
// //       console.error('Error registering for event:', error);
// //     }
// //   };


// //   const filterMyEvents = () => {
// //     switch (selectedTab) {
// //       case 'Pending':
// //         return myEvents.filter(event => event.status === 'Pending');
// //       case 'Approved':
// //         return myEvents.filter(event => event.status === 'Approved');
// //       case 'Rejected':
// //         return myEvents.filter(event => event.status === 'Rejected');
// //       default:
// //         return myEvents;
// //     }
// //   };

// //   // const TopPerformance = () => {
// //   //   const [topPerformance, setTopPerformance] = useState(null);
// //   //   const [error, setError] = useState("");

// //   //   useEffect(() => {
// //   //     const fetchTopPerformance = async () => {
// //   //       try {
// //   //         const token = localStorage.getItem("token");
// //   //         // Replace with your API endpoint to fetch top performance of the logged-in athlete
// //   //         const response = await axios.get("athlete/top-performance", {
// //   //           method: 'POST',
// //   //           headers: {
// //   //             "Authorization": `Bearer ${token}`,
// //   //             "Content-Type": "application/json"
// //   //           }});
// //   //         setTopPerformance(response.data);
// //   //       } catch (err) {
// //   //         setError(err.response?.data?.error || "Failed to fetch top performance");
// //   //       }
// //   //     };

// //   //     fetchTopPerformance();
// //   //   }, []);

// //   //   if (error) {
// //   //     return <div className="error-message">{error}</div>;
// //   //   }
// //   // };


// //   // const fetchCoachDetails = async (coachId) => {
// //   //   try {
// //   //     const response = await fetch(`/api/coaches/${coachId}`);
// //   //     const data = await response.json();
// //   //     return data; // returns coach details
// //   //   } catch (error) {
// //   //     console.error('Error fetching coach details:', error);
// //   //   }
// //   // };

// //   // // Function to fetch achievements for a coach
// //   // const fetchAchievements = async (coachId) => {
// //   //   try {
// //   //     const response = await fetch(`/api/coaches/${coachId}/achievements`);
// //   //     const data = await response.json();
// //   //     return data; // returns achievements
// //   //   } catch (error) {
// //   //     console.error('Error fetching achievements:', error);
// //   //   }
// //   // };

// //   // // Function to fetch diet plans for a coach
// //   // const fetchDietPlans = async (coachId) => {
// //   //   try {
// //   //     const response = await fetch(`/api/coaches/${coachId}/dietplans`);
// //   //     const data = await response.json();
// //   //     return data; // returns diet plans
// //   //   } catch (error) {
// //   //     console.error('Error fetching diet plans:', error);
// //   //   }
// //   // };

// //   // // Function to fetch weight plan for a coach
// //   // const fetchWeightPlan = async (coachId) => {
// //   //   try {
// //   //     const response = await fetch(`/api/coaches/${coachId}/weightplan`);
// //   //     const data = await response.json();
// //   //     return data; // returns weight plan
// //   //   } catch (error) {
// //   //     console.error('Error fetching weight plan:', error);
// //   //   }
// //   // };

// //   //   const [availableCoaches, setAvailableCoaches] = useState([]);
// //   //   const [selectedCoach, setSelectedCoach] = useState(null);
// //   //   const [achievements, setAchievements] = useState([]);
// //   //   const [dietPlans, setDietPlans] = useState([]);
// //   //   const [weightPlan, setWeightPlan] = useState(null);
// //   //   const [remark2, setRemark2] = useState('');
// //   //   const [showAssistanceForm, setShowAssistanceForm] = useState(false);
// //   //   const [showSuccessPopup2, setShowSuccessPopup2] = useState(false);

// //   //   const fetchAvailableCoaches = async () => {
// //   //     try {
// //   //       const token = localStorage.getItem("token");
// //   //       const response = await fetch('/athlete/getallcoaches', {
// //   //         headers: {
// //   //             Authorization: `Bearer ${token}`
// //   //         }
// //   //     });
// //   //       const data = await response.json();
// //   //       return data; // returns a list of available coaches
// //   //     } catch (error) {
// //   //       console.error('Error fetching available coaches:', error);
// //   //     }
// //   //   };

// //   //   useEffect(() => {
// //   //     // Fetch details when coachId is present
// //   //     if (athlete.coachId) {
// //   //       fetchCoachDetails(athlete.coachId).then((coachData) => setSelectedCoach(coachData));
// //   //       fetchAchievements(athlete.coachId).then((data) => setAchievements(data));
// //   //       fetchDietPlans(athlete.coachId).then((data) => setDietPlans(data));
// //   //       fetchWeightPlan(athlete.coachId).then((data) => setWeightPlan(data));
// //   //     }
// //   //   }, [athlete.coachId]);

// //   //   // Handle view coach details
// //   //   const handleViewCoach = (coach) => {
// //   //     setSelectedCoach(coach);
// //   //   };

// //   //   // Handle assistance request
// //   //   const handleRequestAssistance = (coach) => {
// //   //     setShowAssistanceForm(true);
// //   //   };

// //   //   // Handle creating an assistance request
// //   //   const handleCreateAssistanceRequest = async (coachId) => {
// //   //     try {
// //   //       const response = await fetch('/api/assistance/request', {
// //   //         method: 'POST',
// //   //         headers: { 'Content-Type': 'application/json' },
// //   //         body: JSON.stringify({ coachId, remark2 }),
// //   //       });
// //   //       if (response.ok) {
// //   //         setShowSuccessPopup2(true);
// //   //         setShowAssistanceForm(false);
// //   //       }
// //   //     } catch (error) {
// //   //       console.error('Error creating assistance request:', error);
// //   //     }
// //   //   };

// //   //   // Close modals
// //   //   const handleCloseModal2 = () => {
// //   //     setShowAssistanceForm(false);
// //   //     setShowSuccessPopup2(false);
// //   //   };

// //   //   // Handle success popup close
// //   //   const closeSuccessPopup2 = () => {
// //   //     setShowSuccessPopup2(false);
// //   //   };

// //   return (
// //     <div className="athlete-dashboard">

// //       <AppBar position="static" className="navbar">
// //                 <Toolbar className="navbar-content">
// //                     <Typography variant="h5" className="navbar-title">
// //                     Athletics
// //                     </Typography>
// //                     <Box className="navbar-actions">
// //                         <Link to="" className="logout-link" >
// //                             <Button className="logout-button" onClick={() => setCurrentSection('profile')}>
// //                             Profile
// //                             </Button>
// //                         </Link>
// //                         <Link to="" className="logout-link">
// //                             <Button className="logout-button" onClick={() => setCurrentSection('events')}>
// //                             Events
// //                             </Button>
// //                         </Link>
// //                         <Link to="" className="logout-link">
// //                             <Button className="logout-button"  onClick={() => setCurrentSection('myEvents')}>
// //                             My Events
// //                             </Button>
// //                         </Link>
// //                         <Link to="" className="logout-link">
// //                             <Button className="logout-button"  onClick={() => setCurrentSection('coach')}>
// //                             Coach
// //                             </Button>
// //                         </Link>
// //                         <Link to="/*" className="logout-link">
// //                             <Button 
// //                                 onClick={handleLogout} 
// //                                 startIcon={<LoginIcon />}
// //                                 className="logout-button"
// //                             >
// //                                 Logout
// //                             </Button>
// //                         </Link>
// //                     </Box>
// //                 </Toolbar>
// //             </AppBar>
// //         <h1></h1>


// //       <div className="content">
// //         {currentSection === 'profile' && (
// //         <>
// //            <div className="transition-container">
// //           <div className="centered-jump">
// //             <p></p>
// //             <h2> Profile</h2>
// //           </div>
// //           <div className="profile-section">
// //             {athlete && (
// //               <>

// //                 <img
// //                   // src={`${athlete.photoUrl || '/default-profile.jpg'}`}
// //                   src={athlete.photoBase64 ? `data:image/jpeg;base64,${athlete.photoBase64}` : '/default-profile.jpg'}
// //                   className="profile-photo"
// //                 />
// //                 <div className="athlete-info">
// //                   <p>Name: {athlete.firstName} {athlete.lastName}</p>
// //                   <p>Date of Birth: {athlete.birthDate ? athlete.birthDate.split('T')[0] : 'N/A'}
// //                   </p>
// //                   <p>Gender: {athlete.gender}</p>
// //                   <p>Height: {athlete.height}</p>
// //                   <p>Weight: {athlete.weight}</p>
// //                   <p>Category: {athlete.category}</p>
// //                   <p>Coach: {athlete.coach || "N/A"}</p>
// //                   <button onClick={handleEditProfile}>Edit Profile</button>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //           </div>
// //           <div className="top-performance-card" style={{ margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
// //   <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "24px" }}>Top 5 Performances</h2>
// //   {error ? (
// //     <div className="error-message" style={{ color: "red", textAlign: "center" }}>{error}</div>
// //   ) : topPerformances.length > 0 ? (
// //     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
// //       <thead>
// //         <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
// //           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Event Name</th>
// //           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Meet Name</th>
// //           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Score</th>
// //           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Comment</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {topPerformances.slice(0, 5).map((performance, index) => (
// //           <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
// //             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.eventName}</td>
// //             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.meetName}</td>
// //             <td style={{ padding: "10px", borderBottom: "1px solid #eee", textAlign: "center" }}>{performance.score}</td>
// //             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.comment}</td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   ) : (
// //     <p style={{ textAlign: "center", color: "#666" }}>No top performances found.</p>
// //   )}
// // </div>

// // <div style={dashboardStyles}>
// //       <div style={cardStyles}>
// //         <h2 style={headerStyles}>All Event Results</h2>
// //         {error ? (
// //           <div style={errorStyles}>{error}</div>
// //         ) : (
// //           <table style={tableStyles}>
// //             <thead>
// //               <tr style={headerRowStyles}>
// //                 <th>Event Name</th>
// //                 <th>Meet Name</th>
// //                 <th>Date</th>
// //                 <th>Score</th>
// //                 <th>Comment</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {eventResults.map((result, index) => (
// //                 <tr key={index} style={rowStyles}>
// //                   <td>{result.eventName}</td>
// //                   <td>{result.meetName}</td>
// //                   <td>{result.eventDate ? 
// //                     (() => {
// //                       const date = new Date(result.eventDate);
// //                       return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
// //                     })() 
// //                     : 'N/A'}</td>
// //                   <td>{result.score}</td>
// //                   <td>{result.comment}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //         {hasMore && !error && (
// //           <button onClick={loadMore} style={buttonStyles}>
// //             Load More
// //           </button>
// //         )}
// //         {!hasMore && !error && (
// //           <p style={noMoreStyles}>No more results to display.</p>
// //         )}
// //       </div>
// //       {/* Existing elements below */}
// //       <div>
// //         {/* Add other admin dashboard components here */}
// //       </div>
// //     </div>



// // </>
// //         )}

// //         {editingProfile && (
// //           <div className="modal">
// //             <div className="modal-content">
// //               <h2>Edit Profile</h2>
// //               <form onSubmit={(e) => e.preventDefault()}>
// //               <label>
// //     <input
// //       type="text"
// //       name="firstName"
// //       value={updatedProfile.firstName}
// //       onChange={handleProfileChange}
// //       placeholder=" " /* Placeholder for compatibility */
// //     />
// //     <span>First Name</span>
// //   </label>

// //   <label>
// //     <input
// //       type="text"
// //       name="lastName"
// //       value={updatedProfile.lastName}
// //       onChange={handleProfileChange}
// //       placeholder=" " 
// //     />
// //     <span>Last Name</span>
// //   </label>

// //   <label>
// //     <input
// //       type="date"
// //       name="birthDate"
// //       value={updatedProfile.birthDate}
// //       onChange={handleProfileChange}
// //       placeholder=" " 
// //     />
// //     <span>Date of Birth</span>
// //   </label>

// //   <label>
// //     <input
// //       type="text"
// //       name="gender"
// //       value={updatedProfile.gender}
// //       onChange={handleProfileChange}
// //       placeholder=" "
// //     />
// //     <span>Gender</span>
// //   </label>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="height"
// //                     value={updatedProfile.height}
// //                     onChange={handleProfileChange}
// //                     placeholder=" " 
// //                   />
// //                   <span>Height</span>
// //                 </label>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="weight"
// //                     value={updatedProfile.weight}
// //                     onChange={handleProfileChange}
// //                     placeholder=''
// //                   />
// //                   <span>Weight</span>
// //                 </label>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="category"
// //                     value={updatedProfile.category}
// //                     onChange={handleProfileChange}
// //                     placeholder=''
// //                   />
// //                   <span>Category</span>
// //                 </label>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="coach"
// //                     value={updatedProfile.coach}
// //                     onChange={handleProfileChange}
// //                     placeholder=''
// //                   />
// //                   <span>Coach</span>
// //                 </label>
// //                 <input
// //                   type="file"
// //                   name="image"
// //                   accept="image/*"
// //                   onChange={handleImageChange}
// //                   style={{
// //                     marginTop: "1rem",
// //                     padding: "10px",
// //                     border: "2px dashed gray",
// //                     borderRadius: "5px",
// //                     cursor: "pointer",
// //                     transition: "border-color 0.3s ease",
// //                   }}
// //                   onMouseEnter={(e) => (e.target.style.borderColor = "green")}
// //                   onMouseLeave={(e) => (e.target.style.borderColor = "gray")}
// //                 />
// //                <p></p>
// //                 <div className="modal-actions">
// //                   <button type="button" onClick={handleSaveProfile} className='btn2'>Save</button>
// //                   <button type="button" onClick={handleCloseModal} className='btn2'>Cancel</button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         )}

// // {currentSection === 'events' && (
// //    <div className="transition-container">
// //           <div className="events-section">
// //           <div className="centered-jump">
// //             <h2> Events</h2>
// //           </div>
// //             <div className="events-container">
// //               {events.map(event => (
// //                 <div key={event.id} className="event-card">
// //                   <img 
// //                   src={event.imageBase64 ? `data:image/jpeg;base64,${event.imageBase64}` : '/default-profile.jpg'}
// //                   alt={event.eventTitle} onClick={() => handleViewEvent(event)} />
// //                   <h3 style={{textAlign:'center'}}>{event.eventTitle}</h3>
// //                   <p>Meet: {event.meetId.meetName}</p>
// //                   <p>Category: {event.category}</p>
// //                     <button className="button-19" onClick={() => handleViewEvent(event)}>View</button>
// //                     <p></p>
// //                     <button className="button-19" onClick={() => handleOpenRegisterPopup(event)}>Register</button>
// //                   </div>
// //               ))}
// //             </div>
// //           </div>
// //           </div>
// //         )}

// // {selectedEvent && (
// //   <div className="modal">
// //     <div className="modal-content" style={{height:'90%'}}>
// //       <h2>{selectedEvent.eventTitle}</h2>
// //       <img src={selectedEvent.imageBase64 ? `data:image/jpeg;base64,${selectedEvent.imageBase64}` : '/default-profile.jpg'}
// //        alt={selectedEvent.eventTitle} onClick={() => handleViewEvent(selectedEvent)} width={'385px'} height={'200px'} style={
// //         {
// //           paddingLeft:"5%"
// //         }
// //        }/>
// //       <p>Meet: {selectedEvent.meetId.meetName}</p>
// //       <p>Category: {selectedEvent.category}</p>
// //       <p>Description: {selectedEvent.description}</p>
// //       <p>Location: {selectedEvent.location}</p>
// //       <p>Event Date: {selectedEvent.eventDate.split('T')[0]}</p>
// //       <textarea placeholder="Remarks (optional)" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
// //       <p></p>

// //       <button onClick={() => handleRegisterForEvent(selectedEvent.eventId)} style={{width:'210px',marginRight:'13px'}}>Register</button>
// //       <button onClick={handleCloseModal} style={{width:'210px'}}>Close</button>
// //     </div>
// //   </div>
// // )}

// // {registeringEvent && (
// //           <div className="modal" >
// //             <div className="modal-content" style={{width:'400px',height:'300px',textAlign:'center'}}>
// //               <h1>Register for {registeringEvent.eventTitle}</h1>
// //               <textarea placeholder="Add your remark" required value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
// //               <p></p>
// //               <button onClick={() => handleRegisterForEvent(registeringEvent.eventId)} style={{width:'150px',marginRight:'15px'}}>Submit</button>
// //               <button onClick={handleCloseModal} style={{width:'150px',marginRight:'15px'}}>Cancel</button>
// //             </div>
// //           </div>
// //         )}
// //         {showSuccessPopup && (
// //       <div className="modal">
// //         <div className="modal-content" style={{ textAlign: 'center' , height:'200px'}}>
// //           <h2>Registration Successful!</h2>
// //           <p>You have successfully registered for the event.</p>
// //           <button onClick={closeSuccessPopup} style={{ marginTop: '20px' }}>OK</button>
// //         </div>
// //       </div>
// //     )}

// // {currentSection === 'myEvents' && (

// //   <div className="transition-container">
// //   <div className="my-events-section">
// //    <div className="centered-jump">
// //   <h2>My Events</h2>
// // </div>


// //     <div className="tabs">
// //       {['Overview', 'Pending', 'Approved', 'Rejected'].map((tab) => (
// //         <button
// //           key={tab}
// //           className={selectedTab === tab ? 'active' : ''}
// //           onClick={() => setSelectedTab(tab)}
// //         >
// //           {tab}
// //         </button>
// //       ))}
// //     </div>
// //     <table>
// //       <thead>
// //         <tr>
// //           <th>Event Name</th>
// //           <th>Meet Name</th>
// //           <th>Registration Date</th>
// //           <th>Status</th>
// //           <th>Action</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filterMyEvents().map((regis) => (
// //           <tr key={regis.registrationId}>
// //             <td>{regis.eventName}</td>
// //             <td>{regis.meetName}</td>
// //             <td>{regis.registrationDate.split("T")[0]}</td>
// //             <td>{regis.status}</td>
// //             <td>
// //               <button className="button-19" onClick={() => handleViewEvent2(regis.eventId)}>View</button>
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   </div>
// //   </div>
// // )}

// // {selectedEvent2 && (
// //   <div 
// //     className="modal" 
// //     style={{
// //       position: "fixed",
// //       top: 0,
// //       left: 0,
// //       width: "100vw",
// //       height: "100vh",
// //       backgroundColor: "rgba(0, 0, 0, 0.5)",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       zIndex: 1000,
// //       padding: "20px",
// //       boxSizing: "border-box",
// //     }}
// //   >
// //     <div 
// //       className="modal-content"
// //       style={{
// //         backgroundColor: "white",
// //         borderRadius: "8px",
// //         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
// //         overflow: "hidden",
// //         maxWidth: "600px",
// //         width: "100%",
// //         height:"530px",
// //         textAlign: "center",
// //         transition: "transform 0.3s ease, box-shadow 0.3s ease",
// //       }}
// //       onMouseEnter={(e) => {
// //         e.currentTarget.style.transform = "scale(1.02)";
// //         e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.3)";
// //       }}
// //       onMouseLeave={(e) => {
// //         e.currentTarget.style.transform = "scale(1)";
// //         e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
// //       }}
// //     >
// //       <h2 style={{ margin: "10px 0", fontSize: "24px", fontWeight: "bold" }}>
// //           {selectedEvent2.eventTitle}
// //         </h2>
// //       {selectedEvent2.imageBase64 && (
// //         <img
// //           src={`data:image/jpeg;base64,${selectedEvent2.imageBase64}`}
// //           alt={selectedEvent2.eventTitle}
// //           style={{
// //             width: "100%",
// //             height: "200px",
// //             objectFit: "cover",
// //             borderTopLeftRadius: "8px",
// //             borderTopRightRadius: "8px",
// //           }}
// //         />
// //       )}
// //       <div 
// //         style={{
// //           padding: "20px",
// //           boxSizing: "border-box",
// //           borderRadius: "0 0 8px 8px",
// //           backgroundColor: "#f1eeee",
// //         }}
// //       >
// //         <p><b>Meet Name: </b>{selectedEvent2.meetName}</p>
// //         <p><b>Registration Date: </b>{selectedEvent2.category}</p>
// //         <p><b>Event Description: </b>{selectedEvent2.eventDescription}</p>
// //         <p><b>Event Date: </b>{selectedEvent2.eventDate.split("T")[0]}</p>
// //         <p><b>Location: </b>{selectedEvent2.location}</p>
// //         <button 
// //           onClick={handleCloseModal1} 
// //           style={{
// //             marginTop: "20px",
// //             padding: "10px 20px",
// //             backgroundColor: "#007BFF",
// //             color: "white",
// //             border: "none",
// //             borderRadius: "20px",
// //             cursor: "pointer",
// //             transition: "background-color 0.3s ease",
// //           }}
// //           onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
// //           onMouseLeave={(e) => e.target.style.backgroundColor = "#007BFF"}
// //         >
// //           Close
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // )}



// // {currentSection === 'coach' && (
// //   <div className="transition-container">
// //   <div className="events-section">
// //   <div className="centered-jump">
// //     <h2> Coaches</h2>
// //   </div>
// //     <div className="events-container">



// //     </div>
// //   </div>
// //   </div>
// // )}
// //       </div>
// //     </div>
// //   );

// // }

// // // Inline styles
// // const dashboardStyles = {
// //   padding: "20px",
// //   backgroundColor: "#f0f4f8",
// // };

// // const cardStyles = {
// //   padding: "20px",
// //   border: "1px solid #ccc",
// //   borderRadius: "8px",
// //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
// //   marginBottom: "20px",
// //   backgroundColor: "#fff",
// // };

// // const headerStyles = {
// //   textAlign: "center",
// //   marginBottom: "20px",
// //   color: "#333",
// // };

// // const tableStyles = {
// //   width: "100%",
// //   borderCollapse: "collapse",
// //   marginBottom: "20px",
// // };

// // const headerRowStyles = {
// //   backgroundColor: "#007BFF",
// //   color: "white",
// //   textAlign: "left",
// // };

// // const rowStyles = {
// //   borderBottom: "1px solid #ccc",
// // };

// // const buttonStyles = {
// //   display: "block",
// //   margin: "10px auto",
// //   padding: "10px 20px",
// //   backgroundColor: "#007BFF",
// //   color: "white",
// //   border: "none",
// //   borderRadius: "4px",
// //   cursor: "pointer",
// // };

// // const noMoreStyles = {
// //   textAlign: "center",
// //   color: "#777",
// // };

// // const errorStyles = {
// //   textAlign: "center",
// //   color: "red",
// //   fontWeight: "bold",
// // };


// // export default AthleteDashboard;


// import React, { useState, useEffect} from 'react';
// import { Box, Button ,Typography, AppBar, Toolbar, Dialog} from "@mui/material";
// import { useNavigate ,Link} from 'react-router-dom';
// import { format, parseISO} from 'date-fns';
// import LoginIcon from "@mui/icons-material/Login";

// import axios from "axios";
// import '../styles/athlete.css';

// function AthleteDashboard() {
//   const navigate = useNavigate();
//   const [athlete, setAthlete] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [coaches, setCoaches] = useState([]);
//   const [myEvents, setMyEvents] = useState([]);
//   const [assistanceRequests, setAssistanceRequests] = useState([]);


//   const [remarks, setRemarks] = useState({});

//   const [currentSection, setCurrentSection] = useState('profile');
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [newImage, setNewImage] = useState(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   //const [selectedTab, setSelectedTab] = useState('Overview');
//   const [remark, setRemark] = useState('');
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [registeringEvent, setRegisteringEvent] = useState(null);
//   const [selectedEvent2, setSelectedEvent2] = useState(null);
//   const [selectedTab, setSelectedTab] = useState('Registered');
// const [selectedSubTab, setSelectedSubTab] = useState('Overview');

// const [assistanceDetails, setAssistanceDetails] = useState({
//   status: null,
//   coachId: null,
//   coach: null,
//   requestPending: false,
// });


//   const [updatedProfile, setUpdatedProfile] = useState({
//     firstName: '',
//     lastName: '',
//     birthDate: '',
//     gender: '',
//     height: '',
//     weight: '',
//     category: '',
//     coach: '',
//   });
//   const [topPerformances, setTopPerformances] = useState([]); // Top performances state (list)
//   const [error, setError] = useState(""); // Error handling state

//   // Fetch athlete details (example endpoint)
//   // useEffect(() => {
//   //   const fetchAthleteDetails = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       const response = await axios.get("/athlete/top-performance", {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       setAthlete(response.data);
//   //     } catch (err) {
//   //       console.error("Failed to fetch athlete details:", err);
//   //     }
//   //   };

//   //   fetchAthleteDetails();
//   // }, []);

//   // Fetch top performances
//   useEffect(() => {
//     const fetchTopPerformances = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("/athlete/top-performance", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTopPerformances(response.data); // Expecting an array
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch top performances");
//       }
//     };

//     fetchTopPerformances();
//   }, []);


//   const filterCompletedEvents = (resultStatus) => {
//     const today = new Date();
//     return events.filter((event) => {
//       const eventDate = new Date(event.eventDate);
//       return (
//         eventDate < today &&
//         (resultStatus === 'Result Pending'
//           ? event.resultStatus === 'Pending'
//           : event.resultStatus === 'Published')
//       );
//     });
//   };


//   const [showDialog, setShowDialog] = useState(false);
// const [selectedCoachId, setSelectedCoachId] = useState(null);

//   const [eventResults, setEventResults] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const resultsPerPage = 5;

//   useEffect(() => {
//     const fetchEventResults = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("/athlete/all-results", {
//           params: { page, size: resultsPerPage },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data.length < resultsPerPage) {
//           setHasMore(false);
//         }

//         setEventResults((prevResults) => [...prevResults, ...response.data]);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch event results");
//       }
//     };

//     fetchEventResults();
//   }, [page]);

//   const loadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };



//   useEffect(() => {
//     loadAthleteProfile();
//     fetchAssistanceStatus();
//     loadAllEvents();
//     loadMyEvents();
//     loadAllCoaches();
//     fetchCoaches();

//   }, []);

//   const loadAllCoaches = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/athlete/getallcoaches', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       console.log(data);
//       setCoaches(data);
//     } catch (error) {
//       console.error("Error loading events:", error);
//     }
//   };



//   const fetchCoaches = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch('coach/getallcoaches',{
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//        // Replace with your actual API endpoint
//       if (response.ok) {
//         const data = await response.json();
//         setCoaches(data);
//       } else {
//         console.error('Failed to fetch coaches');
//       }

//     } catch (error) {
//       console.error('Error fetching coaches:', error);
//     }
//   };





//   const openDialogBox = (coachId) => {
//     setSelectedCoachId(coachId);
//     setShowDialog(true);
//   };

//   const closeDialogBox = () => {
//     setShowDialog(false);
//     setSelectedCoachId(null);
//   };




// const fetchAssistanceStatus = async () => {
//   try {
//     const token = localStorage.getItem("token"); // Retrieve token from localStorage

//     const response = await fetch(`/athlete/getassistancereq`, {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`, // Add Authorization header
//         //"Content-Type": "application/json",  Ensure proper Content-Type
//       },
//     });

//     if (response.ok) {
//       const data = await response.json(); // Parse the JSON response
//       setAssistanceDetails(data);
//     } else {
//       console.error('Failed to fetch assistance request details');
//     }
//   } catch (error) {
//     console.error('Error fetching assistance request details:', error);
//   }
// };



//   const loadAthleteProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/athlete/profile', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json" 
//         }
//       });
//       const data = await response.json();
//       const parsedDate = parseISO(data.birthDate); // Parsing the date string to Date object
//       const formattedDate = (parsedDate.getMonth() + 1).toString().padStart(2, '0') + '/' + 
//       parsedDate.getDate().toString().padStart(2, '0') + '/' + 
//       parsedDate.getFullYear();
//       setAthlete(data);
//       setUpdatedProfile({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         birthDate: data.birthDate,
//         gender: data.gender,
//         height: data.height,
//         weight: data.weight,
//         category: data.category,
//         coach: data.coach,
//       });
//     } catch (error) {
//       console.error("Error loading athlete profile:", error);
//     }
//   };


//   const handleRemarksChange = (e, coachId) => {
//     const newRemarks = { ...remarks };
//     newRemarks[coachId] = e.target.value;
//     setRemarks(newRemarks);
//   };


//   const handleRequestAssistance = async (coachId) => {
//     try {
//       const token = localStorage.getItem('token');

//     const formData = new FormData();
//     formData.append('coachId', coachId);
//     formData.append('remarks', remarks[coachId] || '');  

//       const response = await fetch(`/athlete/createassistancereq`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,  
//         },
//         body: formData, 
//       });
//      if (response.ok) {
//         alert('Assistance request sent successfully!');
//         await fetchAssistanceStatus();
//         loadAthleteProfile();
//       } else {
//         const errorData = await response.json();
//         console.error('Error requesting assistance:', errorData.message);
//         alert('Failed to send assistance request. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error requesting assistance:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };


//   const loadAllEvents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('athlete/events', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       console.log(data);
//       console.log(data.eventId);
//       setEvents(data);
//     } catch (error) {
//       console.error("Error loading events:", error);
//     }
//   };

//   const loadMyEvents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/athlete/events/registered', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       setMyEvents(data);
//     } catch (error) {
//       console.error("Error loading my events:", error);
//     }
//   };

//   const handleViewEvent2 = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`/athlete/events/${eventId}`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       setSelectedEvent2(data);
//     } catch (error) {
//       console.error("Error loading my events:", error);
//     }

//   };

//   const closeSuccessPopup = () => {
//     setShowSuccessPopup(false);
//   };

//   const handleLogout = () => {
//     navigate('/*'); // Redirect to login page
//   };

//   const handleEditProfile = () => {
//     setEditingProfile(true);
//   };
//   const handleOpenRegisterPopup = (event) => setRegisteringEvent(event);

//   const handleViewEvent = (event) => setSelectedEvent(event);


//   const handleCloseModal = () => {
//     setEditingProfile(false); // Close the modal
//     setSelectedEvent(null);   // Reset the selected event state
//     setRegisteringEvent(null); // Reset the registering event state
//     setRemark(''); 
//   };
//   const handleCloseModal1 = () => {
//     setSelectedEvent2(null); 
//   };

//   const handleImageChange = (e) => {
//     setNewImage(e.target.files[0]); // Store the uploaded image
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;

//     setUpdatedProfile({
//       ...updatedProfile,
//       [name]: value,
//     });
//   };

//   const handleSaveProfile = async () => {
//     const formData = new FormData();
//     formData.append('firstName', updatedProfile.firstName);
//     formData.append('lastName', updatedProfile.lastName);
//     formData.append('birthDate', updatedProfile.birthDate);
//     formData.append('gender', updatedProfile.gender);
//     formData.append('height', updatedProfile.height);
//     formData.append('weight', updatedProfile.weight);
//     formData.append('category', updatedProfile.category);
//     formData.append('coach', updatedProfile.coach);
//     if (newImage) formData.append('photoUrl', newImage);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/athlete/createProfile', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });

//       if (response.ok) {
//         setEditingProfile(false);
//         <p>Updated</p>
//         loadAthleteProfile(); // Reload the profile data
//       } else {
//         console.error('Error saving profile:', response);
//       }
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     }
//   };

//   const handleRegisterForEvent = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`/athlete/registerForEvent/${eventId}`, {
//         method: 'POST',
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           remarks: remark
//         })
//       });

//       if (response.ok) {
//         loadAllEvents();
//         loadMyEvents(); // Reload my events after registering
//         setShowSuccessPopup(true); 
//         handleCloseModal();
//       } else {
//         console.log(`${eventId}`);
//         console.error('Error registering for event:', response);
//       }
//     } catch (error) {
//       console.error('Error registering for event:', error);
//     }
//   };


//   const filterMyEvents = () => {
//     switch (selectedSubTab) {
//       case 'Pending':
//         return myEvents.filter(event => event.status === 'Pending');
//       case 'Approved':
//         return myEvents.filter(event => event.status === 'Approved');
//       case 'Rejected':
//         return myEvents.filter(event => event.status === 'Rejected');
//       default:
//         return myEvents;
//     }
//   };

//   // const TopPerformance = () => {
//   //   const [topPerformance, setTopPerformance] = useState(null);
//   //   const [error, setError] = useState("");

//   //   useEffect(() => {
//   //     const fetchTopPerformance = async () => {
//   //       try {
//   //         const token = localStorage.getItem("token");
//   //         // Replace with your API endpoint to fetch top performance of the logged-in athlete
//   //         const response = await axios.get("athlete/top-performance", {
//   //           method: 'POST',
//   //           headers: {
//   //             "Authorization": `Bearer ${token}`,
//   //             "Content-Type": "application/json"
//   //           }});
//   //         setTopPerformance(response.data);
//   //       } catch (err) {
//   //         setError(err.response?.data?.error || "Failed to fetch top performance");
//   //       }
//   //     };

//   //     fetchTopPerformance();
//   //   }, []);

//   //   if (error) {
//   //     return <div className="error-message">{error}</div>;
//   //   }
//   // };


//   const [selectedSubTab2, setSelectedSubTab2] = useState('Result Pending');
//   const [events2, setEvents2] = useState([]);
//   const [selectedEvent3, setSelectedEvent3] = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [athleteResult, setAthleteResult] = useState(null);

//   // Fetch events based on selected tab
//   useEffect(() => {
//     const fetchEvents2 = async () => {
//       const token = localStorage.getItem("token");
//       const endpoint =
//         selectedSubTab2 === 'Result Pending'
//           ? `athlete/events/no-results`
//           : `athlete/events/with-results`;
//       try {
//       const response = await fetch(endpoint,{
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//         setEvents2(data || []); // Fallback to an empty array if API returns null
//       } catch (error) {
//         console.error('Error fetching events:', error);
//         setEvents2([]); // Handle error gracefully by setting events to empty
//       }
//     };

//     fetchEvents2();
//   }, [selectedSubTab2]);

//   // Handle viewing an event
//   const handleViewEvent3 = async (eventId) => {

//     const token = localStorage.getItem("token");
//     const response = await fetch(`athlete/events/${eventId}`,{
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//       }
//     });
//     const data = await response.json();
//     setSelectedEvent3(data); // Set the selected event details

//   try{

//      const athleteResultResponse = await fetch(
//         `athlete/results/event/${eventId}`,{
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//       }
//     }
//       );
//       const resultData = await athleteResultResponse.json();
//       setAthleteResult(resultData);

//       // Fetch leaderboard for the event
//       const leaderboardResponse = await fetch(`athlete/event/leaderboard/${eventId}`,{
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const leaderboardData = await leaderboardResponse.json();
//       setLeaderboard(leaderboardData);
//     } catch (error) {
//       console.error('Error fetching event details:', error);
//       // setSelectedEvent3(null);
//       setAthleteResult(null);
//       setLeaderboard([]);
//     }


//   }



//   const currentRequest = assistanceRequests.find(
//     (req) => req.athleteId === athlete.athleteId
//   );




//   const isRequestAcceptedOrPending = currentRequest && (
//     currentRequest.status === 'Pending' || currentRequest.status === 'Accepted'
//   );



//   return (
//     <div className="athlete-dashboard">

//       <AppBar position="static" className="navbar">
//                 <Toolbar className="navbar-content">
//                     <Typography variant="h5" className="navbar-title">
//                     Athletics
//                     </Typography>
//                     <Box className="navbar-actions">
//                         <Link to="" className="logout-link" >
//                             <Button className="logout-button" onClick={() => setCurrentSection('profile')}>
//                             Profile
//                             </Button>
//                         </Link>
//                         <Link to="" className="logout-link">
//                             <Button className="logout-button" onClick={() => setCurrentSection('events')}>
//                             Events
//                             </Button>
//                         </Link>
//                         <Link to="" className="logout-link">
//                             <Button className="logout-button"  onClick={() => setCurrentSection('myEvents')}>
//                             My Events
//                             </Button>
//                         </Link>
//                         <Link to="" className="logout-link">
//                             <Button className="logout-button"  onClick={() => setCurrentSection('coach')}>
//                             Coach
//                             </Button>
//                         </Link>
//                         <Link to="/*" className="logout-link">
//                             <Button 
//                                 onClick={handleLogout} 
//                                 startIcon={<LoginIcon />}
//                                 className="logout-button"
//                             >
//                                 Logout
//                             </Button>
//                         </Link>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//         <h1></h1>


//       <div className="content">
//         {currentSection === 'profile' && (
//         <>
//            <div className="transition-container">
//           <div className="centered-jump">
//             <p></p>
//             <h2> Profile</h2>
//           </div>
//           <div className="profile-section">
//             {athlete && (
//               <>

//                 <img
//                   // src={`${athlete.photoUrl || '/default-profile.jpg'}`}
//                   src={athlete.photoBase64 ? `data:image/jpeg;base64,${athlete.photoBase64}` : '/default-profile.jpg'}
//                   className="profile-photo"
//                 />
//                 <div className="athlete-info">
//                   <p>Name: {athlete.firstName} {athlete.lastName}</p>
//                   <p>Date of Birth: {athlete.birthDate ? athlete.birthDate.split('T')[0] : 'N/A'}
//                   </p>
//                   <p>Gender: {athlete.gender}</p>
//                   <p>Height: {athlete.height}</p>
//                   <p>Weight: {athlete.weight}</p>
//                   <p>Category: {athlete.category}</p>
//                   <p>Coach: {athlete.coach || "N/A"}</p>
//                   <button onClick={handleEditProfile}>Edit Profile</button>
//                 </div>
//               </>
//             )}
//           </div>
//           </div>
//           <div className="top-performance-card" style={{ margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//   <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "24px" }}>Top 5 Performances</h2>
//   {error ? (
//     <div className="error-message" style={{ color: "red", textAlign: "center" }}>{error}</div>
//   ) : topPerformances.length > 0 ? (
//     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
//       <thead>
//         <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Event Name</th>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Meet Name</th>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Score</th>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Comment</th>
//         </tr>
//       </thead>
//       <tbody>
//         {topPerformances.slice(0, 5).map((performance, index) => (
//           <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.eventName}</td>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.meetName}</td>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee", textAlign: "center" }}>{performance.score}</td>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.comment}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   ) : (
//     <p style={{ textAlign: "center", color: "#666" }}>No top performances found.</p>
//   )}
// </div>

// <div style={dashboardStyles}>
//       <div style={cardStyles}>
//         <h2 style={headerStyles}>All Event Results</h2>
//         {error ? (
//           <div style={errorStyles}>{error}</div>
//         ) : (
//           <table style={tableStyles}>
//             <thead>
//               <tr style={headerRowStyles}>
//                 <th>Event Name</th>
//                 <th>Meet Name</th>
//                 <th>Date</th>
//                 <th>Score</th>
//                 <th>Comment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {eventResults.map((result, index) => (
//                 <tr key={index} style={rowStyles}>
//                   <td>{result.eventName}</td>
//                   <td>{result.meetName}</td>
//                   <td>{result.eventDate ? 
//                     (() => {
//                       const date = new Date(result.eventDate);
//                       return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
//                     })() 
//                     : 'N/A'}</td>
//                   <td>{result.score}</td>
//                   <td>{result.comment}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {hasMore && !error && (
//           <button onClick={loadMore} style={buttonStyles}>
//             Load More
//           </button>
//         )}
//         {!hasMore && !error && (
//           <p style={noMoreStyles}>No more results to display.</p>
//         )}
//       </div>
//       {/* Existing elements below */}
//       <div>
//         {/* Add other admin dashboard components here */}
//       </div>
//     </div>



// </>
//         )}

//         {editingProfile && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Edit Profile</h2>
//               <form onSubmit={(e) => e.preventDefault()}>
//               <label>
//     <input
//       type="text"
//       name="firstName"
//       value={updatedProfile.firstName}
//       onChange={handleProfileChange}
//       placeholder=" " /* Placeholder for compatibility */
//     />
//     <span>First Name</span>
//   </label>

//   <label>
//     <input
//       type="text"
//       name="lastName"
//       value={updatedProfile.lastName}
//       onChange={handleProfileChange}
//       placeholder=" " 
//     />
//     <span>Last Name</span>
//   </label>

//   <label>
//     <input
//       type="date"
//       name="birthDate"
//       value={updatedProfile.birthDate}
//       onChange={handleProfileChange}
//       placeholder=" " 
//     />
//     <span>Date of Birth</span>
//   </label>

//   <label>
//     <input
//       type="text"
//       name="gender"
//       value={updatedProfile.gender}
//       onChange={handleProfileChange}
//       placeholder=" "
//     />
//     <span>Gender</span>
//   </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="height"
//                     value={updatedProfile.height}
//                     onChange={handleProfileChange}
//                     placeholder=" " 
//                   />
//                   <span>Height</span>
//                 </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="weight"
//                     value={updatedProfile.weight}
//                     onChange={handleProfileChange}
//                     placeholder=''
//                   />
//                   <span>Weight</span>
//                 </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="category"
//                     value={updatedProfile.category}
//                     onChange={handleProfileChange}
//                     placeholder=''
//                   />
//                   <span>Category</span>
//                 </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="coach"
//                     value={updatedProfile.coach}
//                     onChange={handleProfileChange}
//                     placeholder=''
//                   />
//                   <span>Coach</span>
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   style={{
//                     marginTop: "1rem",
//                     padding: "10px",
//                     border: "2px dashed gray",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onMouseEnter={(e) => (e.target.style.borderColor = "green")}
//                   onMouseLeave={(e) => (e.target.style.borderColor = "gray")}
//                 />
//                <p></p>
//                 <div className="modal-actions">
//                   <button type="button" onClick={handleSaveProfile} className='btn2'>Save</button>
//                   <button type="button" onClick={handleCloseModal} className='btn2'>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

// {currentSection === 'events' && (
//    <div className="transition-container">
//           <div className="events-section">
//           <div className="centered-jump">
//             <h2> Events</h2>
//           </div>
//             <div className="events-container">
//               {events.map(event => (
//                 <div key={event.eventId} className="event-card">
//                   <img 
//                   src={event.imageBase64 ? `data:image/jpeg;base64,${event.imageBase64}` : '/default-profile.jpg'}
//                   alt={event.eventTitle} onClick={() => handleViewEvent(event)} />
//                   <h3 style={{textAlign:'center'}}>{event.eventTitle}</h3>
//                   <p>Meet: {event.meetId.meetName}</p>
//                   <p>Category: {event.category}</p>
//                     <button className="button-19" onClick={() => handleViewEvent(event)}>View</button>
//                     <p></p>
//                     <button className="button-19" onClick={() => handleOpenRegisterPopup(event)}>Register</button>
//                   </div>
//               ))}
//             </div>
//           </div>
//           </div>
//         )}

// {selectedEvent && (
//   <div className="modal">
//     <div className="modal-content" style={{height:'90%'}}>
//       <h2>{selectedEvent.eventTitle}</h2>
//       <img src={selectedEvent.imageBase64 ? `data:image/jpeg;base64,${selectedEvent.imageBase64}` : '/default-profile.jpg'}
//        alt={selectedEvent.eventTitle} onClick={() => handleViewEvent(selectedEvent)} width={'385px'} height={'200px'} style={
//         {
//           paddingLeft:"5%"
//         }
//        }/>
//       <p>Meet: {selectedEvent.meetId.meetName}</p>
//       <p>Category: {selectedEvent.category}</p>
//       <p>Description: {selectedEvent.description}</p>
//       <p>Location: {selectedEvent.location}</p>
//       <p>Event Date: {selectedEvent.eventDate.split('T')[0]}</p>
//       <textarea placeholder="Remarks (optional)" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
//       <p></p>

//       <button onClick={() => handleRegisterForEvent(selectedEvent.eventId)} style={{width:'210px',marginRight:'13px'}}>Register</button>
//       <button onClick={handleCloseModal} style={{width:'210px'}}>Close</button>
//     </div>
//   </div>
// )}

// {registeringEvent && (
//           <div className="modal" >
//             <div className="modal-content" style={{width:'400px',height:'300px',textAlign:'center'}}>
//               <h1>Register for {registeringEvent.eventTitle}</h1>
//               <textarea placeholder="Add your remark" required value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
//               <p></p>
//               <button onClick={() => handleRegisterForEvent(registeringEvent.eventId)} style={{width:'150px',marginRight:'15px'}}>Submit</button>
//               <button onClick={handleCloseModal} style={{width:'150px',marginRight:'15px'}}>Cancel</button>
//             </div>
//           </div>
//         )}
//         {showSuccessPopup && (
//       <div className="modal">
//         <div className="modal-content" style={{ textAlign: 'center' , height:'200px'}}>
//           <h2>Registration Successful!</h2>
//           <p>You have successfully registered for the event.</p>
//           <button onClick={closeSuccessPopup} style={{ marginTop: '20px' }}>OK</button>
//         </div>
//       </div>
//     )}
// {/*
// {currentSection === 'myEvents' && (

//   <div className="transition-container">
//   <div className="my-events-section">
//    <div className="centered-jump">
//   <h2>My Events</h2>
// </div>


//     <div className="tabs">
//       {['Overview', 'Pending', 'Approved', 'Rejected'].map((tab) => (
//         <button
//           key={tab}
//           className={selectedTab === tab ? 'active' : ''}
//           onClick={() => setSelectedTab(tab)}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//     <table>
//       <thead>
//         <tr>
//           <th>Event Name</th>
//           <th>Meet Name</th>
//           <th>Registration Date</th>
//           <th>Status</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filterMyEvents().map((regis) => (
//           <tr key={regis.registrationId}>
//             <td>{regis.eventName}</td>
//             <td>{regis.meetName}</td>
//             <td>{regis.registrationDate.split("T")[0]}</td>
//             <td>{regis.status}</td>
//             <td>
//               <button className="button-19" onClick={() => handleViewEvent2(regis.eventId)}>View</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   </div>
// )}

// {selectedEvent2 && (
//   <div 
//     className="modal" 
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//       padding: "20px",
//       boxSizing: "border-box",
//     }}
//   >
//     <div 
//       className="modal-content"
//       style={{
//         backgroundColor: "white",
//         borderRadius: "8px",
//         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//         overflow: "hidden",
//         maxWidth: "600px",
//         width: "100%",
//         height:"530px",
//         textAlign: "center",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "scale(1.02)";
//         e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.3)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "scale(1)";
//         e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
//       }}
//     >
//       <h2 style={{ margin: "10px 0", fontSize: "24px", fontWeight: "bold" }}>
//           {selectedEvent2.eventTitle}
//         </h2>
//       {selectedEvent2.imageBase64 && (
//         <img
//           src={`data:image/jpeg;base64,${selectedEvent2.imageBase64}`}
//           alt={selectedEvent2.eventTitle}
//           style={{
//             width: "100%",
//             height: "200px",
//             objectFit: "cover",
//             borderTopLeftRadius: "8px",
//             borderTopRightRadius: "8px",
//           }}
//         />
//       )}
//       <div 
//         style={{
//           padding: "20px",
//           boxSizing: "border-box",
//           borderRadius: "0 0 8px 8px",
//           backgroundColor: "#f1eeee",
//         }}
//       >
//         <p><b>Meet Name: </b>{selectedEvent2.meetName}</p>
//         <p><b>Registration Date: </b>{selectedEvent2.category}</p>
//         <p><b>Event Description: </b>{selectedEvent2.eventDescription}</p>
//         <p><b>Event Date: </b>{selectedEvent2.eventDate.split("T")[0]}</p>
//         <p><b>Location: </b>{selectedEvent2.location}</p>
//         <button 
//           onClick={handleCloseModal1} 
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             backgroundColor: "#007BFF",
//             color: "white",
//             border: "none",
//             borderRadius: "20px",
//             cursor: "pointer",
//             transition: "background-color 0.3s ease",
//           }}
//           onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
//           onMouseLeave={(e) => e.target.style.backgroundColor = "#007BFF"}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}


// */}


// {currentSection === 'myEvents' && (
//     <div className="transition-container">
//   <div className="my-events-section">
//     <div className="centered-jump">
//       <h2>My Events</h2>
//     </div>

//     {/* Add the new buttons */}
//     <div className="event-buttons">
//       <button
//         className={selectedTab === 'Registered' ? 'active' : ''}
//         onClick={() => setSelectedTab('Registered')}
//       >
//         REGISTERED EVENTS
//       </button>
//       <button
//         className={selectedTab === 'Completed' ? 'active' : ''}
//         onClick={() => setSelectedTab('Completed')}
//       >
//         COMPLETED EVENTS
//       </button>
//     </div>

//     {/* Registered Events Section */}
//     {selectedTab === 'Registered' && (
//       <div>
//         <div className="tabs">
//           {['Overview', 'Pending', 'Approved', 'Rejected'].map((tab) => (
//             <button
//               key={tab}
//               className={selectedSubTab === tab ? 'active' : ''}
//               onClick={() => setSelectedSubTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>Event Name</th>
//               <th>Meet Name</th>
//               <th>Registration Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filterMyEvents(selectedSubTab).map((regis) => (
//               <tr key={regis.registrationId}>
//                 <td>{regis.eventName}</td>
//                 <td>{regis.meetName}</td>
//                 <td>{regis.registrationDate}</td>
//                 <td>{regis.status}</td>
//                 <td>
//                   <button
//                     className="button-19"
//                     onClick={() => handleViewEvent2(regis.eventId)}
//                   >
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}

//     {/* Completed Events Section */}
//     {selectedTab === 'Completed' && (
//       <div>
//         <div classname = "tabs">
//       {['Result Pending', 'Result Published'].map((tab) => (
//         <button
//           key={tab}
//           className={selectedSubTab2 === tab ? 'active' : ''}
//           onClick={() => setSelectedSubTab2(tab)}
//         >
//           {tab}
//         </button>
//       ))}
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Event Name</th>
//             <th>Meet Name</th>
//             <th>Event Date</th>
//             <th>Result Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events2 && (events2.map((event) => (
//             <tr key={event.eventId}>
//               <td>{event.eventTitle}</td>
//               <td>{event.meetName}</td>
//               <td>{new Date(event.eventDate).toLocaleDateString()}</td>
//               <td>
//                 {selectedSubTab2 === 'Result Pending' ? 'Pending' : 'Published'}
//               </td>
//               <td>
//                 <button
//                   className="button-19"
//                   onClick={() => handleViewEvent3(event.eventId)}
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           )))}
//         </tbody>
//       </table>
//       {selectedEvent3 && (
//         <div className="modal-content"
//         >
//           <h2>{selectedEvent3.eventTitle}</h2>
//           <img
//             src={`data:image/png;base64,${selectedEvent3.imageBase64}`}
//             alt={selectedEvent3.eventTitle}
//           />
//           <p>Meet Name: {selectedEvent3.meetName}</p>
//           <p>Event Date: {new Date(selectedEvent3.eventDate).toLocaleDateString()}</p>
//           <p>Event Description: {selectedEvent3.eventDescription}</p>
//           <p>Event Category: {selectedEvent3.category}</p>
//           <p>Event Location: {selectedEvent3.location}</p>

// {/* Athlete Result */}
// {selectedSubTab2 === 'Result Published'  && athleteResult && athleteResult.comment && leaderboard && (
//             <div>
//               <h3>Your Result</h3>
//               <table>
//   <thead>
//     <tr>
//       <th>Rank</th>
//       <th>Score</th>
//       <th>Comment</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       {/* Rank: Find the index of the logged-in athlete and add 1 to it */}
//       <td>
//         {leaderboard.findIndex(entry => entry.athleteName === athleteResult.athleteName) + 1}
//       </td>
//       <td>{athleteResult.score}</td>
//       <td>{athleteResult.comment}</td>
//     </tr>
//   </tbody>
// </table>

//               {/* <p>Score: {athleteResult.score}</p>
//               <p>Comment: {athleteResult.comment}</p> */}
//             </div>
//           )}

//           {/* Leaderboard */}
//           {leaderboard && (
//             <div>
//             <h3>Leaderboard</h3>
//             <table>
//   <thead>
//     <tr>
//       <th>Rank</th>
//       <th>Athlete Name</th>
//       <th>Score</th>
//       <th>Comment</th>
//     </tr>
//   </thead>
//   <tbody>
//     {leaderboard.length > 0 ? (
//       leaderboard.map((entry, index) => (
//         <tr key={index}>
//           <td>{index + 1}</td> {/* Rank is just the index + 1 */}
//           <td>{entry.athleteName}</td>
//           <td>{entry.score}</td>
//           <td>{entry.comment}</td> {/* Assuming 'comment' is part of the entry */}
//         </tr>
//       ))
//     ) : (
//       <tr>
//         <td colSpan="4">No leaderboard data available.</td>
//       </tr>
//     )}
//   </tbody>
// </table>
//           </div>
//           )}

//         </div>


//     //       { && selectedEvent3.result  && (
//     //         <div>
//     //           <h3>Your Result</h3>
//     //           <p>Score: {selectedEvent3.result?.score}</p>
//     //           <p>Comment: {selectedEvent3.result?.comment}</p>

//     //           <h3>Leaderboard</h3>
//     //           <ul>
//     //             {selectedEvent3.leaderboard.map((entry, index) => (
//     //               <li key={index}>
//     //                 {entry.athleteName}: {entry.score}
//     //               </li>
//     //             ))}
//     //           </ul>
//     //         </div>
//     //       )}
//     //     </div>
//       )}
//     </div>
//     )}
//     </div>
//   </div>
// )}

// {/* Modal for Viewing Event Details 
// {selectedEvent2 && (
//   <div className="modal">
//     <div className="modal-content">
//       <h2>{selectedEvent2.eventTitle}</h2>
//       {selectedEvent2.imageBase64 && (
//         <img
//           src={`data:image/jpeg;base64,${selectedEvent2.imageBase64}`}
//           alt={selectedEvent2.eventTitle}
//           style={{ width: '100%', height: '200px', marginBottom: '20px' }}
//         />
//       )}
//       <p>
//         <b>Registration Date: </b>
//         {selectedEvent2.category}
//       </p>
//       <p>
//         <b>Event Description: </b>
//         {selectedEvent2.eventDescription}
//       </p>
//       <p>
//         <b>Event Date: </b>
//         {selectedEvent2.eventDate}
//       </p>
//       <p>
//         <b>Location: </b>
//         {selectedEvent2.location}
//       </p>
//       <button
//         onClick={handleCloseModal1}
//         style={{ marginLeft: '30%', marginTop: '20px', width: '155px' }}
//       >
//         Close
//       </button>
//     </div>
//   </div>
// )}
//   */}

// {selectedEvent2 && (
//   <div 
//     className="modal" 
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//       padding: "20px",
//       boxSizing: "border-box",
//     }}
//   >
//     <div 
//       className="modal-content"
//       style={{
//         backgroundColor: "white",
//         borderRadius: "8px",
//         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//         overflow: "hidden",
//         maxWidth: "600px",
//         width: "100%",
//         height:"530px",
//         textAlign: "center",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "scale(1.02)";
//         e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.3)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "scale(1)";
//         e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
//       }}
//     >
//       <h2 style={{ margin: "10px 0", fontSize: "24px", fontWeight: "bold" }}>
//           {selectedEvent2.eventTitle}
//         </h2>
//       {selectedEvent2.imageBase64 && (
//         <img
//           src={`data:image/jpeg;base64,${selectedEvent2.imageBase64}`}
//           alt={selectedEvent2.eventTitle}
//           style={{
//             width: "100%",
//             height: "200px",
//             objectFit: "cover",
//             borderTopLeftRadius: "8px",
//             borderTopRightRadius: "8px",
//           }}
//         />
//       )}
//       <div 
//         style={{
//           padding: "20px",
//           boxSizing: "border-box",
//           borderRadius: "0 0 8px 8px",
//           backgroundColor: "#f1eeee",
//         }}
//       >
//         <p><b>Meet Name: </b>{selectedEvent2.meetName}</p>
//         <p><b>Category: </b>{selectedEvent2.category}</p>
//         <p><b>Event Description: </b>{selectedEvent2.eventDescription}</p>
//         <p><b>Event Date: </b>{selectedEvent2.eventDate.split("T")[0]}</p>
//         <p><b>Location: </b>{selectedEvent2.location}</p>
//         <button 
//           onClick={handleCloseModal1} 
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             backgroundColor: "#007BFF",
//             color: "white",
//             border: "none",
//             borderRadius: "20px",
//             cursor: "pointer",
//             transition: "background-color 0.3s ease",
//           }}
//           onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
//           onMouseLeave={(e) => e.target.style.backgroundColor = "#007BFF"}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}
// {/*
// {currentSection === 'coach' && (
//   <div className="coach-section">
//     <h3>All Coaches</h3>
//     {assistanceDetails.coachId && (assistanceDetails.status === 'Pending' || assistanceDetails.status === 'Accepted') ? (
//       // Show specific coach details if status is Pending or Accepted
//       <div className="coach-details">
//         <h4>Coach Profile</h4>
//         <p><strong>Name:</strong> {assistanceDetails.coach.name}</p>
//         <p><strong>Achievements:</strong> {assistanceDetails.coach.achievements}</p>
//         <div>
//           <h4>Diet Plan</h4>
//           <p>{assistanceDetails.coach.dietPlan || 'No diet plan assigned yet.'}</p>
//         </div>
//         <div>
//           <h4>Weight Plan</h4>
//           <p>{assistanceDetails.coach.weightPlan || 'No weight plan assigned yet.'}</p>
//         </div>
//       </div>
//     ) : (
//       // Show all coaches if no coach is assigned or status is not Pending/Accepted
//       <div className="available-coaches">
//         {coaches.length > 0 ? (
//           coaches.map((coach) => (
//             <div className="coach-card" key={coach.coachId}>
//               <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>
//               <button onClick={() => handleRequestAssistance(coach.coachId)}>
//                 Request Assistance
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No coaches available at the moment.</p>
//         )}
//       </div>
//     )}
//   </div>
// )}  */}



// {/*

// {currentSection === 'coach' && (
//         <>
//           <h3>All Coaches</h3>

//           {athlete.coachId ? (
//             // Athlete has a coach, show their details if the request status is accepted or pending
//             isRequestAcceptedOrPending ? (
//               <div className="coach-details">
//                 <h4>Coach Profile</h4>
//                 <p><strong>Name:</strong> {athlete.coach.name}</p>
//                 <p><strong>Achievements:</strong> {athlete.coach.achievements}</p>

//                 <div>
//                   <h4>Diet Plan</h4>
//                   <p>{athlete.coach.dietPlan || 'No diet plan assigned yet.'}</p>
//                 </div>

//                 <div>
//                   <h4>Weight Plan</h4>
//                   <p>{athlete.coach.weightPlan || 'No weight plan assigned yet.'}</p>
//                 </div>

//                 <div>
//                   <h4>Remarks</h4>
//                   <textarea
//                     placeholder="Add remarks about your coach (optional)"
//                     value={athlete.coachRemarks || ''}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <p>Your request is not yet accepted or pending approval.</p>
//             )
//           ) : (
//             // No coach assigned, show the list of available coaches
//             <div className="available-coaches">
//               {coaches.length > 0 ? (
//                 coaches.map((coach) => (
//                   <div className="coach-card" key={coach.coachId}>
//                     <img
//                       src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-profile.jpg'}
//                       alt="coach"
//                     />
//                     <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>

//                     <textarea
//                       placeholder="Add remarks (optional)"
//                       value={remarks[coach.coachId] || ''}
//                       onChange={(e) => handleRemarksChange(e, coach.coachId)} 
//                     />
//                     <button onClick={() => handleRequestAssistance(coach.coachId)}>
//                       Request Assistance
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p>No coaches available at the moment.</p>
//               )}
//             </div>
//           )}
//         </>
//       )}

//   */}


//   {/*
//   {currentSection === 'coach' && (
//   <>
//     <h3>All Coaches</h3>

//     {assistanceDetails.status === 'Accepted' ? (
//       // Show details of the assigned coach
//       <div className="coach-details">
//         <h4>Coach Profile</h4>
//         <p><strong>Name:</strong> {assistanceDetails.coach.firstName}</p>
//         <p><strong>Achievements:</strong> {assistanceDetails.coach.achievements}</p>

//         <div>
//           <h4>Diet Plan</h4>
//           <p>{assistanceDetails.coach.dietPlan || 'No diet plan assigned yet.'}</p>
//         </div>

//         <div>
//           <h4>Weight Plan</h4>
//           <p>{assistanceDetails.coach.weightPlan || 'No weight plan assigned yet.'}</p>
//         </div>

//         <div>
//           <h4>Remarks</h4>
//           <textarea
//             placeholder="Add remarks about your coach (optional)"
//             value={assistanceDetails.remarks || ''}
//           />
//         </div>
//       </div>
//     ) : (
//       // No accepted coach, show list of all available coaches
//       <div className="available-coaches">
//         {coaches.length > 0 ? (
//           coaches.map((coach) => (
//             <div className="coach-card" key={coach.coachId}>
//               <img
//                 src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-profile.jpg'}
//                 alt="coach"
//               />
//               <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>

//               <button onClick={() => openDialogBox(coach.coachId)}>
//                 Request Assistance
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No coaches available at the moment.</p>
//         )}
//       </div>
//     )}

//     {showDialog && (
//       <div className="dialog-box">
//         <div className="dialog-content">
//           <h4>Request Assistance</h4>
//           <textarea
//             placeholder="Add remarks (optional)"
//             value={remarks[selectedCoachId] || ''}
//             onChange={(e) => handleRemarksChange(e, selectedCoachId)}
//           />
//           <button onClick={() => handleRequestAssistance(selectedCoachId)}>
//             Submit Request
//           </button>
//           <button onClick={closeDialogBox}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     )}
//   </>
// )} */}


//   {currentSection === 'coach' && (
//   <>
//     <h3>All Coaches</h3>

//     {/* Check if assistance request is accepted or a request has been made */}
//     { assistanceDetails?.coachId? (
//       // Show details of the assigned coach or pending request
//       <div className="coach-details">
//         <h4>Coach Profile</h4>
//         <p><strong>Name:</strong> {assistanceDetails.coach.firstName}</p>
//         <p><strong>Achievements:</strong> {assistanceDetails.coach.achievements}</p>

//         <div>
//           <h4>Diet Plan</h4>
//           <p>{assistanceDetails.coach.dietPlan || 'No diet plan assigned yet.'}</p>
//         </div>

//         <div>
//           <h4>Weight Plan</h4>
//           <p>{assistanceDetails.coach.weightPlan || 'No weight plan assigned yet.'}</p>
//         </div>

//         <div>
//           <h4>Remarks</h4>
//           <textarea
//             placeholder="Add remarks about your coach (optional)"
//             value={assistanceDetails.remarks || ''}
//           />
//         </div>

//         {/* Show a message if the request is still pending */}
//         {assistanceDetails.status !== 'Accepted' && (
//           <p>Your request is pending approval.</p>
//         )}
//       </div>
//     ) : (
//       // Show list of available coaches if no request has been made
//       <div className="available-coaches">
//         {coaches.length > 0 ? (
//           coaches.map((coach) => (
//             <div className="coach-card" key={coach.coachId}>
//               <img
//                 src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-profile.jpg'}
//                 alt="coach"
//               />
//               <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>
//               <p><strong>Status</strong>{assistanceDetails.status}</p>

//               <button onClick={() => openDialogBox(coach.coachId)}>
//                 Request Assistance
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No coaches available at the moment.</p>
//         )}
//       </div>
//     )}

//     {/* Dialog box for requesting assistance */}
//     {showDialog && (
//       <div className="dialog-box">
//         <div className="dialog-content">
//           <h4>Request Assistance</h4>
//           <textarea
//             placeholder="Add remarks (optional)"
//             value={remarks[selectedCoachId] || ''}
//             onChange={(e) => handleRemarksChange(e, selectedCoachId)}
//           />
//           <button onClick={() => handleRequestAssistance(selectedCoachId)}>
//             Submit Request
//           </button>
//           <button onClick={closeDialogBox}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     )}
//   </>
// )}


//   {/*
//    {currentSection === 'coach' && (
//   <>
//     <h3>All Coaches</h3>

//     {athlete.coachId ? (
//       // Athlete has a coach, show their details if the request status is accepted or pending
//       isRequestAcceptedOrPending ? (
//         <div className="coach-details">
//           <h4>Coach Profile</h4>
//           <p><strong>Name:</strong> {athlete.coach.name}</p>
//           <p><strong>Achievements:</strong> {athlete.coach.achievements}</p>

//           <div>
//             <h4>Diet Plan</h4>
//             <p>{athlete.coach.dietPlan || 'No diet plan assigned yet.'}</p>
//           </div>

//           <div>
//             <h4>Weight Plan</h4>
//             <p>{athlete.coach.weightPlan || 'No weight plan assigned yet.'}</p>
//           </div>

//           <div>
//             <h4>Remarks</h4>
//             <textarea
//               placeholder="Add remarks about your coach (optional)"
//               value={athlete.coachRemarks || ''}
//             />
//           </div>
//         </div>
//       ) : (
//         <p>Your request is not yet accepted or pending approval.</p>
//       )
//     ) : (
//       // No coach assigned, show the list of available coaches
//       <div className="available-coaches">
//         {coaches.length > 0 ? (
//           coaches.map((coach) => (
//             <div className="coach-card" key={coach.coachId}>
//               <img
//                 src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-profile.jpg'}
//                 alt="coach"
//               />
//               <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>

//               <button onClick={() => openDialogBox(coach.coachId)}>
//                 Request Assistance
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No coaches available at the moment.</p>
//         )}
//       </div>
//     )}

//     {showDialog && (

//       <div className="dialog-box">
//         <div className="dialog-content">
//           <h4>Request Assistance</h4>
//           <textarea
//             placeholder="Add remarks (optional)"
//             value={remarks[selectedCoachId] || ''}
//             onChange={(e) => handleRemarksChange(e, selectedCoachId)}
//           />
//           <button onClick={() => handleRequestAssistance(selectedCoachId)}>
//             Submit Request
//           </button>
//           <button onClick={closeDialogBox}>
//             Cancel
//           </button>
//         </div>
//       </div>

//     )}
//   </>
// )} 
// */}

// {/*


// {currentSection === 'coach' && (
//   <div className="coach-section">
//     <h3>All coaches</h3>
//     {!athlete.coachId ? (
//       <div className="available-coaches">
//         {coaches.length > 0 ? (
//           coaches.map((coach) => (
//             <div className="coach-card" key={coach.coachId}>
//               <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>
//               <button onClick={() => handleRequestAssistance(coach.coachId)}>
//                 Request Assistance
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No coaches available at the moment.</p>
//         )}
//       </div>
//     ) : athlete.requestPending ? (
//       <p>Your request is pending approval from the coach.</p>
//     ) : (
//       <div className="coach-details">
//         <h4>Coach Profile</h4>
//         <p><strong>Name:</strong> {athlete.coach.name}</p>
//         <p><strong>Achievements:</strong> {athlete.coach.achievements}</p>
//         <div>
//           <h4>Diet Plan</h4>
//           <p>{athlete.coach.dietPlan || 'No diet plan assigned yet.'}</p>
//         </div>
//         <div>
//           <h4>Weight Plan</h4>
//           <p>{athlete.coach.weightPlan || 'No weight plan assigned yet.'}</p>
//         </div>
//       </div>
//     )}  
//   </div>
// )} */}

//       </div>
//     </div>
//   );

// }

// // Inline styles
// const dashboardStyles = {
//   padding: "20px",
//   backgroundColor: "#f0f4f8",
// };

// const cardStyles = {
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   marginBottom: "20px",
//   backgroundColor: "#fff",
// };

// const headerStyles = {
//   textAlign: "center",
//   marginBottom: "20px",
//   color: "#333",
// };

// const tableStyles = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginBottom: "20px",
// };

// const headerRowStyles = {
//   backgroundColor: "#007BFF",
//   color: "white",
//   textAlign: "left",
// };

// const rowStyles = {
//   borderBottom: "1px solid #ccc",
// };

// const buttonStyles = {
//   display: "block",
//   margin: "10px auto",
//   padding: "10px 20px",
//   backgroundColor: "#007BFF",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const noMoreStyles = {
//   textAlign: "center",
//   color: "#777",
// };

// const errorStyles = {
//   textAlign: "center",
//   color: "red",
//   fontWeight: "bold",
// };


// export default AthleteDashboard;

// import React, { useState, useEffect} from 'react';
// import { Box, Button ,Typography, AppBar, Toolbar} from "@mui/material";
// import { useNavigate ,Link} from 'react-router-dom';
// import { format, parseISO} from 'date-fns';
// import LoginIcon from "@mui/icons-material/Login";

// import axios from "axios";
// import '../styles/athlete.css';

// function AthleteDashboard() {
//   const navigate = useNavigate();
//   const [athlete, setAthlete] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [coaches, setCoaches] = useState([]);
//   const [myEvents, setMyEvents] = useState([]);
//   const [currentSection, setCurrentSection] = useState('profile');
//   const [editingProfile, setEditingProfile] = useState(false);
//   const [newImage, setNewImage] = useState(null);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('Overview');
//   const [remark, setRemark] = useState('');
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [registeringEvent, setRegisteringEvent] = useState(null);
//   const [selectedEvent2, setSelectedEvent2] = useState(null);
//   const [updatedProfile, setUpdatedProfile] = useState({
//     firstName: '',
//     lastName: '',
//     birthDate: '',
//     gender: '',
//     height: '',
//     weight: '',
//     category: '',
//     coach: '',
//   });
//   const [topPerformances, setTopPerformances] = useState([]); // Top performances state (list)
//   const [error, setError] = useState(""); // Error handling state

//   // Fetch athlete details (example endpoint)
//   // useEffect(() => {
//   //   const fetchAthleteDetails = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       const response = await axios.get("/athlete/top-performance", {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       setAthlete(response.data);
//   //     } catch (err) {
//   //       console.error("Failed to fetch athlete details:", err);
//   //     }
//   //   };

//   //   fetchAthleteDetails();
//   // }, []);

//   // Fetch top performances
//   useEffect(() => {
//     const fetchTopPerformances = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("/athlete/top-performance", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTopPerformances(response.data); // Expecting an array
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch top performances");
//       }
//     };

//     fetchTopPerformances();
//   }, []);


//   const [eventResults, setEventResults] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const resultsPerPage = 5;

//   useEffect(() => {
//     const fetchEventResults = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("/athlete/all-results", {
//           params: { page, size: resultsPerPage },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.data.length < resultsPerPage) {
//           setHasMore(false);
//         }

//         setEventResults((prevResults) => [...prevResults, ...response.data]);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch event results");
//       }
//     };

//     fetchEventResults();
//   }, [page]);

//   const loadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };



//   useEffect(() => {
//     loadAthleteProfile();
//     loadAllEvents();
//     loadMyEvents();
//     loadAllCoaches();
//   }, []);

//   const loadAthleteProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/athlete/profile', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json" 
//         }
//       });
//       const data = await response.json();
//       const parsedDate = parseISO(data.birthDate); // Parsing the date string to Date object
//       const formattedDate = (parsedDate.getMonth() + 1).toString().padStart(2, '0') + '/' + 
//       parsedDate.getDate().toString().padStart(2, '0') + '/' + 
//       parsedDate.getFullYear();
//       setAthlete(data);
//       setUpdatedProfile({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         birthDate: data.birthDate,
//         gender: data.gender,
//         height: data.height,
//         weight: data.weight,
//         category: data.category,
//         coach: data.coach,
//       });
//     } catch (error) {
//       console.error("Error loading athlete profile:", error);
//     }
//   };



//   const loadAllEvents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('athlete/events', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       console.log(data);
//       console.log(data.eventId);
//       setEvents(data);
//     } catch (error) {
//       console.error("Error loading events:", error);
//     }
//   };


//   // const availableCoaches = async () => {
//   //   try {
//   //     const response = await fetch('/api/coaches');
//   //     const data = await response.json();
//   //     return data; // returns a list of available coaches
//   //   } catch (error) {
//   //     console.error('Error fetching available coaches:', error);
//   //   }
//   // };


//   const loadAllCoaches = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/coach', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       console.log(data);
//       setCoaches(data);
//     } catch (error) {
//       console.error("Error loading events:", error);
//     }
//   };

//   const loadMyEvents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/athlete/events/registered', {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       setMyEvents(data);
//     } catch (error) {
//       console.error("Error loading my events:", error);
//     }
//   };

//   const handleViewEvent2 = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`/athlete/events/${eventId}`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });
//       const data = await response.json();
//       setSelectedEvent2(data);
//     } catch (error) {
//       console.error("Error loading my events:", error);
//     }

//   };

//   const closeSuccessPopup = () => {
//     setShowSuccessPopup(false);
//   };

//   const handleLogout = () => {
//     navigate('/*'); // Redirect to login page
//   };

//   const handleEditProfile = () => {
//     setEditingProfile(true);
//   };
//   const handleOpenRegisterPopup = (event) => setRegisteringEvent(event);

//   const handleViewEvent = (event) => setSelectedEvent(event);


//   const handleCloseModal = () => {
//     setEditingProfile(false); // Close the modal
//     setSelectedEvent(null);   // Reset the selected event state
//     setRegisteringEvent(null); // Reset the registering event state
//     setRemark(''); 
//   };
//   const handleCloseModal1 = () => {
//     setSelectedEvent2(null); 
//   };

//   const handleImageChange = (e) => {
//     setNewImage(e.target.files[0]); // Store the uploaded image
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;

//     setUpdatedProfile({
//       ...updatedProfile,
//       [name]: value,
//     });
//   };

//   const handleSaveProfile = async () => {
//     const formData = new FormData();
//     formData.append('firstName', updatedProfile.firstName);
//     formData.append('lastName', updatedProfile.lastName);
//     formData.append('birthDate', updatedProfile.birthDate);
//     formData.append('gender', updatedProfile.gender);
//     formData.append('height', updatedProfile.height);
//     formData.append('weight', updatedProfile.weight);
//     formData.append('category', updatedProfile.category);
//     formData.append('coach', updatedProfile.coach);
//     if (newImage) formData.append('photoUrl', newImage);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch('/athlete/createProfile', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         }
//       });

//       if (response.ok) {
//         setEditingProfile(false);
//         <p>Updated</p>
//         loadAthleteProfile(); // Reload the profile data
//       } else {
//         console.error('Error saving profile:', response);
//       }
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     }
//   };

//   const handleRegisterForEvent = async (eventId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`/athlete/registerForEvent/${eventId}`, {
//         method: 'POST',
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           remarks: remark
//         })
//       });

//       if (response.ok) {
//         loadAllEvents();
//         loadMyEvents(); // Reload my events after registering
//         setShowSuccessPopup(true); 
//         handleCloseModal();
//       } else {
//         console.log(`${eventId}`);
//         console.error('Error registering for event:', response);
//       }
//     } catch (error) {
//       console.error('Error registering for event:', error);
//     }
//   };


//   const filterMyEvents = () => {
//     switch (selectedTab) {
//       case 'Pending':
//         return myEvents.filter(event => event.status === 'Pending');
//       case 'Approved':
//         return myEvents.filter(event => event.status === 'Approved');
//       case 'Rejected':
//         return myEvents.filter(event => event.status === 'Rejected');
//       default:
//         return myEvents;
//     }
//   };

//   // const TopPerformance = () => {
//   //   const [topPerformance, setTopPerformance] = useState(null);
//   //   const [error, setError] = useState("");

//   //   useEffect(() => {
//   //     const fetchTopPerformance = async () => {
//   //       try {
//   //         const token = localStorage.getItem("token");
//   //         // Replace with your API endpoint to fetch top performance of the logged-in athlete
//   //         const response = await axios.get("athlete/top-performance", {
//   //           method: 'POST',
//   //           headers: {
//   //             "Authorization": `Bearer ${token}`,
//   //             "Content-Type": "application/json"
//   //           }});
//   //         setTopPerformance(response.data);
//   //       } catch (err) {
//   //         setError(err.response?.data?.error || "Failed to fetch top performance");
//   //       }
//   //     };

//   //     fetchTopPerformance();
//   //   }, []);

//   //   if (error) {
//   //     return <div className="error-message">{error}</div>;
//   //   }
//   // };


//   // const fetchCoachDetails = async (coachId) => {
//   //   try {
//   //     const response = await fetch(`/api/coaches/${coachId}`);
//   //     const data = await response.json();
//   //     return data; // returns coach details
//   //   } catch (error) {
//   //     console.error('Error fetching coach details:', error);
//   //   }
//   // };

//   // // Function to fetch achievements for a coach
//   // const fetchAchievements = async (coachId) => {
//   //   try {
//   //     const response = await fetch(`/api/coaches/${coachId}/achievements`);
//   //     const data = await response.json();
//   //     return data; // returns achievements
//   //   } catch (error) {
//   //     console.error('Error fetching achievements:', error);
//   //   }
//   // };

//   // // Function to fetch diet plans for a coach
//   // const fetchDietPlans = async (coachId) => {
//   //   try {
//   //     const response = await fetch(`/api/coaches/${coachId}/dietplans`);
//   //     const data = await response.json();
//   //     return data; // returns diet plans
//   //   } catch (error) {
//   //     console.error('Error fetching diet plans:', error);
//   //   }
//   // };

//   // // Function to fetch weight plan for a coach
//   // const fetchWeightPlan = async (coachId) => {
//   //   try {
//   //     const response = await fetch(`/api/coaches/${coachId}/weightplan`);
//   //     const data = await response.json();
//   //     return data; // returns weight plan
//   //   } catch (error) {
//   //     console.error('Error fetching weight plan:', error);
//   //   }
//   // };

//   //   const [availableCoaches, setAvailableCoaches] = useState([]);
//   //   const [selectedCoach, setSelectedCoach] = useState(null);
//   //   const [achievements, setAchievements] = useState([]);
//   //   const [dietPlans, setDietPlans] = useState([]);
//   //   const [weightPlan, setWeightPlan] = useState(null);
//   //   const [remark2, setRemark2] = useState('');
//   //   const [showAssistanceForm, setShowAssistanceForm] = useState(false);
//   //   const [showSuccessPopup2, setShowSuccessPopup2] = useState(false);

//   //   const fetchAvailableCoaches = async () => {
//   //     try {
//   //       const token = localStorage.getItem("token");
//   //       const response = await fetch('/athlete/getallcoaches', {
//   //         headers: {
//   //             Authorization: `Bearer ${token}`
//   //         }
//   //     });
//   //       const data = await response.json();
//   //       return data; // returns a list of available coaches
//   //     } catch (error) {
//   //       console.error('Error fetching available coaches:', error);
//   //     }
//   //   };

//   //   useEffect(() => {
//   //     // Fetch details when coachId is present
//   //     if (athlete.coachId) {
//   //       fetchCoachDetails(athlete.coachId).then((coachData) => setSelectedCoach(coachData));
//   //       fetchAchievements(athlete.coachId).then((data) => setAchievements(data));
//   //       fetchDietPlans(athlete.coachId).then((data) => setDietPlans(data));
//   //       fetchWeightPlan(athlete.coachId).then((data) => setWeightPlan(data));
//   //     }
//   //   }, [athlete.coachId]);

//   //   // Handle view coach details
//   //   const handleViewCoach = (coach) => {
//   //     setSelectedCoach(coach);
//   //   };

//   //   // Handle assistance request
//   //   const handleRequestAssistance = (coach) => {
//   //     setShowAssistanceForm(true);
//   //   };

//   //   // Handle creating an assistance request
//   //   const handleCreateAssistanceRequest = async (coachId) => {
//   //     try {
//   //       const response = await fetch('/api/assistance/request', {
//   //         method: 'POST',
//   //         headers: { 'Content-Type': 'application/json' },
//   //         body: JSON.stringify({ coachId, remark2 }),
//   //       });
//   //       if (response.ok) {
//   //         setShowSuccessPopup2(true);
//   //         setShowAssistanceForm(false);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error creating assistance request:', error);
//   //     }
//   //   };

//   //   // Close modals
//   //   const handleCloseModal2 = () => {
//   //     setShowAssistanceForm(false);
//   //     setShowSuccessPopup2(false);
//   //   };

//   //   // Handle success popup close
//   //   const closeSuccessPopup2 = () => {
//   //     setShowSuccessPopup2(false);
//   //   };

//   return (
//     <div className="athlete-dashboard">

//       <AppBar position="static" className="navbar">
//                 <Toolbar className="navbar-content">
//                     <Typography variant="h5" className="navbar-title">
//                     Athletics
//                     </Typography>
//                     <Box className="navbar-actions">
//                         <Link to="" className="logout-link" >
//                             <Button className="logout-button" onClick={() => setCurrentSection('profile')}>
//                             Profile
//                             </Button>
//                         </Link>
//                         <Link to="" className="logout-link">
//                             <Button className="logout-button" onClick={() => setCurrentSection('events')}>
//                             Events
//                             </Button>
//                         </Link>
//                         <Link to="" className="logout-link">
//                             <Button className="logout-button"  onClick={() => setCurrentSection('myEvents')}>
//                             My Events
//                             </Button>
//                         </Link>
//                         <Link to="" className="logout-link">
//                             <Button className="logout-button"  onClick={() => setCurrentSection('coach')}>
//                             Coach
//                             </Button>
//                         </Link>
//                         <Link to="/*" className="logout-link">
//                             <Button 
//                                 onClick={handleLogout} 
//                                 startIcon={<LoginIcon />}
//                                 className="logout-button"
//                             >
//                                 Logout
//                             </Button>
//                         </Link>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//         <h1></h1>


//       <div className="content">
//         {currentSection === 'profile' && (
//         <>
//            <div className="transition-container">
//           <div className="centered-jump">
//             <p></p>
//             <h2> Profile</h2>
//           </div>
//           <div className="profile-section">
//             {athlete && (
//               <>

//                 <img
//                   // src={`${athlete.photoUrl || '/default-profile.jpg'}`}
//                   src={athlete.photoBase64 ? `data:image/jpeg;base64,${athlete.photoBase64}` : '/default-profile.jpg'}
//                   className="profile-photo"
//                 />
//                 <div className="athlete-info">
//                   <p>Name: {athlete.firstName} {athlete.lastName}</p>
//                   <p>Date of Birth: {athlete.birthDate ? athlete.birthDate.split('T')[0] : 'N/A'}
//                   </p>
//                   <p>Gender: {athlete.gender}</p>
//                   <p>Height: {athlete.height}</p>
//                   <p>Weight: {athlete.weight}</p>
//                   <p>Category: {athlete.category}</p>
//                   <p>Coach: {athlete.coach || "N/A"}</p>
//                   <button onClick={handleEditProfile}>Edit Profile</button>
//                 </div>
//               </>
//             )}
//           </div>
//           </div>
//           <div className="top-performance-card" style={{ margin: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//   <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "24px" }}>Top 5 Performances</h2>
//   {error ? (
//     <div className="error-message" style={{ color: "red", textAlign: "center" }}>{error}</div>
//   ) : topPerformances.length > 0 ? (
//     <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
//       <thead>
//         <tr style={{ backgroundColor: "#f4f4f4", borderBottom: "2px solid #ddd" }}>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Event Name</th>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Meet Name</th>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Score</th>
//           <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Comment</th>
//         </tr>
//       </thead>
//       <tbody>
//         {topPerformances.slice(0, 5).map((performance, index) => (
//           <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.eventName}</td>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.meetName}</td>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee", textAlign: "center" }}>{performance.score}</td>
//             <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{performance.comment}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   ) : (
//     <p style={{ textAlign: "center", color: "#666" }}>No top performances found.</p>
//   )}
// </div>

// <div style={dashboardStyles}>
//       <div style={cardStyles}>
//         <h2 style={headerStyles}>All Event Results</h2>
//         {error ? (
//           <div style={errorStyles}>{error}</div>
//         ) : (
//           <table style={tableStyles}>
//             <thead>
//               <tr style={headerRowStyles}>
//                 <th>Event Name</th>
//                 <th>Meet Name</th>
//                 <th>Date</th>
//                 <th>Score</th>
//                 <th>Comment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {eventResults.map((result, index) => (
//                 <tr key={index} style={rowStyles}>
//                   <td>{result.eventName}</td>
//                   <td>{result.meetName}</td>
//                   <td>{result.eventDate ? 
//                     (() => {
//                       const date = new Date(result.eventDate);
//                       return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
//                     })() 
//                     : 'N/A'}</td>
//                   <td>{result.score}</td>
//                   <td>{result.comment}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {hasMore && !error && (
//           <button onClick={loadMore} style={buttonStyles}>
//             Load More
//           </button>
//         )}
//         {!hasMore && !error && (
//           <p style={noMoreStyles}>No more results to display.</p>
//         )}
//       </div>
//       {/* Existing elements below */}
//       <div>
//         {/* Add other admin dashboard components here */}
//       </div>
//     </div>



// </>
//         )}

//         {editingProfile && (
//           <div className="modal">
//             <div className="modal-content">
//               <h2>Edit Profile</h2>
//               <form onSubmit={(e) => e.preventDefault()}>
//               <label>
//     <input
//       type="text"
//       name="firstName"
//       value={updatedProfile.firstName}
//       onChange={handleProfileChange}
//       placeholder=" " /* Placeholder for compatibility */
//     />
//     <span>First Name</span>
//   </label>

//   <label>
//     <input
//       type="text"
//       name="lastName"
//       value={updatedProfile.lastName}
//       onChange={handleProfileChange}
//       placeholder=" " 
//     />
//     <span>Last Name</span>
//   </label>

//   <label>
//     <input
//       type="date"
//       name="birthDate"
//       value={updatedProfile.birthDate}
//       onChange={handleProfileChange}
//       placeholder=" " 
//     />
//     <span>Date of Birth</span>
//   </label>

//   <label>
//     <input
//       type="text"
//       name="gender"
//       value={updatedProfile.gender}
//       onChange={handleProfileChange}
//       placeholder=" "
//     />
//     <span>Gender</span>
//   </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="height"
//                     value={updatedProfile.height}
//                     onChange={handleProfileChange}
//                     placeholder=" " 
//                   />
//                   <span>Height</span>
//                 </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="weight"
//                     value={updatedProfile.weight}
//                     onChange={handleProfileChange}
//                     placeholder=''
//                   />
//                   <span>Weight</span>
//                 </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="category"
//                     value={updatedProfile.category}
//                     onChange={handleProfileChange}
//                     placeholder=''
//                   />
//                   <span>Category</span>
//                 </label>
//                 <label>
//                   <input
//                     type="text"
//                     name="coach"
//                     value={updatedProfile.coach}
//                     onChange={handleProfileChange}
//                     placeholder=''
//                   />
//                   <span>Coach</span>
//                 </label>
//                 <input
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   style={{
//                     marginTop: "1rem",
//                     padding: "10px",
//                     border: "2px dashed gray",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     transition: "border-color 0.3s ease",
//                   }}
//                   onMouseEnter={(e) => (e.target.style.borderColor = "green")}
//                   onMouseLeave={(e) => (e.target.style.borderColor = "gray")}
//                 />
//                <p></p>
//                 <div className="modal-actions">
//                   <button type="button" onClick={handleSaveProfile} className='btn2'>Save</button>
//                   <button type="button" onClick={handleCloseModal} className='btn2'>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

// {currentSection === 'events' && (
//    <div className="transition-container">
//           <div className="events-section">
//           <div className="centered-jump">
//             <h2> Events</h2>
//           </div>
//             <div className="events-container">
//               {events.map(event => (
//                 <div key={event.id} className="event-card">
//                   <img 
//                   src={event.imageBase64 ? `data:image/jpeg;base64,${event.imageBase64}` : '/default-profile.jpg'}
//                   alt={event.eventTitle} onClick={() => handleViewEvent(event)} />
//                   <h3 style={{textAlign:'center'}}>{event.eventTitle}</h3>
//                   <p>Meet: {event.meetId.meetName}</p>
//                   <p>Category: {event.category}</p>
//                     <button className="button-19" onClick={() => handleViewEvent(event)}>View</button>
//                     <p></p>
//                     <button className="button-19" onClick={() => handleOpenRegisterPopup(event)}>Register</button>
//                   </div>
//               ))}
//             </div>
//           </div>
//           </div>
//         )}

// {selectedEvent && (
//   <div className="modal">
//     <div className="modal-content" style={{height:'90%'}}>
//       <h2>{selectedEvent.eventTitle}</h2>
//       <img src={selectedEvent.imageBase64 ? `data:image/jpeg;base64,${selectedEvent.imageBase64}` : '/default-profile.jpg'}
//        alt={selectedEvent.eventTitle} onClick={() => handleViewEvent(selectedEvent)} width={'385px'} height={'200px'} style={
//         {
//           paddingLeft:"5%"
//         }
//        }/>
//       <p>Meet: {selectedEvent.meetId.meetName}</p>
//       <p>Category: {selectedEvent.category}</p>
//       <p>Description: {selectedEvent.description}</p>
//       <p>Location: {selectedEvent.location}</p>
//       <p>Event Date: {selectedEvent.eventDate.split('T')[0]}</p>
//       <textarea placeholder="Remarks (optional)" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
//       <p></p>

//       <button onClick={() => handleRegisterForEvent(selectedEvent.eventId)} style={{width:'210px',marginRight:'13px'}}>Register</button>
//       <button onClick={handleCloseModal} style={{width:'210px'}}>Close</button>
//     </div>
//   </div>
// )}

// {registeringEvent && (
//           <div className="modal" >
//             <div className="modal-content" style={{width:'400px',height:'300px',textAlign:'center'}}>
//               <h1>Register for {registeringEvent.eventTitle}</h1>
//               <textarea placeholder="Add your remark" required value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
//               <p></p>
//               <button onClick={() => handleRegisterForEvent(registeringEvent.eventId)} style={{width:'150px',marginRight:'15px'}}>Submit</button>
//               <button onClick={handleCloseModal} style={{width:'150px',marginRight:'15px'}}>Cancel</button>
//             </div>
//           </div>
//         )}
//         {showSuccessPopup && (
//       <div className="modal">
//         <div className="modal-content" style={{ textAlign: 'center' , height:'200px'}}>
//           <h2>Registration Successful!</h2>
//           <p>You have successfully registered for the event.</p>
//           <button onClick={closeSuccessPopup} style={{ marginTop: '20px' }}>OK</button>
//         </div>
//       </div>
//     )}

// {currentSection === 'myEvents' && (

//   <div className="transition-container">
//   <div className="my-events-section">
//    <div className="centered-jump">
//   <h2>My Events</h2>
// </div>


//     <div className="tabs">
//       {['Overview', 'Pending', 'Approved', 'Rejected'].map((tab) => (
//         <button
//           key={tab}
//           className={selectedTab === tab ? 'active' : ''}
//           onClick={() => setSelectedTab(tab)}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//     <table>
//       <thead>
//         <tr>
//           <th>Event Name</th>
//           <th>Meet Name</th>
//           <th>Registration Date</th>
//           <th>Status</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filterMyEvents().map((regis) => (
//           <tr key={regis.registrationId}>
//             <td>{regis.eventName}</td>
//             <td>{regis.meetName}</td>
//             <td>{regis.registrationDate.split("T")[0]}</td>
//             <td>{regis.status}</td>
//             <td>
//               <button className="button-19" onClick={() => handleViewEvent2(regis.eventId)}>View</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   </div>
// )}

// {selectedEvent2 && (
//   <div 
//     className="modal" 
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//       padding: "20px",
//       boxSizing: "border-box",
//     }}
//   >
//     <div 
//       className="modal-content"
//       style={{
//         backgroundColor: "white",
//         borderRadius: "8px",
//         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//         overflow: "hidden",
//         maxWidth: "600px",
//         width: "100%",
//         height:"530px",
//         textAlign: "center",
//         transition: "transform 0.3s ease, box-shadow 0.3s ease",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "scale(1.02)";
//         e.currentTarget.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.3)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "scale(1)";
//         e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
//       }}
//     >
//       <h2 style={{ margin: "10px 0", fontSize: "24px", fontWeight: "bold" }}>
//           {selectedEvent2.eventTitle}
//         </h2>
//       {selectedEvent2.imageBase64 && (
//         <img
//           src={`data:image/jpeg;base64,${selectedEvent2.imageBase64}`}
//           alt={selectedEvent2.eventTitle}
//           style={{
//             width: "100%",
//             height: "200px",
//             objectFit: "cover",
//             borderTopLeftRadius: "8px",
//             borderTopRightRadius: "8px",
//           }}
//         />
//       )}
//       <div 
//         style={{
//           padding: "20px",
//           boxSizing: "border-box",
//           borderRadius: "0 0 8px 8px",
//           backgroundColor: "#f1eeee",
//         }}
//       >
//         <p><b>Meet Name: </b>{selectedEvent2.meetName}</p>
//         <p><b>Registration Date: </b>{selectedEvent2.category}</p>
//         <p><b>Event Description: </b>{selectedEvent2.eventDescription}</p>
//         <p><b>Event Date: </b>{selectedEvent2.eventDate.split("T")[0]}</p>
//         <p><b>Location: </b>{selectedEvent2.location}</p>
//         <button 
//           onClick={handleCloseModal1} 
//           style={{
//             marginTop: "20px",
//             padding: "10px 20px",
//             backgroundColor: "#007BFF",
//             color: "white",
//             border: "none",
//             borderRadius: "20px",
//             cursor: "pointer",
//             transition: "background-color 0.3s ease",
//           }}
//           onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
//           onMouseLeave={(e) => e.target.style.backgroundColor = "#007BFF"}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}



// {currentSection === 'coach' && (
//   <div className="transition-container">
//   <div className="events-section">
//   <div className="centered-jump">
//     <h2> Coaches</h2>
//   </div>
//     <div className="events-container">



//     </div>
//   </div>
//   </div>
// )}
//       </div>
//     </div>
//   );

// }

// // Inline styles
// const dashboardStyles = {
//   padding: "20px",
//   backgroundColor: "#f0f4f8",
// };

// const cardStyles = {
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   marginBottom: "20px",
//   backgroundColor: "#fff",
// };

// const headerStyles = {
//   textAlign: "center",
//   marginBottom: "20px",
//   color: "#333",
// };

// const tableStyles = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginBottom: "20px",
// };

// const headerRowStyles = {
//   backgroundColor: "#007BFF",
//   color: "white",
//   textAlign: "left",
// };

// const rowStyles = {
//   borderBottom: "1px solid #ccc",
// };

// const buttonStyles = {
//   display: "block",
//   margin: "10px auto",
//   padding: "10px 20px",
//   backgroundColor: "#007BFF",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const noMoreStyles = {
//   textAlign: "center",
//   color: "#777",
// };

// const errorStyles = {
//   textAlign: "center",
//   color: "red",
//   fontWeight: "bold",
// };


// export default AthleteDashboard;


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

  // Fetch athlete details (example endpoint)
  // useEffect(() => {
  //   const fetchAthleteDetails = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("/athlete/top-performance", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setAthlete(response.data);
  //     } catch (err) {
  //       console.error("Failed to fetch athlete details:", err);
  //     }
  //   };

  //   fetchAthleteDetails();
  // }, []);

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

  // const loadAllCoaches = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch('/athlete/getallcoaches', {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       }
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setCoaches(data);
  //   } catch (error) {
  //     console.error("Error loading events:", error);
  //   }
  // };



  // const fetchCoaches = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const response = await fetch('coach/getallcoaches',{
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //       }
  //     });
  //      // Replace with your actual API endpoint
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCoaches(data);
  //     } else {
  //       console.error('Failed to fetch coaches');
  //     }

  //   } catch (error) {
  //     console.error('Error fetching coaches:', error);
  //   }
  // };





  // const openDialogBox = (coachId) => {
  //   setSelectedCoachId(coachId);
  //   setShowDialog(true);
  // };

  // const closeDialogBox = () => {
  //   setShowDialog(false);
  //   setSelectedCoachId(null);
  // };




  // const fetchAssistanceStatus = async () => {
  //   try {
  //     const token = localStorage.getItem("token"); // Retrieve token from localStorage

  //     const response = await fetch(`/athlete/getassistancereq`, {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${token}`, // Add Authorization header
  //         //"Content-Type": "application/json",  Ensure proper Content-Type
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json(); // Parse the JSON response
  //       setAssistanceDetails(data);
  //     } else {
  //       console.error('Failed to fetch assistance request details');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching assistance request details:', error);
  //   }
  // };



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
      const data = await response.json();


      // Parse the birthDate only if it's available, otherwise set a default value
      let formattedDate = null;
      if (data.birthDate) {
        const parsedDate = parseISO(data.birthDate); // Parsing the date string to Date object
        formattedDate = (parsedDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
          parsedDate.getDate().toString().padStart(2, '0') + '/' +
          parsedDate.getFullYear();
      }
      const formatDate = (dateString) => {
        const parsedDate = parseISO(dateString); // Parsing the date string to Date object
        return (parsedDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
          parsedDate.getDate().toString().padStart(2, '0') + '/' +
          parsedDate.getFullYear();
      };
      // Set default values if any field is null or undefined
      // setAthlete(data);
      setAthlete({
        firstName: data.firstName || 'Data not available', // If firstName is null/undefined, show this message
        lastName: data.lastName || '', // If lastName is null/undefined, show this message
        birthDate: data.birthDate ? formatDate(data.birthDate) : 'Data not available', // Format date if available, else show default
        gender: data.gender || 'Data not available', // If gender is null/undefined, show this message
        height: data.height || 'Data not available', // If height is null/undefined, show this message
        weight: data.weight || 'Data not available', // If weight is null/undefined, show this message
        category: data.category || 'Data not available', // If category is null/undefined, show this message
        photoBase64: data.photoBase64 || null
      });


      setUpdatedProfile({

        firstName: data.firstName || '', // Default to empty string if null/undefined
        lastName: data.lastName || '', // Default to empty string if null/undefined
        birthDate: formattedDate || '', // Default to empty string if date is null/undefined
        gender: data.gender || '', // Default to 'Not specified' if null/undefined
        height: data.height || '', // Default to 'Unknown' if null/undefined
        weight: data.weight || '', // Default to 'Unknown' if null/undefined
        category: data.category || 'Not specified', // Default to 'Not specified' if null/undefined
        coach: data.coach || null, // Default to null if coach is not available
      });
    } catch (error) {
      console.error("Error loading athlete profile:", error);
    }
  };



  // const handleRemarksChange = (e, coachId) => {
  //   const newRemarks = { ...remarks };
  //   newRemarks[coachId] = e.target.value;
  //   setRemarks(newRemarks);
  // };


  // const handleRequestAssistance = async (coachId) => {
  //   try {
  //     const token = localStorage.getItem('token');

  //   const formData = new FormData();
  //   formData.append('coachId', coachId);
  //   formData.append('remarks', remarks[coachId] || '');  

  //     const response = await fetch(`/athlete/createassistancereq`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,  
  //       },
  //       body: formData, 
  //     });
  //    if (response.ok) {
  //       alert('Assistance request sent successfully!');
  //       await fetchAssistanceStatus();
  //       loadAthleteProfile();
  //     } else {
  //       const errorData = await response.json();
  //       console.error('Error requesting assistance:', errorData.message);
  //       alert('Failed to send assistance request. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error requesting assistance:', error);
  //     alert('An error occurred. Please try again.');
  //   }
  // };


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
    formData.append('firstName', updatedProfile.firstName);
    formData.append('lastName', updatedProfile.lastName);
    formData.append('birthDate', updatedProfile.birthDate);
    formData.append('gender', updatedProfile.gender);
    formData.append('height', updatedProfile.height);
    formData.append('weight', updatedProfile.weight);
    formData.append('category', updatedProfile.category);
    // formData.append('coach', updatedProfile.coach);
    if (newImage) formData.append('photoUrl', newImage);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/athlete/createProfile', {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      if (response.ok) {
        setEditingProfile(false);
        <p>Updated</p>
        loadAthleteProfile(); // Reload the profile data
      } else {
        console.error('Error saving profile:', response);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
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

  // const TopPerformance = () => {
  //   const [topPerformance, setTopPerformance] = useState(null);
  //   const [error, setError] = useState("");

  //   useEffect(() => {
  //     const fetchTopPerformance = async () => {
  //       try {
  //         const token = localStorage.getItem("token");
  //         // Replace with your API endpoint to fetch top performance of the logged-in athlete
  //         const response = await axios.get("athlete/top-performance", {
  //           method: 'POST',
  //           headers: {
  //             "Authorization": `Bearer ${token}`,
  //             "Content-Type": "application/json"
  //           }});
  //         setTopPerformance(response.data);
  //       } catch (err) {
  //         setError(err.response?.data?.error || "Failed to fetch top performance");
  //       }
  //     };

  //     fetchTopPerformance();
  //   }, []);

  //   if (error) {
  //     return <div className="error-message">{error}</div>;
  //   }
  // };


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



  // const currentRequest = assistanceRequests.find(
  //   (req) => req.athleteId === athlete.athleteId
  // );




  // const isRequestAcceptedOrPending = currentRequest && (
  //   currentRequest.status === 'Pending' || currentRequest.status === 'Accepted'
  // );


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







  // useEffect(() => {
  //   // Fetch Assistance Request
  //   axios.get('/athlete/getassistancereq', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       setAssistanceRequest(response.data);

  //       if (assistanceRequest && assistanceRequest.status === 'Accepted') {
  //         axios.get(`/athlete/coach/${assistanceRequest.coachId}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         })
  //           .then(response => {
  //             setCoachDetails(response.data);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching coach details:', error);
  //           });

  //         // Fetch Coach's Achievements
  //         axios.get(`/athlete/achievements/coach/${assistanceRequest.coachId}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         })
  //           .then(response => {
  //             setCoachAchievements(response.data);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching coach achievements:', error);
  //           });

  //         // Fetch Coach's Weight Plan
  //         axios.get(`/athlete/getweightplan`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         })
  //           .then(response => {
  //             setCoachWeightPlan(response.data);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching coach weight plans:', error);
  //           });

  //         // Fetch Coach's Diet Plan
  //         axios.get(`/athlete/getdailydiets`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         })
  //           .then(response => {
  //             setCoachDietPlan(response.data);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching coach diet plans:', error);
  //           });


  //       }


  //     })
  //     .catch(error => {
  //       console.error('Error fetching assistance request:', error);
  //     });




  // }, []);

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

                    {/* <img src={athlete.photoBase64 ? `data:image/jpeg;base64,${athlete.photoBase64}` : './images/default-profile.jpg'} style={{
                          width: '100%',
                          maxWidth: '400px', // Increase image maxWidth for a larger image
                          borderRadius: '8px',
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }} />    */}
                    <img
                      src={athlete.photoBase64 ? `data:image/jpeg;base64,${athlete.photoBase64}`: defaultProfileImage}
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
                          <td>{result.eventDate ?
                            (() => {
                              const date = new Date(result.eventDate);
                              return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
                            })()
                            : 'N/A'}</td>
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
                <label>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedProfile.firstName}
                    onChange={handleProfileChange}
                    placeholder=" " /* Placeholder for compatibility */
                  />
                  <span>First Name</span>
                </label>

                <label>
                  <input
                    type="text"
                    name="lastName"
                    value={updatedProfile.lastName}
                    onChange={handleProfileChange}
                    placeholder=" "
                  />
                  <span>Last Name</span>
                </label>

                <label>
                  <input
                    type="date"
                    name="birthDate"
                    value={updatedProfile.birthDate}
                    onChange={handleProfileChange}
                    placeholder=" "
                  />
                  <span>Date of Birth</span>
                </label>

                <label>
                  <input
                    type="text"
                    name="gender"
                    value={updatedProfile.gender}
                    onChange={handleProfileChange}
                    placeholder=" "
                  />
                  <span>Gender</span>
                </label>
                <label>
                  <input
                    type="text"
                    name="height"
                    value={updatedProfile.height}
                    onChange={handleProfileChange}
                    placeholder=" "
                  />
                  <span>Height</span>
                </label>
                <label>
                  <input
                    type="text"
                    name="weight"
                    value={updatedProfile.weight}
                    onChange={handleProfileChange}
                    placeholder=''
                  />
                  <span>Weight</span>
                </label>
                <label>
                  <input
                    type="text"
                    name="category"
                    value={updatedProfile.category}
                    onChange={handleProfileChange}
                    placeholder=''
                  />
                  <span>Category</span>
                </label>
                {/* <label>
                  <input
                    type="text"
                    name="coach"
                    value={updatedProfile.coach}
                    onChange={handleProfileChange}
                    placeholder=''
                  />
                  <span>Coach</span> */}
                {/* </label> */}
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
                <p></p>
                <div className="modal-actions">
                  <button type="button" onClick={handleSaveProfile} className='btn2'>Save</button>
                  <button type="button" onClick={handleCloseModal} className='btn2'>Cancel</button>
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
              <p>Description: {selectedEvent.description}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Event Date: {selectedEvent.eventDate.split('T')[0]}</p>
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
        {/*
{currentSection === 'myEvents' && (
  
  <div className="transition-container">
  <div className="my-events-section">
   <div className="centered-jump">
  <h2>My Events</h2>
</div>


    <div className="tabs">
      {['Overview', 'Pending', 'Approved', 'Rejected'].map((tab) => (
        <button
          key={tab}
          className={selectedTab === tab ? 'active' : ''}
          onClick={() => setSelectedTab(tab)}
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
        {filterMyEvents().map((regis) => (
          <tr key={regis.registrationId}>
            <td>{regis.eventName}</td>
            <td>{regis.meetName}</td>
            <td>{regis.registrationDate.split("T")[0]}</td>
            <td>{regis.status}</td>
            <td>
              <button className="button-19" onClick={() => handleViewEvent2(regis.eventId)}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
        height:"530px",
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
        <p><b>Registration Date: </b>{selectedEvent2.category}</p>
        <p><b>Event Description: </b>{selectedEvent2.eventDescription}</p>
        <p><b>Event Date: </b>{selectedEvent2.eventDate.split("T")[0]}</p>
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


*/}


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
                          <td>{regis.registrationDate}</td>
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
                          <td>{new Date(event.eventDate).toLocaleDateString()}</td>
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
                      )))}
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
                      <p>Event Date: {new Date(selectedEvent3.eventDate).toLocaleDateString()}</p>
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
                                {/* Rank: Find the index of the logged-in athlete and add 1 to it */}
                                <td>
                                  {leaderboard.findIndex(entry => entry.athleteName === athleteResult.athleteName) + 1}
                                </td>
                                <td>{athleteResult.score}</td>
                                <td>{athleteResult.comment}</td>
                              </tr>
                            </tbody>
                          </table>

                          {/* <p>Score: {athleteResult.score}</p>
              <p>Comment: {athleteResult.comment}</p> */}
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


                    //       { && selectedEvent3.result  && (
                    //         <div>
                    //           <h3>Your Result</h3>
                    //           <p>Score: {selectedEvent3.result?.score}</p>
                    //           <p>Comment: {selectedEvent3.result?.comment}</p>

                    //           <h3>Leaderboard</h3>
                    //           <ul>
                    //             {selectedEvent3.leaderboard.map((entry, index) => (
                    //               <li key={index}>
                    //                 {entry.athleteName}: {entry.score}
                    //               </li>
                    //             ))}
                    //           </ul>
                    //         </div>
                    //       )}
                    //     </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal for Viewing Event Details 
{selectedEvent2 && (
  <div className="modal">
    <div className="modal-content">
      <h2>{selectedEvent2.eventTitle}</h2>
      {selectedEvent2.imageBase64 && (
        <img
          src={`data:image/jpeg;base64,${selectedEvent2.imageBase64}`}
          alt={selectedEvent2.eventTitle}
          style={{ width: '100%', height: '200px', marginBottom: '20px' }}
        />
      )}
      <p>
        <b>Registration Date: </b>
        {selectedEvent2.category}
      </p>
      <p>
        <b>Event Description: </b>
        {selectedEvent2.eventDescription}
      </p>
      <p>
        <b>Event Date: </b>
        {selectedEvent2.eventDate}
      </p>
      <p>
        <b>Location: </b>
        {selectedEvent2.location}
      </p>
      <button
        onClick={handleCloseModal1}
        style={{ marginLeft: '30%', marginTop: '20px', width: '155px' }}
      >
        Close
      </button>
    </div>
  </div>
)}
  */}

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
                <p><b>Event Date: </b>{selectedEvent2.eventDate.split("T")[0]}</p>
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
        {/*
{currentSection === 'coach' && (
  <div className="coach-section">
    <h3>All Coaches</h3>
    {assistanceDetails.coachId && (assistanceDetails.status === 'Pending' || assistanceDetails.status === 'Accepted') ? (
      // Show specific coach details if status is Pending or Accepted
      <div className="coach-details">
        <h4>Coach Profile</h4>
        <p><strong>Name:</strong> {assistanceDetails.coach.name}</p>
        <p><strong>Achievements:</strong> {assistanceDetails.coach.achievements}</p>
        <div>
          <h4>Diet Plan</h4>
          <p>{assistanceDetails.coach.dietPlan || 'No diet plan assigned yet.'}</p>
        </div>
        <div>
          <h4>Weight Plan</h4>
          <p>{assistanceDetails.coach.weightPlan || 'No weight plan assigned yet.'}</p>
        </div>
      </div>
    ) : (
      // Show all coaches if no coach is assigned or status is not Pending/Accepted
      <div className="available-coaches">
        {coaches.length > 0 ? (
          coaches.map((coach) => (
            <div className="coach-card" key={coach.coachId}>
              <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>
              <button onClick={() => handleRequestAssistance(coach.coachId)}>
                Request Assistance
              </button>
            </div>
          ))
        ) : (
          <p>No coaches available at the moment.</p>
        )}
      </div>
    )}
  </div>
)}  */}



        {/*

{currentSection === 'coach' && (
        <>
          <h3>All Coaches</h3>

          {athlete.coachId ? (
            // Athlete has a coach, show their details if the request status is accepted or pending
            isRequestAcceptedOrPending ? (
              <div className="coach-details">
                <h4>Coach Profile</h4>
                <p><strong>Name:</strong> {athlete.coach.name}</p>
                <p><strong>Achievements:</strong> {athlete.coach.achievements}</p>

                <div>
                  <h4>Diet Plan</h4>
                  <p>{athlete.coach.dietPlan || 'No diet plan assigned yet.'}</p>
                </div>

                <div>
                  <h4>Weight Plan</h4>
                  <p>{athlete.coach.weightPlan || 'No weight plan assigned yet.'}</p>
                </div>

                <div>
                  <h4>Remarks</h4>
                  <textarea
                    placeholder="Add remarks about your coach (optional)"
                    value={athlete.coachRemarks || ''}
                  />
                </div>
              </div>
            ) : (
              <p>Your request is not yet accepted or pending approval.</p>
            )
          ) : (
            // No coach assigned, show the list of available coaches
            <div className="available-coaches">
              {coaches.length > 0 ? (
                coaches.map((coach) => (
                  <div className="coach-card" key={coach.coachId}>
                    <img
                      src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-profile.jpg'}
                      alt="coach"
                    />
                    <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>

                    <textarea
                      placeholder="Add remarks (optional)"
                      value={remarks[coach.coachId] || ''}
                      onChange={(e) => handleRemarksChange(e, coach.coachId)} 
                    />
                    <button onClick={() => handleRequestAssistance(coach.coachId)}>
                      Request Assistance
                    </button>
                  </div>
                ))
              ) : (
                <p>No coaches available at the moment.</p>
              )}
            </div>
          )}
        </>
      )}

  */}


        {/*
  {currentSection === 'coach' && (
  <>
    <h3>All Coaches</h3>

    {assistanceDetails.status === 'Accepted' ? (
      // Show details of the assigned coach
      <div className="coach-details">
        <h4>Coach Profile</h4>
        <p><strong>Name:</strong> {assistanceDetails.coach.firstName}</p>
        <p><strong>Achievements:</strong> {assistanceDetails.coach.achievements}</p>

        <div>
          <h4>Diet Plan</h4>
          <p>{assistanceDetails.coach.dietPlan || 'No diet plan assigned yet.'}</p>
        </div>

        <div>
          <h4>Weight Plan</h4>
          <p>{assistanceDetails.coach.weightPlan || 'No weight plan assigned yet.'}</p>
        </div>

        <div>
          <h4>Remarks</h4>
          <textarea
            placeholder="Add remarks about your coach (optional)"
            value={assistanceDetails.remarks || ''}
          />
        </div>
      </div>
    ) : (
      // No accepted coach, show list of all available coaches
      <div className="available-coaches">
        {coaches.length > 0 ? (
          coaches.map((coach) => (
            <div className="coach-card" key={coach.coachId}>
              <img
                src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-profile.jpg'}
                alt="coach"
              />
              <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>

              <button onClick={() => openDialogBox(coach.coachId)}>
                Request Assistance
              </button>
            </div>
          ))
        ) : (
          <p>No coaches available at the moment.</p>
        )}
      </div>
    )}

    {showDialog && (
      <div className="dialog-box">
        <div className="dialog-content">
          <h4>Request Assistance</h4>
          <textarea
            placeholder="Add remarks (optional)"
            value={remarks[selectedCoachId] || ''}
            onChange={(e) => handleRemarksChange(e, selectedCoachId)}
          />
          <button onClick={() => handleRequestAssistance(selectedCoachId)}>
            Submit Request
          </button>
          <button onClick={closeDialogBox}>
            Cancel
          </button>
        </div>
      </div>
    )}
  </>
)} */}


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
              <strong>Plan ID:</strong> {coachWeightPlan.planId}
            </p>
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
                <p>
                  <strong>Current Weight:</strong> {diet.currentWeight} kg
                </p>
                <p>
                  <strong>Weight Plan ID:</strong> {diet.weightPlanId}
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
            {!assistanceRequest && (
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


        {/*
   {currentSection === 'coach' && (
  <>
    <h3>All Coaches</h3>

    {athlete.coachId ? (
      // Athlete has a coach, show their details if the request status is accepted or pending
      isRequestAcceptedOrPending ? (
        <div className="coach-details">
          <h4>Coach Profile</h4>
          <p><strong>Name:</strong> {athlete.coach.name}</p>
          <p><strong>Achievements:</strong> {athlete.coach.achievements}</p>

          <div>
            <h4>Diet Plan</h4>
            <p>{athlete.coach.dietPlan || 'No diet plan assigned yet.'}</p>
          </div>

          <div>
            <h4>Weight Plan</h4>
            <p>{athlete.coach.weightPlan || 'No weight plan assigned yet.'}</p>
          </div>

          <div>
            <h4>Remarks</h4>
            <textarea
              placeholder="Add remarks about your coach (optional)"
              value={athlete.coachRemarks || ''}
            />
          </div>
        </div>
      ) : (
        <p>Your request is not yet accepted or pending approval.</p>
      )
    ) : (
      // No coach assigned, show the list of available coaches
      <div className="available-coaches">
        {coaches.length > 0 ? (
          coaches.map((coach) => (
            <div className="coach-card" key={coach.coachId}>
              <img
                src={coach.imageBase64 ? `data:image/jpeg;base64,${coach.imageBase64}` : '/default-profile.jpg'}
                alt="coach"
              />
              <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>

              <button onClick={() => openDialogBox(coach.coachId)}>
                Request Assistance
              </button>
            </div>
          ))
        ) : (
          <p>No coaches available at the moment.</p>
        )}
      </div>
    )}

    {showDialog && (
      
      <div className="dialog-box">
        <div className="dialog-content">
          <h4>Request Assistance</h4>
          <textarea
            placeholder="Add remarks (optional)"
            value={remarks[selectedCoachId] || ''}
            onChange={(e) => handleRemarksChange(e, selectedCoachId)}
          />
          <button onClick={() => handleRequestAssistance(selectedCoachId)}>
            Submit Request
          </button>
          <button onClick={closeDialogBox}>
            Cancel
          </button>
        </div>
      </div>
      
    )}
  </>
)} 
*/}

        {/*


{currentSection === 'coach' && (
  <div className="coach-section">
    <h3>All coaches</h3>
    {!athlete.coachId ? (
      <div className="available-coaches">
        {coaches.length > 0 ? (
          coaches.map((coach) => (
            <div className="coach-card" key={coach.coachId}>
              <p><strong>Name:</strong> {coach.firstName} {coach.lastName}</p>
              <button onClick={() => handleRequestAssistance(coach.coachId)}>
                Request Assistance
              </button>
            </div>
          ))
        ) : (
          <p>No coaches available at the moment.</p>
        )}
      </div>
    ) : athlete.requestPending ? (
      <p>Your request is pending approval from the coach.</p>
    ) : (
      <div className="coach-details">
        <h4>Coach Profile</h4>
        <p><strong>Name:</strong> {athlete.coach.name}</p>
        <p><strong>Achievements:</strong> {athlete.coach.achievements}</p>
        <div>
          <h4>Diet Plan</h4>
          <p>{athlete.coach.dietPlan || 'No diet plan assigned yet.'}</p>
        </div>
        <div>
          <h4>Weight Plan</h4>
          <p>{athlete.coach.weightPlan || 'No weight plan assigned yet.'}</p>
        </div>
      </div>
    )}  
  </div>
)} */}

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