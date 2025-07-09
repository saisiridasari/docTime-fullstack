import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 <strong>docTime</strong>. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/appointments">Appointments</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
