// // import React, { useState, useEffect  } from "react";
// // import { Button, Modal, Table, Form } from "react-bootstrap";
// // import "./CoachDashboard.css"; // Import CSS file
// // import axios from "axios";

// // const CoachDashboard = ({
// //   // coachProfile,
// //   // achievements,
// //   // assistanceRequests,
// //   // athletes,
// //   // handleProfileUpdate,
// //   // handleAddAchievement,
// //   // handleAcceptRequest,
// //   // handleRejectRequest,
// //   // fetchAthleteProfile,
// //   // fetchWeightPlan,
// //   // currentAthleteProfile,
// //   // weightPlan,
// //   // handleInputChange,
// //   // setUpdatedProfile,
// //   // updatedProfile,
// //   // setNewAchievement,
// //   // setShowEditProfileModal,
// //   // showEditProfileModal,
// //   // setShowAchievementModal,
// //   // showAchievementModal,
// //   // setShowAthleteProfileModal,
// //   // showAthleteProfileModal,
// //   // setShowWeightPlanModal,
// //   // showWeightPlanModal,
// // }) => {
// //   const [currentSection, setCurrentSection] = useState("profile");


// //   // States for managing data
// //   const [coachProfile, setCoachProfile] = useState({});
// //   const [achievements, setAchievements] = useState([]);
// //   const [assistanceRequests, setAssistanceRequests] = useState([]);
// //   const [athletes, setAthletes] = useState([]);
// //   const [weightPlan, setWeightPlan] = useState(null);

// //   // Modal visibility states
// //   const [showEditProfileModal, setShowEditProfileModal] = useState(false);
// //   const [showAchievementModal, setShowAchievementModal] = useState(false);
// //   const [showAthleteProfileModal, setShowAthleteProfileModal] = useState(false);
// //   const [showWeightPlanModal, setShowWeightPlanModal] = useState(false);

// //   // State for storing form data
// //   const [updatedProfile, setUpdatedProfile] = useState({});
// //   const [newAchievement, setNewAchievement] = useState({});
// //   const [currentAthleteProfile, setCurrentAthleteProfile] = useState(null);

// //   // Fetch data from API on component mount
// //   useEffect(() => {
// //     fetchCoachData();
// //     fetchAchievements();
// //     fetchAssistanceRequests();
// //     fetchAthletes();
// //   }, []);

// //   // Fetch coach profile data
// //   const fetchCoachData = async () => {
// //     try {
// //       const response = await axios.get("/coach/profile", {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setCoachProfile(response.data);
// //     } catch (error) {
// //       console.error("Error fetching coach profile:", error);
// //     }
// //   };

// //   // Fetch achievements
// //   const fetchAchievements = async () => {
// //     try {
// //       const response = await axios.get("/coach/achievements", {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setAchievements(response.data);
// //     } catch (error) {
// //       console.error("Error fetching achievements:", error);
// //     }
// //   };

// //   // Fetch assistance requests
// //   const fetchAssistanceRequests = async () => {
// //     try {
// //       const response = await axios.get("/coach/getallassistancereq", {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setAssistanceRequests(response.data);
// //     } catch (error) {
// //       console.error("Error fetching assistance requests:", error);
// //     }
// //   };

// //   // Fetch accepted athletes
// //   const fetchAthletes = async () => {
// //     try {
// //       const response = await axios.get("/coach/athletes", {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setAthletes(response.data);
// //     } catch (error) {
// //       console.error("Error fetching athletes:", error);
// //     }
// //   };

// //   // Fetch athlete profile
// //   const fetchAthleteProfile = async (athleteId) => {
// //     try {
// //       const response = await axios.get(`/coach/athlete/${athleteId}`, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setCurrentAthleteProfile(response.data);
// //       setShowAthleteProfileModal(true);
// //     } catch (error) {
// //       console.error("Error fetching athlete profile:", error);
// //     }
// //   };

// //   // Fetch weight plan
// //   const fetchWeightPlan = async (athleteId) => {
// //     try {
// //       const response = await axios.get(`/weightplan/athlete/${athleteId}`, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setWeightPlan(response.data);
// //       setShowWeightPlanModal(true);
// //     } catch (error) {
// //       console.error("Error fetching weight plan:", error);
// //     }
// //   };

// //   // Update coach profile
// //   const handleProfileUpdate = async () => {
// //     try {
// //       await axios.put("/coach/profile", updatedProfile, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setShowEditProfileModal(false);
// //       fetchCoachData(); // Refresh profile data
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //     }
// //   };

// //   // Add a new achievement
// //   const handleAddAchievement = async () => {
// //     try {
// //       await axios.post("/coach/addAchievement", newAchievement, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       setShowAchievementModal(false);
// //       fetchAchievements(); // Refresh achievements data
// //     } catch (error) {
// //       console.error("Error adding achievement:", error);
// //     }
// //   };

// //   // Accept assistance request
// //   const handleAcceptRequest = async (requestId) => {
// //     try {
// //       await axios.put(`/assistance/${requestId}/accept`, null, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       fetchAssistanceRequests(); // Refresh requests data
// //     } catch (error) {
// //       console.error("Error accepting request:", error);
// //     }
// //   };

// //   // Reject assistance request
// //   const handleRejectRequest = async (requestId) => {
// //     try {
// //       await axios.put(`/assistance/${requestId}/reject`, null, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// //       });
// //       fetchAssistanceRequests(); // Refresh requests data
// //     } catch (error) {
// //       console.error("Error rejecting request:", error);
// //     }
// //   };

// //   // Handle input changes for forms
// //   const handleInputChange = (e, stateUpdater) => {
// //     const { name, value } = e.target;
// //     stateUpdater((prev) => ({ ...prev, [name]: value }));
// //   };





// //   return (
// //     <div className="coach-dashboard container mt-5">
// //       <header className="dashboard-header py-3">
// //         <h1>Welcome, {coachProfile.firstName || "Coach" } { coachProfile.lastName || "Coach"}!</h1>
// //         <nav>
// //           <Button
// //             variant={currentSection === "profile" ? "primary" : "light"}
// //             onClick={() => setCurrentSection("profile")}
// //             className="mx-2"
// //           >
// //             Profile
// //           </Button>
// //           <Button
// //             variant={currentSection === "achievements" ? "primary" : "light"}
// //             onClick={() => setCurrentSection("achievements")}
// //             className="mx-2"
// //           >
// //             Achievements
// //           </Button>
// //           <Button
// //             variant={currentSection === "requests" ? "primary" : "light"}
// //             onClick={() => setCurrentSection("requests")}
// //             className="mx-2"
// //           >
// //             Assistance Requests
// //           </Button>
// //           <Button
// //             variant={currentSection === "athletes" ? "primary" : "light"}
// //             onClick={() => setCurrentSection("athletes")}
// //             className="mx-2"
// //           >
// //             Athletes
// //           </Button>
// //         </nav>
// //       </header>

// //       {/* Profile Section */}
// //       {currentSection === "profile" && (
// //         <div className="profile-section my-4">
// //           <h3>Your Profile</h3>
// //           <img
// //               src={coachProfile.imageBase64 ? `data:image/jpeg;base64,${coachProfile.imageBase64}` : '/default-profile.jpg'}
// //               alt="Athlete"
// //               style={{
// //                 width: '100%',
// //                 maxWidth: '400px', // Increase image maxWidth for a larger image
// //                 borderRadius: '8px',
// //                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
// //               }}
// //             />
// //           <p>Email: {coachProfile.email}</p>
// //           <p>Specialization: {coachProfile.specialization}</p>
// //           <Button
// //             variant="primary"
// //             onClick={() => {
// //               setUpdatedProfile(coachProfile);
// //               setShowEditProfileModal(true);
// //             }}
// //           >
// //             Edit Profile
// //           </Button>
// //         </div>
// //       )}

// //       {/* Achievements Section */}
// //       {currentSection === "achievements" && (
// //         <div className="achievements-section my-4">
// //           <h3>Your Achievements</h3>
// //           <ul>
// //             {achievements.map((achievement, index) => (
// //               <li key={index}>
// //                 {achievement.title} - {achievement.description}
// //               </li>
// //             ))}
// //           </ul>
// //           <Button variant="success" onClick={() => setShowAchievementModal(true)}>
// //             Add Achievement
// //           </Button>
// //         </div>
// //       )}

// //       {/* Assistance Requests Section */}
// //       {currentSection === "requests" && (
// //         <div className="assistance-requests-section my-4">
// //           <h3>Assistance Requests</h3>
// //           <Table striped bordered hover>
// //             <thead>
// //               <tr>
// //                 <th>#</th>
// //                 <th>Request By</th>
// //                 <th>Message</th>
// //                 <th>Status</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {assistanceRequests.map((request, index) => (
// //                 <tr key={request.id}>
// //                   <td>{index + 1}</td>
// //                   <td>{request.requestedBy}</td>
// //                   <td>{request.message}</td>
// //                   <td>{request.status}</td>
// //                   <td>
// //                     {request.status === "Pending" && (
// //                       <>
// //                         <Button
// //                           variant="success"
// //                           onClick={() => handleAcceptRequest(request.id)}
// //                           className="me-2"
// //                         >
// //                           Accept
// //                         </Button>
// //                         <Button
// //                           variant="danger"
// //                           onClick={() => handleRejectRequest(request.id)}
// //                         >
// //                           Reject
// //                         </Button>
// //                       </>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </div>
// //       )}

// //       {/* Athletes Section */}
// //       {currentSection === "athletes" && (
// //         <div className="athletes-section my-4">
// //           <h3>Your Athletes</h3>
// //           <Table striped bordered hover>
// //             <thead>
// //               <tr>
// //                 <th>#</th>
// //                 <th>Name</th>
// //                 <th>Email</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {athletes.map((athlete, index) => (
// //                 <tr key={athlete.id}>
// //                   <td>{index + 1}</td>
// //                   <td>{athlete.name}</td>
// //                   <td>{athlete.email}</td>
// //                   <td>
// //                     <Button
// //                       variant="info"
// //                       onClick={() => fetchAthleteProfile(athlete.id)}
// //                       className="me-2"
// //                     >
// //                       View Profile
// //                     </Button>
// //                     <Button
// //                       variant="secondary"
// //                       onClick={() => fetchWeightPlan(athlete.id)}
// //                     >
// //                       View Weight Plan
// //                     </Button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </Table>
// //         </div>
// //       )}

// //       {/* Modals (Reuse existing modal code here) */}
// //     </div>
// //   );
// // };

// // export default CoachDashboard;


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Typography, AppBar, Table,Button, Toolbar, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , DialogTitle ,DialogContent, Dialog } from "@mui/material";
// // import TextField from '@mui/material/TextField';



// // const CoachDashboard = () => {
// //   const navigate = useNavigate();
// //   const [currentSection, setCurrentSection] = useState("profile"); // Default section is Profile
// //   const [coachProfile, setCoachProfile] = useState(null);
// //   const [requests, setRequests] = useState([]);
// //   const [acceptedAthletes, setAcceptedAthletes] = useState([]);
// //   const [events, setEvents] = useState([]);
// //   const [selectedAthlete, setSelectedAthlete] = useState(null);
// //   const [dietPlan, setDietPlan] = useState("");
// // const [newMessage, setNewMessage] = React.useState("");

// //   const [achievementFormVisible, setAchievementFormVisible] = useState(false);
// //   const [editingAchievement, setEditingAchievement] = useState(null);
// // const [weightPlanModalOpen, setWeightPlanModalOpen] = useState(false);
// // const [startWeight, setStartWeight] = useState("");
// // const [targetWeight, setTargetWeight] = useState("");
// // const [dailyCalorieGoal, setDailyCalorieGoal] = useState("");
// // const [preference, setPreference] = useState("");



// //   const [achievements, setAchievements] = useState([]);

