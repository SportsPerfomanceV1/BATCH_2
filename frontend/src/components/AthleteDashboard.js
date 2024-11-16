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
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [remark, setRemark] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeringEvent, setRegisteringEvent] = useState(null);
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
  const handleOpenRegisterPopup = (event) => setRegisteringEvent(event);

  const handleViewEvent = (event) => setSelectedEvent(event);


  const handleCloseModal = () => {
    setEditingProfile(false); // Close the modal
    setSelectedEvent(null);   // Reset the selected event state
    setRegisteringEvent(null); // Reset the registering event state
    setRemark(''); 
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          remarks: remark
        })
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

  const filterMyEvents = () => {
    switch (selectedTab) {
      case 'Pending':
        return myEvents.filter(event => event.status === 'PENDING');
      case 'Approved':
        return myEvents.filter(event => event.status === 'APPROVED');
      case 'Rejected':
        return myEvents.filter(event => event.status === 'REJECTED');
      default:
        return myEvents;
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
                  src={`${athlete.photoUrl || '/default-profile.jpg'}`}
                
                  className="profile-photo"
                />
                <div className="athlete-info">
                  <p>Name: {athlete.firstName} {athlete.lastName}</p>
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

        {editingProfile && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Profile</h2>
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
                <div className="modal-actions">
                  <button type="button" onClick={handleSaveProfile}>Save</button>
                  <button type="button" onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

{currentSection === 'events' && (
          <div className="events-section">
            <h3>All Events</h3>
            <div className="events-container">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <img src={event.imageUrl || '/default-event.jpg'} alt={event.eventTitle} onClick={() => handleViewEvent(event)} />
                  <h4>{event.eventTitle}</h4>
                  <p>Meet: {event.meetId.meetName}</p>
                  <p>Category: {event.category}</p>
                  <button onClick={() => handleViewEvent(event)}>View</button>
                  <button onClick={() => handleOpenRegisterPopup(event)}>Register</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedEvent && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedEvent.eventTitle}</h2>
              <p>Meet: {selectedEvent.meetId.meetName}</p>
              <p>Category: {selectedEvent.category}</p>
              <p>Description: {selectedEvent.description}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Event Date: {selectedEvent.eventDate}</p>
              <textarea placeholder="Remarks (optional)" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
              <button onClick={() => handleRegisterForEvent(selectedEvent.eventId)}>Register</button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}

        {registeringEvent && (
          <div className="modal">
            <div className="modal-content">
              <h3>Register for {registeringEvent.eventTitle}</h3>
              <textarea placeholder="Add your remark" required value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
              <button onClick={() => handleRegisterForEvent(registeringEvent.eventId)}>Submit</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        )}

        {currentSection === 'myEvents' && (
          <div className="my-events-section">
            <h3>My Events</h3>
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
            {filterMyEvents().map(regis => (
              <div key={regis.id} className="event">
                <h4>{regis.event.eventTitle}</h4>
                <p>Status: {regis.status}</p>
              </div>
            ))}
          </div>
        )}

        {currentSection === 'coach' && (
          <div className="coach-section">
            <h3>Coaches</h3>
            {athlete?.coach && (
              <div className="coach-profile">
                <p>Name: {athlete.coach}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AthleteDashboard;
