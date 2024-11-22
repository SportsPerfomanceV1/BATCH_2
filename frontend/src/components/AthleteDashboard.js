import React, { useState, useEffect} from 'react';
import { Box, Button ,Typography, AppBar, Toolbar} from "@mui/material";
import { useNavigate ,Link} from 'react-router-dom';
import { format, parseISO} from 'date-fns';
import LoginIcon from "@mui/icons-material/Login";
import '../styles/athlete.css';

function AthleteDashboard() {
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);
  const [events, setEvents] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [currentSection, setCurrentSection] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
    loadAllCoaches();
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
      const data = await response.json();
      const parsedDate = parseISO(data.birthDate); // Parsing the date string to Date object
      const formattedDate = (parsedDate.getMonth() + 1).toString().padStart(2, '0') + '/' + 
      parsedDate.getDate().toString().padStart(2, '0') + '/' + 
      parsedDate.getFullYear();
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
      console.log(data);
      console.log(data.eventId);
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };
  const loadAllCoaches = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/coach', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      const data = await response.json();
      console.log(data);
      setCoaches(data);
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
    switch (selectedTab) {
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
                            <Button className="logout-button"  onClick={() => setCurrentSection('myEvents')}>
                            My Events
                            </Button>
                        </Link>
                        <Link to="" className="logout-link">
                            <Button className="logout-button"  onClick={() => setCurrentSection('coach')}>
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
           <div className="transition-container">
          <div className="profile-section">
            {athlete && (
              <>
                <img
                  // src={`${athlete.photoUrl || '/default-profile.jpg'}`}
                  src={athlete.photoBase64 ? `data:image/jpeg;base64,${athlete.photoBase64}` : '/default-profile.jpg'}
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
                  <p>Coach: {athlete.coach || "N/A"}</p>
                  <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
              </>
            )}
          </div>
          </div>
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
                <label>
                  <input
                    type="text"
                    name="coach"
                    value={updatedProfile.coach}
                    onChange={handleProfileChange}
                    placeholder=''
                  />
                  <span>Coach</span>
                </label>
                <label>
                  Profile Image:
                  <input
                    type="file"
                    className='file-input'
                    onChange={handleImageChange}
                  />
                </label>
               
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
            <h2 style={{textAlign:'center '}}>ALL EVENTS</h2>
            <div className="events-container">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <img 
                  src={event.imageBase64 ? `data:image/jpeg;base64,${event.imageBase64}` : '/default-profile.jpg'}
                  alt={event.eventTitle} onClick={() => handleViewEvent(event)} />
                  <h3 style={{textAlign:'center'}}>{event.eventTitle}</h3>
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
    <div className="modal-content" style={{height:'90%'}}>
      <h2>{selectedEvent.eventTitle}</h2>
      <img src={selectedEvent.imageBase64 ? `data:image/jpeg;base64,${selectedEvent.imageBase64}` : '/default-profile.jpg'}
       alt={selectedEvent.eventTitle} onClick={() => handleViewEvent(selectedEvent)} width={'385px'} height={'200px'} style={
        {
          paddingLeft:"5%"
        }
       }/>
      <p>Meet: {selectedEvent.meetId.meetName}</p>
      <p>Category: {selectedEvent.category}</p>
      <p>Description: {selectedEvent.description}</p>
      <p>Location: {selectedEvent.location}</p>
      <p>Event Date: {selectedEvent.eventDate.split('T')[0]}</p>
      <textarea placeholder="Remarks (optional)" value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
      <p></p>
      
      <button onClick={() => handleRegisterForEvent(selectedEvent.eventId)} style={{width:'210px',marginRight:'13px'}}>Register</button>
      <button onClick={handleCloseModal} style={{width:'210px'}}>Close</button>
    </div>
  </div>
)}

{registeringEvent && (
          <div className="modal" >
            <div className="modal-content" style={{width:'400px',height:'300px',textAlign:'center'}}>
              <h1>Register for {registeringEvent.eventTitle}</h1>
              <textarea placeholder="Add your remark" required value={remark} onChange={(e) => setRemark(e.target.value)}></textarea>
              <p></p>
              <button onClick={() => handleRegisterForEvent(registeringEvent.eventId)} style={{width:'150px',marginRight:'15px'}}>Submit</button>
              <button onClick={handleCloseModal} style={{width:'150px',marginRight:'15px'}}>Cancel</button>
            </div>
          </div>
        )}
        {showSuccessPopup && (
      <div className="modal">
        <div className="modal-content" style={{ textAlign: 'center' , height:'200px'}}>
          <h2>Registration Successful!</h2>
          <p>You have successfully registered for the event.</p>
          <button onClick={closeSuccessPopup} style={{ marginTop: '20px' }}>OK</button>
        </div>
      </div>
    )}

{currentSection === 'myEvents' && (
   <div className="transition-container">
          <div className="my-events-section">
            <h2 style={{textAlign:'center'}}>MY EVENTS</h2>
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
    </tr>
  </thead>
  <tbody>
    {filterMyEvents().map((regis) => (
      <tr key={regis.id}>
        <td>{regis.eventName}</td>
        <td>{regis.meetName}</td>
        <td>{regis.registrationDate.split('T')[0]}</td>
        <td>{regis.status}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
          </div>
        )}

        {currentSection === 'coach' && (
          <div className="transition-container">
          <div className="events-section">
            <h2 style={{textAlign:'center '}}>COACHES</h2>
            <div className="events-container">
             
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );

}
export default AthleteDashboard;