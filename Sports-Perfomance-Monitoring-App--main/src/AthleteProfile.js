// src/AthleteProfile.js
import React from 'react';

const AthleteProfile = () => {
  const athlete = {
    name: 'John Doe',
    age: 25,
    achievements: ['Gold Medalist in Sprinting', 'Marathon Winner'],
  };

  return (
    <div>
      <h3>{athlete.name}</h3>
      <p>Age: {athlete.age}</p>
      <h4>Achievements:</h4>
      <ul>
        {athlete.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
};

export default AthleteProfile;
