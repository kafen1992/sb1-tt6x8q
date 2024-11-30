import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { storage, db, useAuth } from '../lib/firebase';
import { Navigate } from 'react-router-dom';
import { Upload, Loader, Calendar as CalendarIcon, Tags } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AdminNav } from '../components/AdminNav';
import { DayPicker } from 'react-day-picker';

export function Admin() {
  const { user, loading } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: '',
    description: ''
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      for (const file of files) {
        const fileRef = ref(storage, `media/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        
        await addDoc(collection(db, 'media'), {
          url,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          timestamp: Date.now()
        });
      }
      toast.success('Files uploaded successfully!');
      e.target.value = '';
    } catch (error) {
      toast.error('Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return;
    try {
      await setDoc(doc(db, 'availability', date.toISOString().split('T')[0]), {
        available: true
      });
      toast.success('Date availability updated!');
    } catch (error) {
      toast.error('Error updating availability');
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pricing'), {
        name: newPackage.name,
        price: Number(newPackage.price),
        description: newPackage.description.split('\n')
      });
      setNewPackage({ name: '', price: '', description: '' });
      toast.success('Package added successfully!');
    } catch (error) {
      toast.error('Error adding package');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNav />
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Media Upload Section */}
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Upload Media</h2>
            <label className="block w-full">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="mx-auto w-12 h-12 mb-4" />
                <p className="text-lg mb-2">Click to upload media</p>
                <p className="text-sm text-gray-400">Support images and videos</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
            </label>
            {uploading && (
              <div className="mt-4 flex items-center justify-center">
                <Loader className="w-6 h-6 animate-spin mr-2" />
                <span>Uploading...</span>
              </div>
            )}
          </div>

          {/* Calendar Section */}
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Manage Availability</h2>
            <div className="bg-white rounded-lg p-4">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="!text-gray-900"
              />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-800 p-8 rounded-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Add Price Package</h2>
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Package Name</label>
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (€)</label>
                <input
                  type="number"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (one item per line)</label>
                <textarea
                  value={newPackage.description}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 h-32"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Add Package
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}