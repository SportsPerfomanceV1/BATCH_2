 // src/EventList.js
import React from 'react';

const EventList = () => {
  const events = [
    { id: 1, name: 'Running Marathon', date: '2023-11-01' },
    { id: 2, name: 'Swimming Competition', date: '2023-12-01' },
  ];

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
          {event.name} - Date: {event.date}
        </li>
      ))}
    </ul>
  );
};

export default EventList;
