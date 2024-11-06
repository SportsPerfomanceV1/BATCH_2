// src/UserPage.js
import React from 'react';
import EventList from './EventList';
import RegistrationForm from './RegistrationForm';
import AthleteProfile from './AthleteProfile';

const UserPage = () => {
  return (
    <div>
      <h1>User Page</h1>
      <h2>My Events</h2>
      <EventList />

      <h2>Register for an Event</h2>
      <RegistrationForm />

      <h2>Athlete Profile</h2>
      <AthleteProfile />
    </div>
  );
};

export default UserPage;
