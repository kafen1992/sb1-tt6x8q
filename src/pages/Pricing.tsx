import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Loader } from 'lucide-react';

interface PricePackage {
  id: string;
  name: string;
  price: number;
  description: string[];
}

export function Pricing() {
  const [packages, setPackages] = useState<PricePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPricing() {
      const pricingRef = collection(db, 'pricing');
      const snapshot = await getDocs(pricingRef);
      const pricePackages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as PricePackage));
      setPackages(pricePackages);
      setLoading(false);
    }

    fetchPricing();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{pkg.name}</h2>
              <p className="text-3xl font-bold mb-6">€{pkg.price}</p>
              <ul className="space-y-2">
                {pkg.description.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}