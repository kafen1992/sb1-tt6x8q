import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Calendar as CalendarIcon, Tags } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Global Sound</Link>
        <div className="flex gap-6">
          <Link to="/events" className="hover:text-gray-300">Events</Link>
          <Link to="/calendar" className="hover:text-gray-300 flex items-center">
            <CalendarIcon className="inline mr-1" size={20} />
            Calendar
          </Link>
          <Link to="/pricing" className="hover:text-gray-300 flex items-center">
            <Tags className="inline mr-1" size={20} />
            Pricing
          </Link>
          <a 
            href="https://www.instagram.com/globalsoundportillo?igsh=cnAycDZoajU2ZXAz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Instagram className="inline mr-1" size={20} />
            Instagram
          </a>
          <a 
            href="https://wa.me/34636177308"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Phone className="inline mr-1" size={20} />
            WhatsApp
          </a>
          <Link to="/login" className="hover:text-gray-300">Admin</Link>
        </div>
      </div>
    </nav>
  );
}