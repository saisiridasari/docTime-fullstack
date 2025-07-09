import React, { useState, useEffect } from 'react';
import './AppointmentList.css';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error('Error fetching appointments:', err));
  }, []);

  return (
    <div className="appointments">
      {appointments.length === 0 ? (
        <p>Loading appointments...</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id} className="appointment-card">
              <h3>{appt.patient}</h3>
              <p>
                Date: <strong>{appt.date}</strong>
              </p>
              <p>
                Time: <strong>{appt.time}</strong>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentList;
