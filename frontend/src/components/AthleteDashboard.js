import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../athlete.css';

function AthleteDashboard() {
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [currentSection, setCurrentSection] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [newImage, setNewImage] = useState(null);
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

  useEffect(() => {
    loadAthleteProfile();
    loadAllEvents();
    loadMyEvents();
  }, []);

  const loadAthleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/athlete/profile', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      const data = await response.json();
      setAthlete(data);
      setUpdatedProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        category: data.category,
        coach: data.coach,
      });
    } catch (error) {
      console.error("Error loading athlete profile:", error);
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

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };

  const handleEditProfile = () => {
    setEditingProfile(true);
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
    formData.append('coach', updatedProfile.coach);
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
        }

      });

      if (response.ok) {
        loadMyEvents(); // Reload my events after registering
      } else {
        console.error('Error registering for event:', response);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  return (
    <div className="athlete-dashboard">
      <header className="header">
        <h1>Athletics</h1>
        <nav>
          <a href="#" onClick={() => setCurrentSection('profile')}>Profile</a>
          <a href="#" onClick={() => setCurrentSection('events')}>Events</a>
          <a href="#" onClick={() => setCurrentSection('myEvents')}>My Events</a>
          <a href="#" onClick={() => setCurrentSection('coach')}>Coach</a>
          <a href="#" onClick={handleLogout}>Logout</a>
        </nav>
      </header>

      <div className="content">
        {currentSection === 'profile' && (
          <div className="profile-section">
            {athlete && (
              <>
                <img
                  src={`${athlete.photoUrl} || '/default-profile.jpg'}`}
                  alt={`${athlete.firstName} ${athlete.lastName}`}
                  className="profile-photo"
                />
                <div className="athlete-info">
                  <h2>{athlete.firstName} {athlete.lastName}</h2>
                  <p>Date of Birth: {athlete.birthDate}</p>
                  <p>Gender: {athlete.gender}</p>
                  <p>Height: {athlete.height}</p>
                  <p>Weight: {athlete.weight}</p>
                  <p>Category: {athlete.category}</p>
                  <p>Coach: {athlete.coach || "N/A"}</p>
                  <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
              </>
            )}
          </div>
        )}

        {editingProfile && currentSection === 'profile' && (
          <div className="edit-profile-section">
            <h3>Edit Profile</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={updatedProfile.firstName}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={updatedProfile.lastName}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="birthDate"
                  value={updatedProfile.birthDate}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={updatedProfile.gender}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Height:
                <input
                  type="text"
                  name="height"
                  value={updatedProfile.height}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Weight:
                <input
                  type="text"
                  name="weight"
                  value={updatedProfile.weight}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={updatedProfile.category}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Coach:
                <input
                  type="text"
                  name="coach"
                  value={updatedProfile.coach}
                  onChange={handleProfileChange}
                />
              </label>
              <label>
                Profile Image:
                <input
                  type="file"
                  onChange={handleImageChange}
                />
              </label>
              <button type="button" onClick={handleSaveProfile}>Save</button>
            </form>
          </div>
        )}

        {currentSection === 'events' && (
          <div className="events-section">
            <h3>All Events</h3>
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.eventId}>
                    <td>{event.eventTitle}</td>
                    <td>{event.eventDescription}</td>
                    <td>{event.eventDate}</td>
                    <td>
                      <button onClick={() => handleRegisterForEvent(event.eventId)}>Register</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentSection === 'myEvents' && (
          <div className="my-events-section">
            <h3>My Events</h3>
            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myEvents.map(registration => (
                  <tr key={registration.eventId}>
                    <td>{registration.event.eventTitle}</td>
                    <td>{registration.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {currentSection === 'coach' && (
          <div className="coach-section">
            <h3>Coach Section</h3>
            <p>Details about the coach will be available here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AthleteDashboard;
