// src/RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [eventId, setEventId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    alert(`Registered for event ID: ${eventId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event ID:
        <input type="text" value={eventId} onChange={(e) => setEventId(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
