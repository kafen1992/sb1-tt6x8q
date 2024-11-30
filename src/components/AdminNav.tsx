import React from 'react';
import { LogOut } from 'lucide-react';
import { logoutAdmin } from '../lib/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </button>
    </div>
  );
}