import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Login from './pages/Login';
import Register from './pages/Register';

// ✅ Get API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors apiUrl={API_BASE_URL} />} />
          <Route path="/appointments" element={<Appointments apiUrl={API_BASE_URL} />} />
          <Route path="/login" element={<Login apiUrl={API_BASE_URL} />} />
          <Route path="/register" element={<Register apiUrl={API_BASE_URL} />} />

          {/* Fallback for undefined routes */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: 'center', marginTop: '50px' }}>
                404 - Page Not Found
              </h2>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
