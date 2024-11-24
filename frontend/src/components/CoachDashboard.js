import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("profile"); // Default section is Profile
  const [coachProfile, setCoachProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [acceptedAthletes, setAcceptedAthletes] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [dietPlan, setDietPlan] = useState("");
  const [weightPlan, setWeightPlan] = useState("");
  const [athleteMessages, setAthleteMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    firstName: "",
    lastName: "",
    expertise: "",
  });
  const [newImage, setNewImage] = useState(null);
  const token = localStorage.getItem("token"); // Fetch token from localStorage

  useEffect(() => {
    // Load profile data on initial load
    fetchCoachProfile();
    fetchRequests();
    fetchAcceptedAthletes();
    fetchEvents();
  }, []);

  // Fetch Coach Profile
  const fetchCoachProfile = async () => {
    try {
      const response = await fetch("/coach/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCoachProfile(data);
      setUpdatedProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        expertise: data.expertise || "",
      });
    } catch (error) {
      console.error("Error fetching coach profile:", error);
    }
  };

  // Fetch Assistance Requests
  const fetchRequests = async () => {
    try {
      const response = await fetch("/coach/getallassistancereq", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // Fetch Accepted Athletes
  const fetchAcceptedAthletes = async () => {
    try {
      const response = await fetch("/coach/accepted-athletes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAcceptedAthletes(data);
    } catch (error) {
      console.error("Error fetching accepted athletes:", error);
    }
  };

  // Fetch Events
  const fetchEvents = async () => {
    try {
      const response = await fetch("/coach/events", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Accept Assistance Request
  const handleAcceptRequest = async (requestId) => {
    try {
      await fetch(`/coach/assistance/${requestId}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests();
      fetchAcceptedAthletes();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Reject Assistance Request
  const handleRejectRequest = async (requestId) => {
    try {
      await fetch(`/coach/assistance/${requestId}/reject`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchRequests();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // Save Profile
  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("firstName", updatedProfile.firstName);
    formData.append("lastName", updatedProfile.lastName);
    // formData.append("expertise", updatedProfile.expertise);
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
        setEditingProfile(false);
        fetchCoachProfile();
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div className="coach-dashboard">
      <nav>
        <button onClick={() => setCurrentSection("profile")}>Profile</button>
        <button onClick={() => setCurrentSection("requests")}>Requests</button>
        <button onClick={() => setCurrentSection("athletes")}>Athletes</button>
        <button onClick={() => setCurrentSection("events")}>Events</button>
        <button onClick={() => navigate("/*")}>Logout</button>
      </nav>

      {currentSection === "profile" && (
        <div>
          {coachProfile && (
            <div>
              <img
                src={
                  coachProfile.imageBase64
                    ? `data:image/jpeg;base64,${coachProfile.imageBase64}`
                    : "/default-profile.jpg"
                }
                alt="Coach"
              />
              <p>{coachProfile.firstName} {coachProfile.lastName}</p>
              <p>{coachProfile.expertise}</p>
              <button onClick={() => setEditingProfile(true)}>Edit Profile</button>
            </div>
          )}
          {editingProfile && (
            <div>
              <input
                type="text"
                name="firstName"
                value={updatedProfile.firstName}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, firstName: e.target.value })}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={updatedProfile.lastName}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, lastName: e.target.value })}
                placeholder="Last Name"
              />
              <input
                type="text"
                name="expertise"
                value={updatedProfile.expertise}
                onChange={(e) => setUpdatedProfile({ ...updatedProfile, expertise: e.target.value })}
                placeholder="Expertise"
              />
              <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
              <button onClick={handleSaveProfile}>Save</button>
              <button onClick={() => setEditingProfile(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      {currentSection === "requests" && (
        <div>
          <h3>Assistance Requests</h3>
          {requests.map((req) => (
            <div key={req.id}>
              <p>Athlete: {req.athleteName}</p>
              <button onClick={() => handleAcceptRequest(req.id)}>Accept</button>
              <button onClick={() => handleRejectRequest(req.id)}>Reject</button>
            </div>
          ))}
        </div>
      )}

      {/* Add sections for Athletes and Events similarly */}
    </div>
  );
};

export default CoachDashboard;
