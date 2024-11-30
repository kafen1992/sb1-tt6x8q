import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import 'react-day-picker/dist/style.css';

interface Availability {
  date: string;
  available: boolean;
}

export function Calendar() {
  const [availableDates, setAvailableDates] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAvailability() {
      const availabilityRef = collection(db, 'availability');
      const snapshot = await getDocs(query(availabilityRef));
      const dates = snapshot.docs.map(doc => ({
        date: doc.id,
        ...doc.data()
      } as Availability));
      setAvailableDates(dates);
      setLoading(false);
    }

    fetchAvailability();
  }, []);

  const disabledDays = availableDates
    .filter(d => !d.available)
    .map(d => new Date(d.date));

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Availability Calendar</h1>
        <div className="bg-white rounded-lg p-4">
          <DayPicker
            mode="single"
            disabled={disabledDays}
            className="!text-gray-900"
          />
        </div>
        <p className="text-center mt-4 text-gray-400">
          Green dates are available for booking
        </p>
      </div>
    </div>
  );
}