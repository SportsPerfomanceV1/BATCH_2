// src/Homepage.js
import React from 'react';
import './homepage.css';
const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      
      <section>
        <h2>Latest Events</h2>
        <ul>
          <li>Event 1: Running Marathon - Date: 2023-11-01</li>
          <li>Event 2: Swimming Competition - Date: 2023-12-01</li>
          <li>Event 3: Cycling Race - Date: 2023-10-30</li>
        </ul>
      </section>

      <section>
        <h2>Results</h2>
        <ul>
          <li>Marathon: John Doe - 1st Place</li>
          <li>Swimming: Jane Smith - 1st Place</li>
        </ul>
      </section>

      <section>
        <h2>Coaches</h2>
        <ul>
          <li>Coach A: Sprinting Coach</li>
          <li>Coach B: Swimming Coach</li>
        </ul>
      </section>

      <section>
        <h2>Athletes</h2>
        <ul>
          <li>Athlete X: Gold Medalist in Sprinting</li>
          <li>Athlete Y: Silver Medalist in Swimming</li>
        </ul>
      </section>
    </div>
  );
};

export default Homepage;
