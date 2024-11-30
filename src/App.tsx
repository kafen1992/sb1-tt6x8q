import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Calendar } from './pages/Calendar';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}