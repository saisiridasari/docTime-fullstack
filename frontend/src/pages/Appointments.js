import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Appointments.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/appointments`);
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const cancelAppointment = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/appointments/${id}`);
      alert('Appointment cancelled successfully!');
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert('Failed to cancel appointment.');
    }
  };

  return (
    <div>
      <h2>Your Appointments</h2>
      <ul className="appointment-list">
        {appointments.map(appt => (
          <li key={appt.id} className="appointment-item">
            <p><strong>Patient:</strong> {appt.patient}</p>
            <p><strong>Doctor:</strong> {appt.doctor}</p>
            <p><strong>Doctor ID:</strong> {appt.doctor_id || 'N/A'}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <button onClick={() => cancelAppointment(appt.id)} className="cancel-button">
              Cancel Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
