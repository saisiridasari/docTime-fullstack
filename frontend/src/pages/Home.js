import React from 'react';
import './Home.css';
import {
  CalendarCheck, Clock, ShieldCheck, ChatCenteredDots, FileText,
  Heartbeat, Brain, FirstAid, Eye, Baby
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSpecializationClick = (specialization) => {
    navigate(`/doctors?specialization=${specialization}`);
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to docTime</h1>
        <p>Your trusted platform to book doctor appointments instantly.</p>
        <a href="/doctors" className="btn-primary">Book an Appointment</a>
      </section>

      <section className="features">
        <h2>Why Choose docTime?</h2>
        <div className="feature-list">
          <div className="feature-card"><CalendarCheck size={40} color="#ffb703" /><span>Easy Booking</span></div>
          <div className="feature-card"><Clock size={40} color="#ffb703" /><span>Real-Time Availability</span></div>
          <div className="feature-card"><ShieldCheck size={40} color="#ffb703" /><span>Verified Doctors</span></div>
          <div className="feature-card"><ChatCenteredDots size={40} color="#ffb703" /><span>Online Consultations</span></div>
          <div className="feature-card"><FileText size={40} color="#ffb703" /><span>Appointment History</span></div>
        </div>
      </section>

      <section className="specializations">
        <h2>Top Specializations</h2>
        <div className="specialization-list">
          <div className="specialization-card" onClick={() => handleSpecializationClick("Cardiology")}>
            <Heartbeat size={36} /><span>Cardiology</span>
          </div>
          <div className="specialization-card" onClick={() => handleSpecializationClick("Neurology")}>
            <Brain size={36} /><span>Neurology</span>
          </div>
          <div className="specialization-card" onClick={() => handleSpecializationClick("Dentistry")}>
            <FirstAid size={36} /><span>Dentistry</span>
          </div>
          <div className="specialization-card" onClick={() => handleSpecializationClick("Ophthalmology")}>
            <Eye size={36} /><span>Ophthalmology</span>
          </div>
          <div className="specialization-card" onClick={() => handleSpecializationClick("Pediatrics")}>
            <Baby size={36} /><span>Pediatrics</span>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>🔍 Search for a doctor</li>
          <li>📅 Select a time</li>
          <li>✅ Book your appointment</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>“Booking with docTime saved me hours!” — Sarah</blockquote>
        <blockquote>“Simple, fast, and reliable. Highly recommend.” — Arjun</blockquote>
      </section>

      <section className="about-cta">
        <h2>Join thousands of users who trust docTime</h2>
        <a href="/login" className="btn-secondary">Login / Register</a>
      </section>
    </div>
  );
}

export default Home;