// //   const [weightPlan, setWeightPlan] = useState("");
// //   const [athleteMessages, setAthleteMessages] = useState([]);
// //   const [replyMessage, setReplyMessage] = useState("");
// //   const [editingProfile, setEditingProfile] = useState(false);
// //   const [profileModalOpen, setProfileModalOpen] = useState(false);
// //   // State for the Add Achievement Modal
// // const [addingAchievement, setAddingAchievement] = useState(false);

// // // State to store new achievement data
// // const [newAchievement, setNewAchievement] = useState({
// //   title: "",
// //   description: "",
// //   achievedDate: "",
// // });




// //   const [dietPlanData, setDietPlanData] = useState({
// //     date: '',
// //     calories: '',
// //     currentWeight: '',
// //     weightPlanId: null, 
// //   });
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const [updatedProfile, setUpdatedProfile] = useState({
// //     firstName: "",
// //     lastName: "",
// //   });
// //   const [newImage, setNewImage] = useState(null);
// //   const token = localStorage.getItem("token"); // Fetch token from localStorage

// //   useEffect(() => {
// //     // Load profile data on initial load
// //     fetchCoachProfile();
// //     fetchRequests();
// //     fetchAcceptedAthletes();  
// //     fetchEvents();
// //     fetchAchievements();  

// //   }, []);


// //   const fetchAchievements = async () => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       const response = await fetch("/coach/achievements", {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}` ,

// //         },
// //       });

// //       if (response.ok) {
// //         const data = await response.json();

// //         setAchievements(data);

// //       } else {
// //         console.error("Failed to fetch achievements.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching achievements:", error);
// //     }
// //   };


// //   // Function to handle saving an achievement
// // const handleAddAchievement = async () => {
// //   try {
// //     const token = localStorage.getItem("token");

// //     const response = await fetch("/coach/addAchievement", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //          Authorization: `Bearer ${token}` ,

// //       },
// //       body: JSON.stringify(newAchievement),

// //     });

// //     if (response.ok) {
// //       const savedAchievement = await response.json();
// //       alert("Achievement added successfully!");
// //       setAddingAchievement(false);
// //       // Optionally update the UI with the new achievement
// //     } else {
// //       alert("Failed to add achievement!");
// //     }
// //   } catch (error) {
// //     console.error("Error adding achievement:", error);
// //     alert("An error occurred while adding the achievement!");
// //   }
// // };









// //   // Fetch Coach Profile
// //   const handleCloseProfileModal = () => {
// //     setProfileModalOpen(false);
// //     setSelectedAthlete(null);
// //   };


// // {/*
// //   const handleAddDietPlan = () => {
// //     // Prompt the user to add a diet plan (can be replaced with a form/modal)
// //     const dietPlan = prompt('Enter your diet plan:');
// //     if (dietPlan) {
// //       setSelectedAthlete(prevState => ({
// //         ...prevState,
// //         dietPlan,
// //       }));
// //     }
// //   };
// //   */}

// //   // Handle the update of the existing diet plan
// //   const handleUpdateDietPlan = () => {
// //     const dietPlan = prompt('Update your diet plan:');
// //     if (dietPlan) {
// //       setSelectedAthlete(prevState => ({
// //         ...prevState,
// //         dietPlan,
// //       }));
// //     }
// //   };

// //   // Handle the addition of a new weight plan
// //   const handleAddWeightPlan = () => {
// //     const targetWeight = prompt('Enter your target weight (kg):');
// //     if (targetWeight) {
// //       setSelectedAthlete(prevState => ({
// //         ...prevState,
// //         targetWeight,
// //       }));
// //     }
// //   };

// //   // Handle the update of the existing weight plan
// //   const handleUpdateWeightPlan = () => {
// //     const targetWeight = prompt('Update your target weight (kg):');
// //     if (targetWeight) {
// //       setSelectedAthlete(prevState => ({
// //         ...prevState,
// //         targetWeight,
// //       }));
// //     }
// //   };

// //   const handleSendMessage = () => {
// //     // API call to send a message
// //   };


// //   const handleAddDietPlan = () => {
// //     // API call to submit a new diet plan
// //   };
// //   {/*
// //   const handleAddWeightPlan = () => {
// //     // API call to submit a new weight plan
// //   };

// //   const handleSendMessage = () => {
// //     // API call to send a message
// //   };

// //   const handleUpdateDietPlan = () => {
// //     // Logic to update the diet plan
// //     console.log("Updating diet plan...");
// //     // Make API call to update the diet plan
// //   };

// //   const handleUpdateWeightPlan = () => {
// //     // Logic to update the weight plan
// //     console.log("Updating weight plan...");
// //     // Make API call to update the weight plan
// //   };

// // */}



// // const handleOpenWeightPlanModal = (athlete) => {
// //   setSelectedAthlete(athlete);
// //   setWeightPlanModalOpen(true);
// // };

// // {/*

// // const handleSubmitWeightPlan = async(e) => {
// //   e.preventDefault(); // Prevent default form submission

// //   const formData = new FormData();
// //    // formData.append('athleteId',athleteId);
// //     formData.append('startWeight', startWeight);
// //     formData.append('targetWeight',targetWeight);
// //     formData.append('preference',preference);
// //     formData.append('dailyCalorieGoal',dailyCalorieGoal);
// //     const token = localStorage.getItem("token");

// //    try{

// //   // Call the backend API
// //      const response=await fetch(`/coach/createplan`, {

// //     method: "POST",
// //     body: formData,

// //     headers: { 
// //       Authorization: `Bearer ${token}` ,
// //     },
// //   });

// //       if (response.ok) {
// //         alert("Weight Plan created successfully!");
// //        // handleCloseWeightPlanModal();
// //        setStartWeight("");
// //       setTargetWeight("");
// //       setPreference("");
// //       setDailyCalorieGoal("");
// //       } else {
// //         alert('Failed to create Weight Plan.');
// //       }
// //     }
// //     catch(error) { console.error("Error:", error); }
// // };

// // */}
// // const handleSubmitWeightPlan = async () => {
// //   const formData = new FormData();
// //   formData.append('startWeight', startWeight);
// //   formData.append('targetWeight', targetWeight);
// //   formData.append('preference', preference);
// //   formData.append('dailyCalorieGoal', dailyCalorieGoal);

// //   try {
// //     const token = localStorage.getItem("token");
// //     const response = await fetch('/coach/createPlan', {
// //       method: 'POST',
// //       body: formData,
// //       headers: {
// //         "Authorization": `Bearer ${token}`,
// //       },
// //     });

// //     if (response.ok) {
// //       alert("Weight Plan created successfully!");
// //       // Reset the form fields
// //       setStartWeight("");
// //       setTargetWeight("");
// //       setPreference("");
// //       setDailyCalorieGoal("");
// //      // handleCloseWeightPlanModal(); // Close modal if applicable
// //     } else {
// //       //const errorData = await response.json();
// //   console.error("Failed to create Weight Plan:");
// //     }
// //   } catch (error) {
// //     console.error('Error creating Weight Plan:', error);
// //   }
// // };


// //   const handleViewDetails = (athlete) => {
// //     setSelectedAthlete(athlete);
// //     setProfileModalOpen(true);
// //   };

// //   const handleEditProfile = () => {
// //     setEditingProfile(true);
// //   };

// //   const fetchCoachProfile = async () => {
// //     try {
// //       const response = await fetch("/coach/profile", {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       const data = await response.json();
// //       setCoachProfile(data);
// //       setUpdatedProfile({
// //         firstName: data.firstName,
// //         lastName: data.lastName,
// //       });
// //     } catch (error) {
// //       console.error("Error fetching coach profile:", error);
// //     }
// //   };

// //   // Fetch Assistance Requests
// //   const fetchRequests = async () => {
// //     try {
// //       const response = await fetch("/coach/getallassistancereq", {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = await response.json();
// //       setRequests(data);
// //     } catch (error) {
// //       console.error("Error fetching requests:", error);
// //     }
// //   };

// //   // Fetch Accepted Athletes
// //   const fetchAcceptedAthletes = async () => {
// //     try {
// //       const response = await fetch("/coach/accepted-athletes", {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = await response.json();
// //       setAcceptedAthletes(data);
// //     } catch (error) {
// //       console.error("Error fetching accepted athletes:", error);
// //     }
// //   };

// //   // Fetch Events
// //   const fetchEvents = async () => {
// //     try {
// //       const response = await fetch("/coach/events", {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = await response.json();
// //       setEvents(data);
// //     } catch (error) {
// //       console.error("Error fetching events:", error);
// //     }
// //   };

// //   // Accept Assistance Request
// //   const handleAcceptRequest = async (requestId) => {
// //     try {
// //       const response = await fetch(`/coach/assistance/${requestId}/accept`, {
// //         method: "PUT",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       if (response.ok) {

// //         setRequests((prevRequests) =>
// //           prevRequests.filter((req) => req.assistanceRequestId !== requestId)

// //         );
// //         fetchRequests();
// //         fetchAcceptedAthletes();
// //       } else {
// //         console.error("Error accepting request:", response.statusText);
// //       }
// //     } catch (error) {
// //       console.error("Error accepting request:", error);
// //     }
// //   };


// //   // Reject Assistance Request
// //   const handleRejectRequest = async (requestId) => {
// //     try {
// //       await fetch(`/coach/assistance/${requestId}/reject`, {
// //         method: "PUT",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setRequests((prevRequests) => prevRequests.filter((req) => req.assistanceRequestId !== requestId));

// //       fetchRequests();
// //     } catch (error) {
// //       console.error("Error rejecting request:", error);
// //     }
// //   };

// //   // Save Profile Changes
// //   const handleSaveProfile = async () => {
// //     const formData = new FormData();
// //     formData.append("firstName", updatedProfile.firstName);
// //     formData.append("lastName", updatedProfile.lastName);
// //     if (newImage) formData.append("imageFile", newImage);

// //     try {
// //       const response = await fetch("/coach/profile", {
// //         method: "PUT",
// //         body: formData,
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       if (response.ok) {
// //         alert("Profile updated successfully!");
// //         setEditingProfile(false);
// //         fetchCoachProfile();
// //       } else {
// //         console.error("Error updating profile");
// //       }
// //     } catch (error) {
// //       console.error("Error saving profile:", error);
// //     }
// //   };




// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setDietPlanData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };


// //   {/*
// //   const handleAddDietPlan = async (athleteId) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const formData = new FormData();
// //       formData.append('athleteId', athleteId);
// //       formData.append('Date', date);
// //       formData.append('calories',calories);
// //       formData.append('currentWeight',currentWeight); 

// //       const response = await fetch('/athlete/dailyDiet', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           "Authorization": `Bearer ${token}`,

// //         },

// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to add diet plan');
// //       }

// //       // If the request is successful, reset the form and handle success
// //       setDietPlanData({
// //         date: '',
// //         calories: '',
// //         currentWeight: '',
// //         weightPlanId: null,
// //       });

// //       alert('Diet plan added successfully!');
// //     } catch (error) {
// //       setErrorMessage(error.message);
// //     }
// //   };
// //   */}
// //  {/*} const handleDeleteAchievement = async (achievementId) => {
// //     const confirmDelete = window.confirm('Are you sure you want to delete this achievement?');
// //     const token = localStorage.getItem("token");

// //     if (confirmDelete) {
// //       try {
// //         const response =  await fetch(`/coach/achievements/${achievementId}`, {
// //            method: 'DELETE' ,
// //            headers: { Authorization: `Bearer ${token}` },
// //           });
// //           if (!response.ok) throw new Error("Failed to delete Achievement.");
// //             const updatedAchievement = achievements.filter((achievement) => achievement.achievementId !== achievementId);
// //             setAchievements(updatedAchievement);
// //       } catch (error) {
// //         console.error('Error deleting achievement:', error);
// //       }
// //     }
// //   };

// //   */}


// //   const saveUpdatedAchievement = async (updatedAchievement) => {
// //     try {
// //       const token = localStorage.getItem("token");
// //     //  Authorization: `Bearer ${token}` ,


// //       const response = await fetch(`/coach/achievements/${updatedAchievement.achievementId}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}` ,



// //          },
// //         body: JSON.stringify(updatedAchievement),
// //       });
// //       const data = await response.json();

// //       setAchievements((prev) =>
// //         prev.map((ach) => (ach.achievementId === data.achievementId ? data : ach))
// //       );
// //       setEditingAchievement(null);
// //     } catch (error) {
// //       console.error('Error updating achievement:', error);
// //     }
// //   };


// //   const handleUpdateAchievement = (achievement) => {
// //     setEditingAchievement(achievement);
// //   };







// //   return (
// //     <div className="coach-dashboard">
// //       <nav>
// //         <button onClick={() => setCurrentSection("profile")}>Profile</button>
// //         <button onClick={() => setCurrentSection("requests")}>Requests</button>
// //         <button onClick={() => setCurrentSection("athletes")}>Athletes</button>
// //         <button onClick={() => navigate("/*")}>Logout</button>
// //       </nav>

// //       {/* Coach Profile Section 
// //       {currentSection === "profile" && (
// //         <div>
// //           {coachProfile && (
// //             <div>
// //               <img
// //                 src={
// //                   coachProfile.imageBase64
// //                     ? `data:image/jpeg;base64,${coachProfile.imageBase64}`
// //                     : "/default-profile.jpg"
// //                 }
// //                 alt="Coach"
// //               />
// //               <p>
// //                 {coachProfile.firstName} {coachProfile.lastName}
// //               </p>
// //               <button onClick={() => setEditingProfile(true)}>Edit Profile</button>
// //             </div>
// //           )}

// //           {editingProfile && (
// //             <div className="edit-profile-form">
// //               <h2>Edit Profile</h2>
// //               <form onSubmit={(e) => e.preventDefault()}>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="firstName"
// //                     value={updatedProfile.firstName}
// //                     onChange={(e) =>
// //                       setUpdatedProfile({ ...updatedProfile, firstName: e.target.value })
// //                     }
// //                     placeholder="First Name"
// //                   />
// //                 </label>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="lastName"
// //                     value={updatedProfile.lastName}
// //                     onChange={(e) =>
// //                       setUpdatedProfile({ ...updatedProfile, lastName: e.target.value })
// //                     }
// //                     placeholder="Last Name"
// //                   />
// //                 </label>
// //                 <label>
// //                   <input
// //                     type="file"
// //                     onChange={(e) => setNewImage(e.target.files[0])}
// //                   />
// //                 </label>
// //                 <button onClick={handleSaveProfile}>Save</button>
// //                 <button onClick={() => setEditingProfile(false)}>Cancel</button>
// //               </form>
// //             </div>
// //           )}
// //         </div>
// //       )} */}
// //       {/* Coach Profile Section */}
// // {currentSection === "profile" && (
// //   <div>
// //     {coachProfile && (
// //       <div>
// //         <img
// //           src={
// //             coachProfile.imageBase64
// //               ? `data:image/jpeg;base64,${coachProfile.imageBase64}`
// //               : "/default-profile.jpg"
// //           }
// //           alt="Coach"
// //         />
// //         <p>
// //           {coachProfile.firstName} {coachProfile.lastName}
// //         </p>


// // {achievements && achievements.length > 0 && (
// //       <div className="achievements-section">
// //         <h2><strong>Achievements</strong></h2>
// //         <ul>
// //           {achievements.map((achievement) => (
// //             <li key={achievements.achievementId}>
// //               <h3>{achievement.title}</h3>
// //               <p>{achievement.description}</p>
// //               <p>
// //                 <strong>Date:</strong> {new Date(achievement.achievedDate).toLocaleDateString()}
// //               </p>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     )}

// // <button onClick={() => setEditingProfile(true)}>Edit Profile</button>
// //         <button onClick={() => setAddingAchievement(true)}>Add Achievement</button>
// //       </div>
// //     )}


// // {/*
// // {achievements && achievements.length > 0 && (
// //   <div className="achievements-section">
// //     <h2><strong>Achievements</strong></h2>
// //     <ul>
// //       {achievements.map((achievement) => (
// //         <li key={achievement.achievementId}>
// //           <h3>{achievement.title}</h3>
// //           <p>{achievement.description}</p>
// //           <p>
// //             <strong>Date:</strong> {new Date(achievement.achievedDate).toLocaleDateString()}
// //           </p>
// //           <button onClick={() => handleUpdateAchievement(achievement)}>Update</button>
// //           <button onClick={() => handleDeleteAchievement(achievement.achievementId)}>Delete</button>
// //         </li>
// //       ))}
// //     </ul>
// //   </div>
// // )}
// // <button onClick={() => setEditingProfile(true)}>Edit Profile</button>
// // <button onClick={() => setAddingAchievement(true)}>Add Achievement</button>
// // </div>
// //     )}


// //     */}
// //     {editingProfile && (
// //       <div className="edit-profile-form">
// //         <h2>Edit Profile</h2>
// //         <form onSubmit={(e) => e.preventDefault()}>
// //           <label>
// //             <input
// //               type="text"
// //               name="firstName"
// //               value={updatedProfile.firstName}
// //               onChange={(e) =>
// //                 setUpdatedProfile({ ...updatedProfile, firstName: e.target.value })
// //               }
// //               placeholder="First Name"
// //             />
// //           </label>
// //           <label>
// //             <input
// //               type="text"
// //               name="lastName"
// //               value={updatedProfile.lastName}
// //               onChange={(e) =>
// //                 setUpdatedProfile({ ...updatedProfile, lastName: e.target.value })
// //               }
// //               placeholder="Last Name"
// //             />
// //           </label>
// //           <label>
// //             <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
// //           </label>
// //           <button onClick={handleSaveProfile}>Save</button>
// //           <button onClick={() => setEditingProfile(false)}>Cancel</button>
// //         </form>
// //       </div>
// //     )}

// //     {/* Add Achievement Section */}
// //     {addingAchievement && (
// //       <div className="add-achievement-form">
// //         <h2>Add Achievement</h2>
// //         <form
// //           onSubmit={(e) => {
// //             e.preventDefault();
// //             handleAddAchievement();
// //           }}
// //         >
// //           <label>
// //             Title:
// //             <input
// //               type="text"
// //               value={newAchievement.title}
// //               onChange={(e) =>
// //                 setNewAchievement({ ...newAchievement, title: e.target.value })
// //               }
// //               placeholder="Achievement Title"
// //               required
// //             />
// //           </label>
// //           <label>
// //             Description:
// //             <textarea
// //               value={newAchievement.description}
// //               onChange={(e) =>
// //                 setNewAchievement({ ...newAchievement, description: e.target.value })
// //               }
// //               placeholder="Description"
// //               required
// //             />
// //           </label>
// //           <label>
// //             Achieved Date:
// //             <input
// //               type="date"
// //               value={newAchievement.achievedDate}
// //               onChange={(e) =>
// //                 setNewAchievement({ ...newAchievement, achievedDate: e.target.value })
// //               }
// //               required
// //             />
// //           </label>
// //           <button type="submit">Save</button>
// //           <button onClick={() => setAddingAchievement(false)}>Cancel</button>
// //         </form>
// //       </div>
// //     )}
// //   </div>
// // )}
// // {/*

// // {editingAchievement && (
// //   <div className="modal">
// //     <div className="modal-content">
// //       <h2>Update Achievement</h2>
// //       <form
// //         onSubmit={(e) => {
// //           e.preventDefault();
// //           const updatedAchievement = {
// //             ...editingAchievement,
// //             title: e.target.title.value,
// //             description: e.target.description.value,
// //             achievedDate: e.target.achievedDate.value,
// //           };
// //           saveUpdatedAchievement(updatedAchievement);
// //         }}
// //       >
// //         <input
// //           type="text"
// //           name="title"
// //           defaultValue={editingAchievement.title}
// //           placeholder="Title"
// //           required
// //         />
// //         <textarea
// //           name="description"
// //           defaultValue={editingAchievement.description}
// //           placeholder="Description"
// //           required
// //         ></textarea>
// //         <input
// //           type="date"
// //           name="achievedDate"
// //           defaultValue={new Date(editingAchievement.achievedDate).toISOString().split('T')[0]}
// //           required
// //         />
// //         <button type="submit">Save Changes</button>
// //         <button type="button" onClick={() => setEditingAchievement(null)}>Cancel</button>
// //       </form>
// //     </div>
// //   </div>
// // )}

// // */}




// // {/*
// // {currentSection === "profile" && (
// //         <div>
// //           {coachProfile && (
// //             <div>
// //               <img
// //                 src={
// //                   coachProfile.imageBase64
// //                     ? `data:image/jpeg;base64,${coachProfile.imageBase64}`
// //                     : "/default-profile.jpg"
// //                 }
// //                 alt="Coach"
// //               />
// //               <p>
// //                 {coachProfile.firstName} {coachProfile.lastName}
// //               </p>
// //               <button onClick={() => setEditingProfile(true)}>Edit Profile</button>

// //               <button onClick={() => setAchievementFormVisible(true)}>
// //                 Add Achievement
// //               </button>
// //             </div>
// //           )}

// //           {editingProfile && (
// //             <div className="edit-profile-form">
// //               <h2>Edit Profile</h2>
// //               <form onSubmit={(e) => e.preventDefault()}>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="firstName"
// //                     value={updatedProfile.firstName}
// //                     onChange={(e) =>
// //                       setUpdatedProfile({ ...updatedProfile, firstName: e.target.value })
// //                     }
// //                     placeholder="First Name"
// //                   />
// //                 </label>
// //                 <label>
// //                   <input
// //                     type="text"
// //                     name="lastName"
// //                     value={updatedProfile.lastName}
// //                     onChange={(e) =>
// //                       setUpdatedProfile({ ...updatedProfile, lastName: e.target.value })
// //                     }
// //                     placeholder="Last Name"
// //                   />
// //                 </label>
// //                 <label>
// //                   <input
// //                     type="file"
// //                     onChange={(e) => setNewImage(e.target.files[0])}
// //                   />
// //                 </label>
// //                 <button onClick={handleSaveProfile}>Save</button>
// //                 <button onClick={() => setEditingProfile(false)}>Cancel</button>
// //               </form>
// //             </div>
// //           )}


// //           {achievementFormVisible && (
// //             <div className="add-achievement-form">
// //               <h2>Add Achievement</h2>
// //               <form onSubmit={(e) => e.preventDefault()}>
// //                 <label>
// //                   Achievement Name:
// //                   <input
// //                     type="text"
// //                     value={newAchievement.name}
// //                     onChange={(e) =>
// //                       setNewAchievement({ ...newAchievement, name: e.target.value })
// //                     }
// //                     placeholder="Enter achievement name"
// //                   />
// //                 </label>
// //                 <label>
// //                   Description:
// //                   <textarea
// //                     value={newAchievement.description}
// //                     onChange={(e) =>
// //                       setNewAchievement({ ...newAchievement, description: e.target.value })
// //                     }
// //                     placeholder="Enter achievement description"
// //                   />
// //                 </label>
// //                 <button onClick={handleAddAchievement}>Save Achievement</button>
// //                 <button onClick={() => setAchievementFormVisible(false)}>Cancel</button>
// //               </form>
// //             </div>
// //           )}


// //           <div className="achievements-list">
// //             <h3>Achievements</h3>
// //             {achievements.length > 0 ? (
// //               achievements.map((achievement) => (
// //                 <div key={achievement.id} className="achievement-item">
// //                   <p><strong>{achievement.name}</strong></p>
// //                   <p>{achievement.description}</p>
// //                 </div>
// //               ))
// //             ) : (
// //               <p>No achievements added yet.</p>
// //             )}
// //           </div>
// //         </div>
// //       )}


// //     */}

// //       {/* Assistance Requests Section */}

// //       {/*}
// //       {currentSection === "requests" && (
// //         <div>
// //           <h3>Assistance Requests</h3>
// //           {requests.length > 0 ? (
// //             requests.map((req) => (
// //               <div key={req.id} className="request-card">
// //                 <h4>Athlete Details</h4>
// //                 <p><strong>Name:</strong> {req.athlete.firstName} {req.athlete.lastName}</p>
// //                 <div className="request-actions">
// //                   <button onClick={() => handleAcceptRequest(req.assistanceRequestId)}>Accept</button>
// //                   <button onClick={() => handleRejectRequest(req.assistanceRequestId)}>Reject</button>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <p>No assistance requests at the moment.</p>
// //           )}
// //         </div>
// //       )}
// //         */}

// // {/* Athletes Section */}

// // {/*
// // {currentSection === "athletes" && (
// //   <div>
// //     <h3>Accepted Athletes</h3>
// //     {requests.length > 0 ? (
// //       requests
// //         .filter((request) => request.status === "Accepted") // Filter requests with status "Accepted"
// //         .map((request) => (
// //           <div key={request.assistanceRequestId} className="athlete-card">
// //             <img
// //               src={
// //                 request.athlete.imageBase64
// //                   ? `data:image/jpeg;base64,${request.athlete.imageBase64}`
// //                   : "/default-profile.jpg"
// //               }
// //               alt={`${request.athlete.firstName} ${request.athlete.lastName}`}
// //             />
// //             <p>
// //               {request.athlete.firstName} {request.athlete.lastName}
// //             </p>
// //             <p><strong>Remarks:</strong> {request.remarks || "No remarks provided."}</p>
// //             <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
// //             <button onClick={() => handleViewDetails(request.athlete)}>View Details</button>
// //           </div>
// //         ))
// //     ) : (
// //       <p>No athletes currently accepted.</p>
// //     )}

// //     {selectedAthlete && (
// //         <Dialog
// //           open={profileModalOpen}
// //           onClose={handleCloseProfileModal}
// //           maxWidth="sm"
// //           fullWidth
// //         >
// //           <DialogTitle style={{ textAlign: "center" }}>Athlete Profile</DialogTitle>
// //           <DialogContent
// //             style={{
// //               justifyContent: "center",
// //               textAlign: "center",
// //             }}
// //           >
// //             <img
// //               src={
// //                 selectedAthlete.photoBase64
// //                   ? `data:image/jpeg;base64,${selectedAthlete.photoBase64}`
// //                   : "/default-profile.jpg"
// //               }

// //               style={{ paddingLeft: "3%", width: "400px", height: "220px" }}
// //             />
// //             <p></p>
// //             <Typography variant="h6">
// //               Name: {selectedAthlete.firstName} {selectedAthlete.lastName}
// //             </Typography>
// //             <Typography variant="h6">Gender: {selectedAthlete.gender}</Typography>
// //             <Typography variant="h6">Category: {selectedAthlete.category}</Typography>
// //             <Typography variant="h6">
// //               Height: {selectedAthlete.height} cm
// //             </Typography>
// //             <Typography variant="h6">
// //               Weight: {selectedAthlete.weight} kg
// //             </Typography>
// //             <Button
// //               onClick={handleCloseProfileModal}
// //               variant="contained"
// //               style={{ marginTop: "15px" }}
// //             >
// //               Close
// //             </Button>
// //           </DialogContent>
// //         </Dialog>
// //       )}
// //     </div>
// // )}

// // */}
// // {/* Athletes Section */}
// // {currentSection === "requests" && (
// //   <div>
// //     <h3>Pending Athlete Requests</h3>
// //     {requests.length > 0 ? (
// //       requests
// //         .filter((request) => request.status === "Pending")
// //         .map((request) => (
// //           <div key={request.assistanceRequestId} className="athlete-card">
// //             <img
// //               src={
// //                 request.athlete.imageBase64
// //                   ? `data:image/jpeg;base64,${request.athlete.imageBase64}`
// //                   : "/default-profile.jpg"
// //               }
// //               alt={`${request.athlete.firstName} ${request.athlete.lastName}`}
// //             />
// //             <p>
// //               {request.athlete.firstName} {request.athlete.lastName}
// //             </p>
// //             <p><strong>Remarks:</strong> {request.remarks || "No remarks provided."}</p>
// //             <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
// //             <button onClick={() => handleAcceptRequest(request.assistanceRequestId)}>Accept</button>
// //             <button onClick={() => handleRejectRequest(request.assistanceRequestId)}>Reject</button>
// //           </div>
// //         ))
// //     ) : (
// //       <p>No pending requests.</p>
// //     )}
// //   </div>
// // )}

// // {/* Accepted Athletes Section */}
// // {currentSection === "athletes" && (
// //   <div>
// //     <h3>Accepted Athletes</h3>
// //     {requests.length > 0 ? (
// //       requests
// //         .filter((request) => request.status === "Accepted") // Filter requests with status "Accepted"
// //         .map((request) => (
// //           <div key={request.assistanceRequestId} className="athlete-card">
// //             <img
// //               src={
// //                 request.athlete.imageBase64
// //                   ? `data:image/jpeg;base64,${request.athlete.imageBase64}`
// //                   : "/default-profile.jpg"
// //               }
// //               alt={`${request.athlete.firstName} ${request.athlete.lastName}`}
// //             />
// //             <p>
// //               {request.athlete.firstName} {request.athlete.lastName}
// //             </p>
// //             <p><strong>Remarks:</strong> {request.remarks || "No remarks provided."}</p>
// //             <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
// //             <button onClick={() => handleViewDetails(request.athlete)}>View Details</button>
// //             <button onClick={() => handleOpenWeightPlanModal(request.athlete)}>
// //               Create Weight Plan
// //             </button>
// //           </div>
// //         ))
// //     ) : (
// //       <p>No athletes currently accepted.</p>
// //     )}


// //     {/* Weight Plan Modal */}
// //     {selectedAthlete && (
// //       <Dialog
// //         open={weightPlanModalOpen}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle>Create Weight Plan</DialogTitle>
// //         <DialogContent>
// //          <form onSubmit={handleSubmitWeightPlan}>
// //             <TextField
// //               label="Start Weight"
// //               type="number"
// //               required
// //               fullWidth
// //               value={startWeight}
// //               onChange={(e) => setStartWeight(e.target.value)}
// //               margin="normal"
// //             />
// //             <TextField
// //               label="Target Weight"
// //               type="number"
// //               required
// //               fullWidth
// //               value={targetWeight}
// //               onChange={(e) => setTargetWeight(e.target.value)}
// //               margin="normal"
// //             />
// //             <TextField
// //               label="Daily Calorie Goal"
// //               type="number"
// //               required
// //               fullWidth
// //               value={dailyCalorieGoal}
// //               onChange={(e) => setDailyCalorieGoal(e.target.value)}
// //               margin="normal"
// //             />
// //             <TextField
// //               label="Preference"
// //               fullWidth
// //               value={preference}
// //               onChange={(e) => setPreference(e.target.value)}
// //               margin="normal"
// //             />
// //             <Button type="submit" variant="contained" color="primary">
// //               Submit
// //             </Button>
// //           </form>


// //           {/*

// // <form onSubmit={(e) => e.preventDefault()}>
// //         <label>
// //           <input
// //             type="number"
// //             name="startWeight"
// //             value={startWeight}
// //             onChange={(e) => setStartWeight(e.target.value)}
// //             placeholder=" "
// //           />
// //           <span>Start Weight (kg)</span>
// //         </label>

// //         <label>
// //           <input
// //             type="number"
// //             name="targetWeight"
// //             value={targetWeight}
// //             onChange={(e) => setTargetWeight(e.target.value)}
// //             placeholder=" "
// //           />
// //           <span>Target Weight (kg)</span>
// //         </label>

// //         <label>
// //           <input
// //             type="text"
// //             name="preference"
// //             value={preference}
// //             onChange={(e) => setPreference(e.target.value)}
// //             placeholder=" "
// //           />
// //           <span>Diet Preference</span>
// //         </label>

// //         <label>
// //           <input
// //             type="number"
// //             name="dailyCalorieGoal"
// //             value={dailyCalorieGoal}
// //             onChange={(e) => setDailyCalorieGoal(e.target.value)}
// //             placeholder=" "
// //           />
// //           <span>Daily Calorie Goal</span>
// //         </label>

// //         <div className="modal-actions">
// //           <button type="button" onClick={handleSubmitWeightPlan} className="btn2">
// //             Save
// //           </button>

// //         </div>
// //       </form>

// //       */}

// //         </DialogContent>
// //       </Dialog>
// //     )}


// //     {/* Athlete Profile Dialog */}
// //     {selectedAthlete && (
// //       <Dialog
// //         open={profileModalOpen}
// //         onClose={handleCloseProfileModal}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle style={{ textAlign: "center" }}>Athlete Profile</DialogTitle>
// //         <DialogContent
// //           style={{
// //             justifyContent: "center",
// //             textAlign: "center",
// //           }}
// //         >
// //           <img
// //             src={
// //               selectedAthlete.photoBase64
// //                 ? `data:image/jpeg;base64,${selectedAthlete.photoBase64}`
// //                 : "/default-profile.jpg"
// //             }
// //             alt="Athlete"
// //             style={{ paddingLeft: "3%", width: "400px", height: "220px" }}
// //           />
// //           <Typography variant="h6">
// //             Name: {selectedAthlete.firstName} {selectedAthlete.lastName}
// //           </Typography>
// //           <Typography variant="h6">Gender: {selectedAthlete.gender}</Typography>
// //           <Typography variant="h6">Category: {selectedAthlete.category}</Typography>



// // <div>

// // </div>
// //           <Button
// //             onClick={handleCloseProfileModal}
// //             variant="contained"
// //             style={{ marginTop: "15px" }}
// //           >
// //             Close
// //           </Button>
// //         </DialogContent>
// //       </Dialog>
// //     )}
// //   </div>
// // )}




// // </div>
// // );

// // }

// // export default CoachDashboard; 


// import React, { useState, useEffect } from "react";
// import { Button, Modal, Table, Form } from "react-bootstrap";
// import "./CoachDashboard.css"; // Import CSS file
// import axios from "axios";
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';


// const CoachDashboard = ({
//   // coachProfile,
//   // achievements,
//   // assistanceRequests,
//   // athletes,
//   // handleProfileUpdate,
//   // handleAddAchievement,
//   // handleAcceptRequest,
//   // handleRejectRequest,
//   // fetchAthleteProfile,
//   // fetchWeightPlan,
//   // currentAthleteProfile,
//   // weightPlan,
//   // handleInputChange,
//   // setUpdatedProfile,
//   // updatedProfile,
//   // setNewAchievement,
//   // setShowEditProfileModal,
//   // showEditProfileModal,
//   // setShowAchievementModal,
//   // showAchievementModal,
//   // setShowAthleteProfileModal,
//   // showAthleteProfileModal,
//   // setShowWeightPlanModal,
//   // showWeightPlanModal,
// }) => {
//   const [currentSection, setCurrentSection] = useState("profile");


//   // States for managing data
//   const [coachProfile, setCoachProfile] = useState({});
//   const [achievements, setAchievements] = useState([]);
//   const [assistanceRequests, setAssistanceRequests] = useState([]);
//   const [athletes, setAthletes] = useState([]);
//   const [weightPlan, setWeightPlan] = useState(null);
//   const [selectedAthlete, setSelectedAthlete] = useState(null); // Stores the selected athlete details
//   const [profileModalOpen, setProfileModalOpen] = useState(false); // Tracks modal visibility


//   // Modal visibility states
//   const [showEditProfileModal, setShowEditProfileModal] = useState(false);
//   const [showAchievementModal, setShowAchievementModal] = useState(false);
//   const [showAthleteProfileModal, setShowAthleteProfileModal] = useState(false);
//   const [showWeightPlanModal, setShowWeightPlanModal] = useState(false);
//   const [newImage, setNewImage] = useState(null);


//   // State for storing form data
//   const [updatedProfile, setUpdatedProfile] = useState({});
//   const [newAchievement, setNewAchievement] = useState({});
//   const [currentAthleteProfile, setCurrentAthleteProfile] = useState(null);

//   // Fetch data from API on component mount



//   const [weightPlanModalOpen, setWeightPlanModalOpen] = useState(false);
//   const [selectedAthleteId, setSelectedAthleteId] = useState(null);
//   const [weightPlanData, setWeightPlanData] = useState({
//     startWeight: "",
//     targetWeight: "",
//     preference: "",
//     dailyCalorieGoal: "",
//     dailyDiets: "",
//   });


//   const openWeightPlanModal = (athleteId) => {
//     setSelectedAthleteId(athleteId);
//     setWeightPlanModalOpen(true);
//   };

//   const closeWeightPlanModal = () => {
//     setWeightPlanData({ targetWeight: "", duration: "", details: "" });
//     setWeightPlanModalOpen(false);
//   };




//   const submitWeightPlan = async (athleteId) => {
//     try {
//       const response = await axios.post(
//         `/coach/createplan`,
//         {
//           athleteId: parseFloat(athleteId),
//           startWeight: parseFloat(weightPlanData.startWeight),
//           targetWeight: parseFloat(weightPlanData.targetWeight),
//           preference: weightPlanData.preference,
//           dailyCalorieGoal: parseInt(weightPlanData.dailyCalorieGoal, 10),

//         },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       console.log("Weight plan created successfully:", response.data);
//       closeWeightPlanModal();
//     } catch (error) {
//       console.error("Error creating weight plan:", error);
//     }
//   };




//   useEffect(() => {
//     fetchCoachData();
//     fetchAchievements();
//     fetchAssistanceRequests();
//     fetchAthletes();
//   }, []);

//   // Fetch coach profile data
//   const fetchCoachData = async () => {
//     try {
//       const response = await axios.get("/coach/profile", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setCoachProfile(response.data);
//     } catch (error) {
//       console.error("Error fetching coach profile:", error);
//     }
//   };

//   // Fetch achievements
//   const fetchAchievements = async () => {
//     try {
//       const response = await axios.get("/coach/achievements", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setAchievements(response.data);
//     } catch (error) {
//       console.error("Error fetching achievements:", error);
//     }
//   };

//   // Fetch assistance requests
//   const fetchAssistanceRequests = async () => {
//     try {
//       const response = await axios.get("/coach/getallassistancereq", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setAssistanceRequests(response.data);
//     } catch (error) {
//       console.error("Error fetching assistance requests:", error);
//     }
//   };

//   // Fetch accepted athletes
//   const fetchAthletes = async () => {
//     try {
//       const response = await axios.get("/coach/athletes", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setAthletes(response.data);
//     } catch (error) {
//       console.error("Error fetching athletes:", error);
//     }
//   };

//   // Fetch athlete profile
//   const fetchAthleteProfile = async (athleteId) => {
//     try {
//       const response = await axios.get(`/coach/athlete/${athleteId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setCurrentAthleteProfile(response.data);
//       setShowAthleteProfileModal(true);
//     } catch (error) {
//       console.error("Error fetching athlete profile:", error);
//     }
//   };

//   // Fetch weight plan
//   const fetchWeightPlan = async (athleteId) => {
//     try {
//       const response = await axios.get(`/coach/createplan/athlete/${athleteId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setWeightPlan(response.data);
//       setShowWeightPlanModal(true);
//     } catch (error) {
//       console.error("Error fetching weight plan:", error);
//     }
//   };

//   // Update coach profile
//   const handleProfileUpdate = async () => {
//     try {
//       await axios.put("/coach/profile", updatedProfile, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setShowEditProfileModal(false);
//       fetchCoachData(); // Refresh profile data
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   // Add a new achievement
//   const handleAddAchievement = async () => {
//     try {
//       await axios.post("/coach/addAchievement", newAchievement, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setShowAchievementModal(false);
//       fetchAchievements(); // Refresh achievements data
//     } catch (error) {
//       console.error("Error adding achievement:", error);
//     }
//   };

//   // Accept assistance request
//   const handleAcceptRequest = async (requestId) => {
//     try {
//       await axios.put(`/coach/assistance/${requestId}/accept`, null, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       fetchAssistanceRequests(); // Refresh requests data
//     } catch (error) {
//       console.error("Error accepting request:", error);
//     }
//   };
//   const handleInput = (e, field) => {
//     setWeightPlanData((prev) => ({ ...prev, [field]: e.target.value }));
//   };
//   // Reject assistance request
//   const handleRejectRequest = async (requestId) => {
//     try {
//       await axios.put(`/coach/assistance/${requestId}/reject`, null, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       fetchAssistanceRequests(); // Refresh requests data
//     } catch (error) {
//       console.error("Error rejecting request:", error);
//     }
//   };

//   // Handle input changes for forms
//   const handleInputChange = (e, stateUpdater) => {
//     const { name, value } = e.target;
//     stateUpdater((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveProfile = async () => {
//     const token = localStorage.getItem("token");
//     const formData = new FormData();
//     formData.append("firstName", updatedProfile.firstName);
//     formData.append("lastName", updatedProfile.lastName);
//     if (newImage) formData.append("imageFile", newImage);

//     try {
//       const response = await fetch("/coach/profile", {
//         method: "PUT",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         alert("Profile updated successfully!");
//         setShowEditProfileModal(false);
//         fetchCoachData();

//       } else {
//         console.error("Error updating profile");
//       }
//     } catch (error) {
//       console.error("Error saving profile:", error);
//     }
//   };


//   const handleViewDetails = (athlete) => {
//     setSelectedAthlete(athlete);
//     setProfileModalOpen(true);
//   };

//   const handleCloseProfileModal = () => {
//     setProfileModalOpen(false);
//   };


//   const handleOpenProfileModal = (athlete) => {
//     setSelectedAthlete(athlete);
//     setProfileModalOpen(true);
//   };





//   return (
//     <div className="coach-dashboard container mt-5">
//       <header className="dashboard-header py-3">
//         <h1>Welcome, {coachProfile.firstName || "Coach"} {coachProfile.lastName || "Coach"}!</h1>
//         <nav>
//           <Button
//             variant={currentSection === "profile" ? "primary" : "light"}
//             onClick={() => setCurrentSection("profile")}
//             className="mx-2"
//           >
//             Profile
//           </Button>
//           <Button
//             variant={currentSection === "achievements" ? "primary" : "light"}
//             onClick={() => setCurrentSection("achievements")}
//             className="mx-2"
//           >
//             Achievements
//           </Button>
//           <Button
//             variant={currentSection === "requests" ? "primary" : "light"}
//             onClick={() => setCurrentSection("requests")}
//             className="mx-2"
//           >
//             Assistance Requests
//           </Button>
//           <Button
//             variant={currentSection === "athletes" ? "primary" : "light"}
//             onClick={() => setCurrentSection("athletes")}
//             className="mx-2"
//           >
//             Athletes
//           </Button>
//         </nav>
//       </header>

//       {/* Profile Section */}
//       {currentSection === "profile" && (
//         <div className="profile-section my-4">
//           <div
//             style={{
//               padding: "20px",
//               maxWidth: "900px",         // Max width for the profile container
//               margin: "0 auto",         // Center the container
//               backgroundColor: "#fff",  // White background for a clean look
//               borderRadius: "12px",     // Rounded corners for the container
//               boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
//               display: "flex",          // Use flexbox for horizontal alignment
//               alignItems: "center",     // Vertically align items
//             }}
//           >
//             {/* Profile Image */}
//             <div
//               style={{
//                 flex: "0 0 150px",      // Fixed width for the profile image section
//                 marginRight: "20px",    // Space between image and text
//                 textAlign: "center",    // Center image within the div
//               }}
//             >
//               <img
//                 src={coachProfile.imageBase64 ? `data:image/jpeg;base64,${coachProfile.imageBase64}` : '/default-profile.jpg'}
//                 alt="Athlete"
//                 style={{
//                   width: "100%",
//                   maxWidth: "120px", // Set a max width for the profile image
//                   borderRadius: "50%", // Circular profile image
//                   boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
//                   // transition: "transform 0.3s ease", // Smooth transition on hover
//                 }}
//               />
//             </div>

//             {/* Profile Details and Edit Button */}
//             <div
//               style={{
//                 flex: "1",            // Take the remaining space
//                 textAlign: "left",    // Align text to the left
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "24px",         // Slightly smaller font size for the name
//                   color: "#2c3e50",         // Dark color for the title
//                   fontWeight: "600",        // Bold title for emphasis
//                   marginBottom: "10px",     // Space below the title
//                 }}
//               >
//                 {coachProfile.firstName}{coachProfile.lastName}
//               </h3>

//               {/* Display Email and Specialization */}
//               <p
//                 style={{
//                   fontSize: "16px",         // Standard font size for text
//                   color: "#34495e",         // Slightly muted text color
//                   marginBottom: "8px",      // Space between text
//                 }}
//               >
//                 <strong>Email: </strong>{coachProfile.email || "example@domain.com"}
//               </p>

//               <p
//                 style={{
//                   fontSize: "16px",
//                   color: "#34495e",
//                   marginBottom: "20px",     // Space before the edit button
//                 }}
//               >
//                 <strong>Specialization: </strong>{coachProfile.specialization || "Not specified"}
//               </p>

//               {/* Edit Profile Button */}
//               <Button
//                 variant="primary"
//                 onClick={() => {
//                   setUpdatedProfile(coachProfile);
//                   setShowEditProfileModal(true);
//                 }}
//                 style={{
//                   backgroundColor: "#3498db",  // Primary color (blue) for the button
//                   color: "#fff",               // White text for contrast
//                   padding: "10px 20px",        // Adequate padding
//                   borderRadius: "6px",         // Rounded corners for the button
//                   border: "none",              // Remove default button border
//                   fontSize: "16px",            // Standard font size for readability
//                   fontWeight: "600",           // Bold button text
//                   cursor: "pointer",          // Pointer cursor on hover
//                   transition: "background-color 0.3s ease", // Smooth hover effect
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = "#2980b9"; // Darker shade on hover
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.backgroundColor = "#3498db"; // Reset to original color
//                 }}
//               >
//                 Edit Profile
//               </Button>
//             </div>
//           </div>


//           {showEditProfileModal && (
//             <div className="edit-profile-modal" style={modalStyles}>
//               <div className="edit-modal-content" style={modalContentStyles}>
//                 <h2 style={modalTitleStyles}>Edit Profile</h2>
//                 <form
//                   className="edit-modal-form"
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     handleSaveProfile();
//                   }}
//                 >
//                   <label style={labelStyles}>
//                     First Name <span className="required" style={requiredStyles}>*</span>:
//                     <input
//                       type="text"
//                       name="firstName"
//                       value={updatedProfile.firstName || ""}
//                       onChange={(e) =>
//                         setUpdatedProfile({
//                           ...updatedProfile,
//                           firstName: e.target.value,
//                         })
//                       }
//                       placeholder="First Name"
//                       required
//                       style={inputStyles}
//                     />
//                   </label>
//                   <label style={labelStyles}>
//                     Last Name <span className="required" style={requiredStyles}>*</span>:
//                     <input
//                       type="text"
//                       name="lastName"
//                       value={updatedProfile.lastName || ""}
//                       onChange={(e) =>
//                         setUpdatedProfile({
//                           ...updatedProfile,
//                           lastName: e.target.value,
//                         })
//                       }
//                       placeholder="Last Name"
//                       required
//                       style={inputStyles}
//                     />
//                   </label>
//                   <label style={labelStyles}>
//                     Profile Picture:
//                     <input
//                       type="file"
//                       onChange={(e) => setNewImage(e.target.files[0])}
//                       style={inputStyles}
//                     />
//                   </label>
//                   <div className="form-buttons" style={buttonContainerStyles}>
//                     <Button
//                       type="submit"
//                       variant="success"
//                       onClick={handleSaveProfile}
//                       style={buttonStyles}
//                     >
//                       Save
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       onClick={() => setShowEditProfileModal(false)}
//                       style={buttonStyles}
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </div>

//           )}
//         </div>
//       )}


//       {/* Achievements Section */}
//       {currentSection === "achievements" && (
//         <div className="achievements-section my-4">
//           <h3>Your Achievements</h3>

//           <Button variant="success" onClick={() => setShowAchievementModal(true)}>
//             Add Achievement
//           </Button>
//           <ul
//             style={{
//               listStyleType: "none",   // Remove default list styling
//               padding: 0,              // Remove padding for the list
//             }}
//           >
//             {achievements.map((achievement, index) => (
//               <li
//                 key={index}
//                 style={{
//                   border: "1px solid #e0e0e0",  // Subtle border for each item
//                   padding: "20px",               // Ample padding inside the box
//                   margin: "15px 0",              // Margin between each item
//                   borderRadius: "12px",          // Rounded corners
//                   background: "linear-gradient(135deg, #f7f7f7, #ffffff)", // Soft gradient background
//                   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover transition
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.transform = "scale(1.03)"; // Slightly enlarge on hover
//                   e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)"; // Bigger shadow
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.transform = "scale(1)"; // Reset size when hover ends
//                   e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)"; // Reset shadow
//                 }}

//               >
//                 <h3
//                   style={{
//                     marginBottom: "10px",  // More space below the title
//                     fontSize: "20px",      // Slightly larger font for the title
//                     fontWeight: "600",     // Bold title for emphasis
//                     color: "#2c3e50",      // Dark text color for better readability
//                     textTransform: "uppercase", // Uppercase for a formal look
//                   }}
//                 >
//                   {achievement.title}
//                 </h3>
//                 <p
//                   style={{
//                     marginBottom: "10px",  // More space below the description
//                     fontSize: "16px",      // Standard readable font size for description
//                     lineHeight: "1.6",      // Better line spacing for readability
//                     color: "#34495e",      // Slightly muted text color
//                   }}
//                 >
//                   {achievement.description}
//                 </p>
//                 <span
//                   style={{
//                     display: "block",      // Make the date a block element for alignment
//                     fontSize: "14px",      // Smaller font size for the date
//                     color: "#95a5a6",      // Light gray for the date text
//                     fontStyle: "italic",   // Italicize for a subtle distinction
//                     textAlign: "right",    // Align the date to the right
//                     marginTop: "10px",     // Space between description and date
//                   }}
//                 >
//                   {achievement.achievedDate ? achievement.achievedDate.split("T")[0] : "Date not available"}
//                 </span>
//               </li>
//             ))}
//           </ul>





//           {/* Modal for Adding Achievement */}
//           {showAchievementModal && (
//             <div className="achievement-modal">
//               <div className="modal-content">
//                 <h2>Add Achievement</h2>
//                 <form
//                   onSubmit={(e) => {
//                     // e.preventDefault();
//                     handleAddAchievement();
//                   }}
//                 >
//                   <label>
//                     Title<span className="required">*</span>:
//                     <input
//                       type="text"
//                       value={newAchievement.title}
//                       onChange={(e) =>
//                         setNewAchievement({ ...newAchievement, title: e.target.value })

//                       }
//                       placeholder="Achievement Title"
//                       required
//                     />
//                   </label>
//                   <label>
//                     Description<span className="required">*</span>:
//                     <textarea
//                       value={newAchievement.description}
//                       onChange={(e) =>
//                         setNewAchievement({ ...newAchievement, description: e.target.value })
//                       }
//                       placeholder="Description"
//                       required
//                     />
//                   </label>
//                   <label>
//                     Achieved Date<span className="required">*</span>:
//                     <input
//                       type="date"
//                       value={newAchievement.achievedDate}
//                       onChange={(e) =>
//                         setNewAchievement({ ...newAchievement, achievedDate: e.target.value })
//                       }
//                       required
//                     />
//                   </label>
//                   <div className="modal-buttons">
//                     <button type="submit">Save</button>
//                     <button
//                       type="button"
//                       onClick={() => setShowAchievementModal(false)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//         </div>
//       )}

//       {/* Assistance Requests Section 
//       {currentSection === "requests" && (
//         <div className="assistance-requests-section my-4">
//           <h3>Assistance Requests</h3>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Request By</th>
//                 <th>Message</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assistanceRequests.map((request, index) => (
//                 <tr key={request.id}>
//                   <td>{index + 1}</td>
//                   <td>{request.requestedBy}</td>
//                   <td>{request.message}</td>
//                   <td>{request.status}</td>
//                   <td>
//                     {request.status === "Pending" && (
//                       <>
//                         <Button
//                           variant="success"
//                           onClick={() => handleAcceptRequest(request.id)}
//                           className="me-2"
//                         >
//                           Accept
//                         </Button>
//                         <Button
//                           variant="danger"
//                           onClick={() => handleRejectRequest(request.id)}
//                         >
//                           Reject
//                         </Button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}  */}
//       {currentSection === "requests" && (
//         <div className="assistance-requests-section my-4">
//           <h3>Assistance Requests</h3>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Request By</th>
//                 <th>Message</th>
//                 <th>Request Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assistanceRequests
//                 .filter((request) => request.status === "Pending") // Filter for Pending requests
//                 .map((request, index) => (
//                   <tr key={request.id}>
//                     <td>{index + 1}</td>
//                     <td> {request.athlete.firstName} {request.athlete.lastName}</td>
//                     <td>{request.remarks || "No remarks provided."}</td>
//                     <td>{request.requestDate.split('T')[0]}</td>
//                     <td>
//                       <Button
//                         variant="success"
//                         onClick={() => handleAcceptRequest(request.assistanceRequestId)}
//                         className="me-2"
//                       >
//                         Accept
//                       </Button>
//                       <Button
//                         variant="danger"
//                         onClick={() => handleRejectRequest(request.assistanceRequestId)}
//                       >
//                         Reject
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </Table>
//           {assistanceRequests.filter((request) => request.status === "Pending").length === 0 && (
//             <p>No pending requests available.</p>
//           )}
//         </div>
//       )}


//       {/* Athletes Section */}
//       {currentSection === "athletes" && (
//         <div className="athletes-section my-4">
//           <h3>Your Athletes</h3>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {athletes.map((athlete, index) => (
//                 <tr key={athlete.id}>
//                   <td>{index + 1}</td>
//                   <td>{athlete.firstName} {athlete.lastName}</td>
//                   <td>{athlete.email}</td>
//                   <td>
//                     <Button
//                       variant="info"
//                       onClick={() => handleViewDetails(athlete)}
//                       className="me-2"
//                     >
//                       View Profile
//                     </Button>
//                     <Button
//                       variant="secondary"
//                       onClick={() => openWeightPlanModal(athlete.athleteId)}
//                     >
//                       View Weight Plan
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>

//           {selectedAthlete && (
//             <Dialog
//               open={profileModalOpen}
//               onClose={handleCloseProfileModal}
//               maxWidth="sm"
//               fullWidth
//             >
//               <DialogTitle style={{ textAlign: "center" }}>Athlete Profile</DialogTitle>
//               <DialogContent
//                 style={{
//                   justifyContent: "center",
//                   textAlign: "center",
//                 }}
//               >
//                 <img
//                   src={
//                     selectedAthlete.photoBase64
//                       ? `data:image/jpeg;base64,${selectedAthlete.photoBase64}`
//                       : "/default-profile.jpg"
//                   }
//                   alt="Athlete"
//                   style={{ paddingLeft: "3%", width: "400px", height: "220px" }}
//                 />
//                 <Typography variant="h6">
//                   Name: {selectedAthlete.firstName} {selectedAthlete.lastName}
//                 </Typography>
//                 <Typography variant="h6">Gender: {selectedAthlete.gender} </Typography>
//                 <Typography variant="h6">Height: {selectedAthlete.height} </Typography>
//                 <Typography variant="h6">Weight: {selectedAthlete.weight} </Typography>

//                 <Typography variant="h6">Category: {selectedAthlete.category}</Typography>




//                 <div>

//                 </div>
//                 <Button
//                   onClick={handleCloseProfileModal}
//                   variant="contained"
//                   style={{ marginTop: "15px" }}
//                 >
//                   Close
//                 </Button>
//               </DialogContent>
//             </Dialog>
//           )}

//           {/* Modal for Creating Weight Plan */}
//           <Dialog
//             open={weightPlanModalOpen}
//             onClose={closeWeightPlanModal}
//             maxWidth="sm"
//             fullWidth
//           >
//             <DialogTitle style={{ textAlign: "center" }}>Create Weight Plan</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label="Start Weight"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"

//                 value={weightPlanData.startWeight}
//                 onChange={(e) => handleInput(e, "startWeight")}
//               />
//               <TextField
//                 label="Target Weight"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"

//                 value={weightPlanData.targetWeight}
//                 onChange={(e) => handleInput(e, "targetWeight")}
//               />
//               <TextField
//                 label="Preference"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 value={weightPlanData.preference}
//                 onChange={(e) => handleInput(e, "preference")}
//               />
//               <TextField
//                 label="Daily Calorie Goal"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"

//                 value={weightPlanData.dailyCalorieGoal}
//                 onChange={(e) => handleInput(e, "dailyCalorieGoal")}
//               />
//               {/* Optional: Textarea for Daily Diets */}

//               <Button
//                 onClick={() => submitWeightPlan(selectedAthlete.athleteId)}
//                 variant="contained"
//                 color="primary"
//                 style={{ marginTop: "15px" }}
//               >
//                 Submit Plan
//               </Button>
//               <Button
//                 onClick={closeWeightPlanModal}
//                 variant="outlined"
//                 style={{ marginTop: "15px", marginLeft: "10px" }}
//               >
//                 Cancel
//               </Button>
//             </DialogContent>
//           </Dialog>

//         </div>
//       )}



//       {/* Modals (Reuse existing modal code here) */}
//     </div>
//   );
// };

// export default CoachDashboard;




// const modalStyles = {
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 1000,  // Ensure modal is on top
// };

// const modalContentStyles = {
//   backgroundColor: "#fff",
//   padding: "30px",
//   borderRadius: "12px",
//   width: "80%",
//   maxWidth: "600px",
//   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//   animation: "fadeIn 0.3s ease-in-out",
// };

// const modalTitleStyles = {
//   textAlign: "center",
//   fontSize: "24px",
//   color: "#333",
//   marginBottom: "20px",
// };

// const labelStyles = {
//   display: "block",
//   marginBottom: "15px",
//   fontSize: "16px",
//   color: "#555",
// };

// const requiredStyles = {
//   color: "red",
// };

// const inputStyles = {
//   width: "100%",
//   padding: "10px",
//   marginTop: "5px",
//   border: "1px solid #ddd",
//   borderRadius: "6px",
//   fontSize: "16px",
//   color: "#333",
//   outline: "none",
//   boxSizing: "border-box",
//   transition: "border-color 0.3s",
// };

// const inputFocusStyles = {
//   borderColor: "#3498db",
// };

// const buttonContainerStyles = {
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: "20px",
// };

// const buttonStyles = {
//   padding: "12px 20px",
//   borderRadius: "6px",
//   fontSize: "16px",
//   cursor: "pointer",
//   width: "48%", // Button width to make them align horizontally
//   textAlign: "center",
// };

// // Add a fade-in animation to the modal
// const fadeInKeyframes = `@keyframes fadeIn {
//   0% { opacity: 0; }
//   100% { opacity: 1; }
// }`;
// document.styleSheets[0].insertRule(fadeInKeyframes, 0);



import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../styles/coach.css"; // Import CSS file
import axios from "axios";
import { Typography, AppBar, Table, Toolbar, DialogTitle, DialogContent, Dialog, Box } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";


const CoachDashboard = ({
  // coachProfile,
  // achievements,
  // assistanceRequests,
  // athletes,
  // handleProfileUpdate,
  // handleAddAchievement,
  // handleAcceptRequest,
  // handleRejectRequest,
  // fetchAthleteProfile,
  // fetchWeightPlan,
  // currentAthleteProfile,
  // weightPlan,
  // handleInputChange,
  // setUpdatedProfile,
  // updatedProfile,
  // setNewAchievement,
  // setShowEditProfileModal,
  // showEditProfileModal,
  // setShowAchievementModal,
  // showAchievementModal,
  // setShowAthleteProfileModal,
  // showAthleteProfileModal,
  // setShowWeightPlanModal,
  // showWeightPlanModal,
}) => {
  const [currentSection, setCurrentSection] = useState("profile");


  // States for managing data
  const [coachProfile, setCoachProfile] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [assistanceRequests, setAssistanceRequests] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [weightPlan, setWeightPlan] = useState(null);
  const [selectedAthlete, setSelectedAthlete] = useState(null); // Stores the selected athlete details
  const [profileModalOpen, setProfileModalOpen] = useState(false); // Tracks modal visibility


  // Modal visibility states
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showAthleteProfileModal, setShowAthleteProfileModal] = useState(false);
  const [showWeightPlanModal, setShowWeightPlanModal] = useState(false);
  const [newImage, setNewImage] = useState(null);


  // State for storing form data
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [newAchievement, setNewAchievement] = useState({});
  const [currentAthleteProfile, setCurrentAthleteProfile] = useState(null);
  const navigate = useNavigate();
  // Fetch data from API on component mount
  useEffect(() => {
    fetchCoachData();
    fetchAchievements();
    fetchAssistanceRequests();
    fetchAthletes();
  }, []);

  // Fetch coach profile data
  const fetchCoachData = async () => {
    try {
      const response = await axios.get("/coach/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCoachProfile(response.data);
    } catch (error) {
      console.error("Error fetching coach profile:", error);
    }
  };

  const handleLogout = () => {
    navigate('\*');
  }

  // Fetch achievements
  const fetchAchievements = async () => {
    try {
      const response = await axios.get("/coach/achievements", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  // Fetch assistance requests
  const fetchAssistanceRequests = async () => {
    try {
      const response = await axios.get("/coach/getallassistancereq", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAssistanceRequests(response.data);
    } catch (error) {
      console.error("Error fetching assistance requests:", error);
    }
  };

  // Fetch accepted athletes
  const fetchAthletes = async () => {
    try {
      const response = await axios.get("/coach/athletes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAthletes(response.data);
    } catch (error) {
      console.error("Error fetching athletes:", error);
    }
  };


  // Fetch athlete profile
  const fetchAthleteProfile = async (athleteId) => {
    console.log(athleteId, typeof (athleteId));
    try {
      const response = await axios.get(`/coach/athlete/${athleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setCurrentAthleteProfile(response.data);
      // setShowAthleteProfileModal(true);

      fetchWeightPlan(athleteId)

      document.getElementById("athletePage").style.visibility = 'none';

      document.getElementById("athleteProfile").style.visibility = 'block';








    } catch (error) {
      console.error("Error fetching athlete profile:", error);
    }
  };

  // Fetch weight plan
  const fetchWeightPlan = async (athleteId) => {
    try {
      const response = await axios.get(`/coach/weightplan/athlete/${athleteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setWeightPlan(response.data);
      // setShowWeightPlanModal(true);
    } catch (error) {
      console.error("Error fetching weight plan:", error);
    }
  };

  // Update coach profile
  const handleProfileUpdate = async () => {
    try {
      await axios.put("/coach/profile", updatedProfile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setShowEditProfileModal(false);
      fetchCoachData(); // Refresh profile data
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Add a new achievement
  const handleAddAchievement = async () => {
    try {
      await axios.post("/coach/addAchievement", newAchievement, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setShowAchievementModal(false);
      fetchAchievements(); // Refresh achievements data
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  // Accept assistance request
  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.put(`/coach/assistance/${requestId}/accept`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAssistanceRequests(); // Refresh requests data
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Reject assistance request
  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(`/coach/assistance/${requestId}/reject`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAssistanceRequests(); // Refresh requests data
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // Handle input changes for forms
  const handleInputChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("firstName", updatedProfile.firstName);
    formData.append("lastName", updatedProfile.lastName);
    if (newImage) formData.append("imageFile", newImage);

    try {
      const response = await fetch("/coach/profile", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Profile updated successfully!");
        setShowEditProfileModal(false);
        fetchCoachData();

      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };


  const handleViewDetails = (athleteId) => {
    console.log("viewdetial", athleteId, typeof (athleteId))
    // setSelectedAthlete(athlete);
    fetchAthleteProfile(athleteId)
    // setProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };


  const handleOpenProfileModal = (athlete) => {
    setSelectedAthlete(athlete);
    setProfileModalOpen(true);
  };


  const [showModal2, setShowModal2] = useState(false);
  const [formData2, setFormData2] = useState({
    startWeight: "",
    targetWeight: "",
    preference: "",
    dailyCalorieGoal: "",
  });

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  const handleSubmit = async (athleteId) => {
    // e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `/coach/createplan/`,
        {
          athleteId: parseFloat(athleteId),
          startWeight: parseFloat(formData2.startWeight),
          targetWeight: parseFloat(formData2.targetWeight),
          preference: formData2.preference,
          dailyCalorieGoal: parseInt(formData2.dailyCalorieGoal, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Weight plan created successfully!");
      setShowModal2(false);
      setFormData2({
        startWeight: "",
        targetWeight: "",
        preference: "",
        dailyCalorieGoal: "",
      });
    } catch (error) {
      console.error("Error creating weight plan:", error);
      alert("Failed to create weight plan.");
    }
  }



  return (
    <div className="coachDashboard">

      <AppBar position="static" className="navbar">
        <Toolbar className="navbar-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Section: Coach */}
          <Typography variant="h5" className="navbar-title">
            <h1 className="text-3xl font-bold text-[#1e40af]">Coach</h1>
          </Typography>

          {/* Right Section: Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="" className="logout-link">
              <Button
                variant={currentSection === "profile" ? "primary" : "light"}
                onClick={() => setCurrentSection("profile")}
                className="px-2"
              >
                Profile
              </Button>
            </Link>
            <Link to="" className="logout-link">
              <Button
                variant={currentSection === "achievements" ? "primary" : "light"}
                onClick={() => setCurrentSection("achievements")}
                className="px-2"
              >
                Achievements
              </Button>
            </Link>
            <Link to="" className="logout-link">
              <Button
                variant={currentSection === "requests" ? "primary" : "light"}
                onClick={() => setCurrentSection("requests")}
                className="px-2"
              >
                Requests
              </Button>
            </Link>
            <Link to="" className="logout-link">
              <Button
                variant={currentSection === "athletes" ? "primary" : "light"}
                onClick={() => setCurrentSection("athletes")}
                className="px-2"
              >
                Athletes
              </Button>
            </Link>
            <Link to="/*" className="logout-link">
              <Button
                onClick={handleLogout}
                startIcon={<LoginIcon />}
                style={{ color: 'white' }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-white font-medium hover:shadow-lg transition transform hover:scale-105"
              >
                <LoginIcon /> Logout
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div>



        {/* Profile Section */}
        {currentSection === "profile" && (
          <div>
            <br></br>
            <b><h1 style={{ fontSize: '36px', color: 'white', textAlign: 'center' }}>Welcome, {coachProfile.firstName || "Coach"} {coachProfile.lastName || "Coach"}!</h1></b>
            <br></br>
            <div className="profile-section">
              <div
                style={{
                  padding: "20px",
                  Width: "900px",
                  height: "330px",         // Max width for the profile container
                  margin: "20",
                  marginLeft: "30%",       // Center the container
                  backgroundColor: "#E5E3D4",  // White background for a clean look
                  borderRadius: "12px",     // Rounded corners for the container
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                  display: "flex",          // Use flexbox for horizontal alignment
                  alignItems: "center",     // Vertically align items
                }}
              >
                {/* Profile Image */}
                <div
                  style={{
                    flex: "0 0 150px",      // Fixed width for the profile image section
                    marginRight: "20px",    // Space between image and text
                    textAlign: "center",    // Center image within the div
                  }}
                >
                  <img
                    src={coachProfile.imageBase64 ? `data:image/jpeg;base64,${coachProfile.imageBase64}` : '/default-profile.jpg'}
                    alt="Athlete"
                    style={{
                      width: "100%",
                      maxWidth: "120px", // Set a max width for the profile image
                      borderRadius: "50%", // Circular profile image
                      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                      // transition: "transform 0.3s ease", // Smooth transition on hover
                    }}
                  />
                </div>

                {/* Profile Details and Edit Button */}
                <div
                  style={{
                    flex: "1",            // Take the remaining space
                    textAlign: "left",    // Align text to the left
                  }}
                >
                  <h3
                    style={{
                      fontSize: "24px",         // Slightly smaller font size for the name
                      color: "#2c3e50",         // Dark color for the title
                      fontWeight: "600",        // Bold title for emphasis
                      marginBottom: "10px",     // Space below the title
                    }}
                  >
                    {coachProfile.firstName} {coachProfile.lastName}
                  </h3>

                  {/* Display Email and Specialization */}
                  <p
                    style={{
                      fontSize: "16px",         // Standard font size for text
                      color: "#34495e",         // Slightly muted text color
                      marginBottom: "8px",      // Space between text
                    }}
                  >
                    <strong>Email: </strong>{coachProfile.email || "example@domain.com"}
                  </p>

                  <p
                    style={{
                      fontSize: "16px",
                      color: "#34495e",
                      marginBottom: "20px",     // Space before the edit button
                    }}
                  >
                    <strong>Specialization: </strong>{coachProfile.specialization || "Not specified"}
                  </p>

                  {/* Edit Profile Button */}
                  <Button
                    variant="primary"
                    onClick={() => {
                      setUpdatedProfile(coachProfile);
                      setShowEditProfileModal(true);
                    }}
                    style={{
                      backgroundColor: "#3498db",  // Primary color (blue) for the button
                      color: "#fff",               // White text for contrast
                      padding: "10px 20px",        // Adequate padding
                      borderRadius: "6px",         // Rounded corners for the button
                      border: "none",              // Remove default button border
                      fontSize: "16px",            // Standard font size for readability
                      fontWeight: "600",           // Bold button text
                      cursor: "pointer",          // Pointer cursor on hover
                      transition: "background-color 0.3s ease", // Smooth hover effect
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#2980b9"; // Darker shade on hover
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#3498db"; // Reset to original color
                    }}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>

            </div>
          </div>
        )}

        {showEditProfileModal && (
          <div className="edit-profile-modal" style={modalStyles}>
            <div className="edit-modal-content" style={modalContentStyles}>
              <h1 style={modalTitleStyles}>Edit Profile</h1>
              <form
                className="edit-modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveProfile();
                }}
              >
                <label style={labelStyles}>
                  First Name <span className="required" style={requiredStyles}>*</span>:
                  <input
                    type="text"
                    name="firstName"
                    value={updatedProfile.firstName || ""}
                    onChange={(e) =>
                      setUpdatedProfile({
                        ...updatedProfile,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="First Name"
                    required
                    style={inputStyles}
                  />
                </label>
                <label style={labelStyles}>
                  Last Name <span className="required" style={requiredStyles}>*</span>:
                  <input
                    type="text"
                    name="lastName"
                    value={updatedProfile.lastName || ""}
                    onChange={(e) =>
                      setUpdatedProfile({
                        ...updatedProfile,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="Last Name"
                    required
                    style={inputStyles}
                  />
                </label>
                <label style={labelStyles}>
                  Profile Picture:
                  <input
                    type="file"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    style={inputStyles}
                  />
                </label>
                <div className="form-buttons" style={buttonContainerStyles}>
                  <Button
                    type="submit"
                    variant="success"
                    onClick={handleSaveProfile}
                    style={buttonStyles}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowEditProfileModal(false)}
                    style={buttonStyles}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>

        )}


        {/* Achievements Section */}
        {currentSection === "achievements" && (
          <>
            <br></br>
            <b><h1 style={{ fontSize: '36px', color: 'white', textAlign: 'center' }}>Your Achievements</h1></b>
            <br></br>
            <div className="achievements-section my-4">

              <Button variant="success" onClick={() => setShowAchievementModal(true)}>
                Add Achievement
              </Button>
              <ul
                style={{
                  listStyleType: "none",   // Remove default list styling
                  padding: 0,              // Remove padding for the list
                }}
              >
                {achievements.map((achievement, index) => (
                  <li
                    key={index}
                    style={{
                      border: "1px solid #e0e0e0",  // Subtle border for each item
                      padding: "20px",               // Ample padding inside the box
                      margin: "15px 0",              // Margin between each item
                      borderRadius: "12px",          // Rounded corners
                      background: "linear-gradient(135deg, #f7f7f7, #ffffff)", // Soft gradient background
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                      transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth hover transition
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)"; // Slightly enlarge on hover
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)"; // Bigger shadow
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)"; // Reset size when hover ends
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)"; // Reset shadow
                    }}

                  >
                    <h3
                      style={{
                        marginBottom: "10px",  // More space below the title
                        fontSize: "20px",      // Slightly larger font for the title
                        fontWeight: "600",     // Bold title for emphasis
                        color: "#2c3e50",      // Dark text color for better readability
                        textTransform: "uppercase", // Uppercase for a formal look
                      }}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      style={{
                        marginBottom: "10px",  // More space below the description
                        fontSize: "16px",      // Standard readable font size for description
                        lineHeight: "1.6",      // Better line spacing for readability
                        color: "#34495e",      // Slightly muted text color
                      }}
                    >
                      {achievement.description}
                    </p>
                    <span
                      style={{
                        display: "block",      // Make the date a block element for alignment
                        fontSize: "14px",      // Smaller font size for the date
                        color: "#95a5a6",      // Light gray for the date text
                        fontStyle: "italic",   // Italicize for a subtle distinction
                        textAlign: "right",    // Align the date to the right
                        marginTop: "10px",     // Space between description and date
                      }}
                    >
                      {achievement.achievedDate ? achievement.achievedDate.split("T")[0] : "Date not available"}
                    </span>
                  </li>

                ))}
              </ul>





              {/* Modal for Adding Achievement */}
              {showAchievementModal && (
                <div className="achievement-modal">
                  <div className="modal-content">
                    <h1 style={{ fontSize: "26p" }}>Add Achievement</h1>
                    <form
                      onSubmit={(e) => {
                        // e.preventDefault();
                        handleAddAchievement();
                      }}
                    >
                      <label>
                        Title<span className="required">*</span>:
                        <input
                          type="text"
                          value={newAchievement.title}
                          onChange={(e) =>
                            setNewAchievement({ ...newAchievement, title: e.target.value })

                          }
                          placeholder=" &nbsp; &nbsp; Achievement Title"
                          required
                        />
                      </label>
                      <label>
                        Description<span className="required">*</span>:
                        <textarea
                          value={newAchievement.description}
                          onChange={(e) =>
                            setNewAchievement({ ...newAchievement, description: e.target.value })
                          }
                          placeholder="Description"
                          required
                        />
                      </label>
                      <label>
                        Achieved Date<span className="required">*</span>:
                        <input
                          type="date"
                          value={newAchievement.achievedDate}
                          onChange={(e) =>
                            setNewAchievement({ ...newAchievement, achievedDate: e.target.value })
                          }
                          required
                        />
                      </label>
                      <div className="modal-buttons">
                        <button type="submit">Save</button>
                        <button
                          type="button"
                          onClick={() => setShowAchievementModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </>
        )}

        {/* Assistance Requests Section 
      {currentSection === "requests" && (
        <div className="assistance-requests-section my-4">
          <h3>Assistance Requests</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Request By</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assistanceRequests.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>{request.requestedBy}</td>
                  <td>{request.message}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === "Pending" && (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleAcceptRequest(request.id)}
                          className="me-2"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}  */}
        {currentSection === "requests" && (
          <>
            <br></br>
            <b><h1 style={{ fontSize: '36px', color: 'white', textAlign: 'center' }}>Assistance Requests</h1></b>
            <br></br>
            <div className="assistance-requests-section my-4">

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Request By</th>
                    <th>Message</th>
                    <th>Request Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assistanceRequests
                    .filter((request) => request.status === "Pending") // Filter for Pending requests
                    .map((request, index) => (
                      <tr key={request.id}>
                        <td>{index + 1}</td>
                        <td> {request.athlete.firstName} {request.athlete.lastName}</td>
                        <td>{request.remarks || "No remarks provided."}</td>
                        <td>{request.requestDate.split('T')[0]}</td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => handleAcceptRequest(request.assistanceRequestId)}
                            className="me-2"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleRejectRequest(request.assistanceRequestId)}
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {assistanceRequests.filter((request) => request.status === "Pending").length === 0 && (
                <p>No pending requests available.</p>
              )}
            </div>
          </>
        )}


        {/* Athletes Section */}
        {currentSection === "athletes" && (
          <>
            <div id="athletePage">
              <br></br>
              <b><h1 style={{ fontSize: '36px', color: 'white', textAlign: 'center' }}>Your Athletes</h1></b>
              <br></br>
              <div className="athletes-section my-4">

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {athletes.map((athlete, index) => (
                      <tr key={athlete.athleteId}>
                        <td>{index + 1}</td>
                        <td>{athlete.firstName}{athlete.lastName}</td>
                        <td>{athlete.email}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => handleViewDetails(athlete.athleteId)}
                            className="me-2"
                          >
                            View Profile
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => fetchWeightPlan(athlete.id)}
                          >
                            View Weight Plan
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {selectedAthlete && (
                  <Dialog
                    open={profileModalOpen}
                    onClose={handleCloseProfileModal}
                    maxWidth="sm"
                    fullWidth
                  >
                    <DialogTitle style={{ textAlign: "center" }}>Athlete Profile</DialogTitle>
                    <DialogContent
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={
                          selectedAthlete.photoBase64
                            ? `data:image/jpeg;base64,${selectedAthlete.photoBase64}`
                            : "/default-profile.jpg"
                        }
                        alt="Athlete"
                        style={{ paddingLeft: "3%", width: "400px", height: "220px" }}
                      />
                      <Typography variant="h6">
                        Name: {selectedAthlete.firstName} {selectedAthlete.lastName}
                      </Typography>
                      <Typography variant="h6">Gender: {selectedAthlete.gender} </Typography>
                      <Typography variant="h6">Height: {selectedAthlete.height} </Typography>
                      <Typography variant="h6">Weight: {selectedAthlete.weight} </Typography>

                      <Typography variant="h6">Category: {selectedAthlete.category}</Typography>




                      <div>

                      </div>
                      <Button
                        onClick={handleCloseProfileModal}
                        variant="contained"
                        style={{ marginTop: "15px" }}
                      >
                        Close
                      </Button>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
            <div id="athleteProfile">
              {currentAthleteProfile && (
                <div>
                  <br></br>
                  <b><h1 style={{ fontSize: '36px', color: 'white', textAlign: 'center' }}>{currentAthleteProfile.firstName}</h1></b>
                  <br></br>
                  <img
                    src={
                      currentAthleteProfile.photoBase64
                        ? `data:image/jpeg;base64,${currentAthleteProfile.photoBase64}`
                        : "/default-profile.jpg"
                    }
                    alt="Athlete"
                    style={{ paddingLeft: "3%", width: "400px", height: "220px" }}
                  />
                  <Typography variant="h6">
                    Name: {currentAthleteProfile.firstName} {currentAthleteProfile.lastName}
                  </Typography>
                  <Typography variant="h6">Gender: {currentAthleteProfile.gender} </Typography>
                  <Typography variant="h6">Height: {currentAthleteProfile.height} </Typography>
                  <Typography variant="h6">Weight: {currentAthleteProfile.weight} </Typography>

                  <Typography variant="h6">Category: {currentAthleteProfile.category}</Typography>

                  <h4 style={styles2.sectionTitle}>Weight Plan</h4>

                  {weightPlan ? (
                    <>

                      <div style={styles2.section}>


                        <>
                          <p>
                            <strong>Plan ID:</strong> {weightPlan.planId}
                          </p>
                          <p>
                            <strong>Start Weight:</strong> {weightPlan.startWeight} kg
                          </p>
                          <p>
                            <strong>Target Weight:</strong> {weightPlan.targetWeight} kg
                          </p>
                          <p>
                            <strong>Preference:</strong> {weightPlan.preference}
                          </p>
                          <p>
                            <strong>Daily Calorie Goal:</strong> {weightPlan.dailyCalorieGoal} kcal
                          </p>
                        </>

                      </div>


                    </>
                  ) : (
                    <p style={styles2.emptyText}>No weight plan available</p>
                  )}

                  <div>
                    <button
                      onClick={() => setShowModal2(true)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Create Weight Plan
                    </button>

                    {showModal2 && (
                      <div
                        style={{
                          position: "fixed",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: "1000",
                          backgroundColor: "#fff",
                          padding: "20px",
                          borderRadius: "8px",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                          width: "400px",
                        }}
                      >
                        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                          Create Weight Plan
                        </h2>
                        <form onSubmit={()=>handleSubmit(currentAthleteProfile.athleteId)}>
                          <div style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>
                              Start Weight
                            </label>
                            <input
                              type="number"
                              name="startWeight"
                              value={formData2.startWeight}
                              onChange={handleInputChange2}
                              required
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>
                              Target Weight
                            </label>
                            <input
                              type="number"
                              name="targetWeight"
                              value={formData2.targetWeight}
                              onChange={handleInputChange2}
                              required
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>
                              Preference
                            </label>
                            <input
                              type="text"
                              name="preference"
                              value={formData2.preference}
                              onChange={handleInputChange2}
                              required
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                          <div style={{ marginBottom: "15px" }}>
                            <label style={{ display: "block", marginBottom: "5px" }}>
                              Daily Calorie Goal
                            </label>
                            <input
                              type="number"
                              name="dailyCalorieGoal"
                              value={formData2.dailyCalorieGoal}
                              onChange={handleInputChange2}
                              required
                              style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                          <button
                            type="submit"
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#28A745",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              width: "100%",
                            }}
                          >
                            Submit
                          </button>
                        </form>
                        <button
                          onClick={() => setShowModal2(false)}
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#DC3545",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            marginTop: "10px",
                            width: "100%",
                          }}
                        >
                          Close
                        </button>
                      </div>
                    )}

                    {showModal2 && (
                      <div
                        onClick={() => setShowModal2(false)}
                        style={{
                          position: "fixed",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          zIndex: "999",
                        }}
                      ></div>
                    )}
                  </div>




                </div>
              )}
            </div>


          </>
        )}


      </div>

      {/* Modals (Reuse existing modal code here) */}
    </div>

  );
};

export default CoachDashboard;



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


const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,  // Ensure modal is on top
};

const modalContentStyles = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "12px",
  width: "80%",
  maxWidth: "600px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  animation: "fadeIn 0.3s ease-in-out",
};

const modalTitleStyles = {
  textAlign: "center",
  fontSize: "34px",
  color: "#333",
  marginBottom: "20px",
};

const labelStyles = {
  display: "block",
  marginBottom: "15px",
  fontSize: "16px",
  color: "#555",
};

const requiredStyles = {
  color: "red",
};

const inputStyles = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "16px",
  color: "#333",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.3s",
};

const inputFocusStyles = {
  borderColor: "#3498db",
};

const buttonContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const buttonStyles = {
  padding: "12px 20px",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  width: "48%", // Button width to make them align horizontally
  textAlign: "center",
};

// Add a fade-in animation to the modal
const fadeInKeyframes = `@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`;
document.styleSheets[0].insertRule(fadeInKeyframes, 0);
