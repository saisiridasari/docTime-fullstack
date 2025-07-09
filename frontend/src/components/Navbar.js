import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>doc<span>Time</span></Link>
      </div>

      <div className="menu-icon" onClick={toggleMenu} aria-label="Toggle menu">
        <div className={menuOpen ? 'bar change' : 'bar'}></div>
        <div className={menuOpen ? 'bar change' : 'bar'}></div>
        <div className={menuOpen ? 'bar change' : 'bar'}></div>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/doctors" onClick={closeMenu}>Doctors</Link></li>
        <li><Link to="/appointments" onClick={closeMenu}>Appointments</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
            <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
          </>
        ) : (
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
