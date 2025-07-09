import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Doctors.css';
import DoctorCard from '../components/DoctorCard';
import AppointmentForm from '../components/AppointmentForm';

function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredSpecialization, setFilteredSpecialization] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();

  // Fetch doctors from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        alert("Failed to load doctors. Please check if the backend is running.");
      });
  }, []);

  // Get specialization from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const specialization = params.get('specialization');
    if (specialization) setFilteredSpecialization(specialization);
  }, [location]);

  const handleBook = (doctor) => setSelectedDoctor(doctor);
  const handleCancel = () => setSelectedDoctor(null);

  const handleSubmitAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
    alert("Appointment booked successfully!");
    setSelectedDoctor(null);
  };

  const specializations = [...new Set(doctors.map((doc) => doc.specialization))];

  const renderDoctors = (spec) => {
    const filtered = doctors.filter((doc) => doc.specialization === spec);
    if (filtered.length === 0) return null;

    return (
      <div key={spec} className="specialization-section">
        <h3 className="specialization-title">{spec}</h3>
        <div className="doctor-list">
          {filtered.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onBook={handleBook} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="doctors-page">
      <h2 className="doctors-heading">Find a Specialist</h2>

      {doctors.length === 0 ? (
        <p className="no-doctors">No doctors available at the moment.</p>
      ) : (
        <>
          {filteredSpecialization
            ? renderDoctors(filteredSpecialization)
            : specializations.map(renderDoctors)}
        </>
      )}

      {selectedDoctor && (
        <div className="appointment-modal-overlay">
          <div className="appointment-modal">
            <AppointmentForm
              doctor={selectedDoctor}
              onSubmit={handleSubmitAppointment}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;
