import React from 'react';
import { Music } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="w-48 h-48 mb-8">
            <Music className="w-full h-full" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Global Sound</h1>
          <p className="text-2xl text-gray-300 mb-8">Equipment Rental</p>
          <p className="text-xl text-gray-400 max-w-2xl">
            Professional sound equipment rental service for all your events. 
            Quality gear, competitive prices, and exceptional service.
          </p>
        </div>
      </div>
    </div>
  );
}