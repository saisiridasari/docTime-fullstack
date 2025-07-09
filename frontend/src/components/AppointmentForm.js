import React, { useState } from 'react';
import axios from 'axios';
import './AppointmentForm.css';

function AppointmentForm({ doctor, onSubmit, onCancel }) {
  const [patient] = useState(localStorage.getItem('userName') || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevents double submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // ⛔ Skip if already submitting
    setIsSubmitting(true);

    console.log('Submitting form...');

    if (!patient) {
      alert('Patient name is not available. Please log in again.');
      setIsSubmitting(false);
      return;
    }

    const newAppointment = {
      patient,
      doctor: doctor.name,
      doctor_id: doctor.id,
      date,
      time
    };

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', newAppointment);

      // ✅ Only show success alert if status is 201
      if (response.status === 201) {
        console.log('Appointment booked:', response.data);

        if (typeof onSubmit === 'function') {
          try {
            onSubmit(response.data); // Call safely
          } catch (err) {
            console.warn('onSubmit threw error:', err);
          }
        }

        alert('Appointment booked successfully!');
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (err) {
      console.error('Axios error:', err);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h3>Book Appointment with Dr. {doctor.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>Your Name</label>
        <input type="text" value={patient} readOnly disabled />

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Time</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <div className="form-buttons">
          <button type="submit" disabled={isSubmitting}>Confirm</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
