import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorCard.css';

function DoctorCard({ doctor, onBook }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userEmail'); // Check login status

  const handleBooking = () => {
    if (!isLoggedIn) {
      alert("Please login to book an appointment.");
      navigate('/login');
      return;
    }
    onBook(doctor);
  };

  return (
    <div className="doctor-card">
      <h3>{doctor.name}</h3>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Available:</strong> {doctor.available ? 'Yes' : 'No'}</p>
      <button 
        onClick={handleBooking} 
        disabled={!doctor.available}
        className={doctor.available ? 'book-btn' : 'book-btn disabled'}
      >
        {doctor.available ? 'Book Appointment' : 'Not Available'}
      </button>
    </div>
  );
}

export default DoctorCard;
