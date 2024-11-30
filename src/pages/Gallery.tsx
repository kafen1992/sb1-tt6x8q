import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MediaGrid } from '../components/MediaGrid';
import { Loader } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  timestamp: number;
}

export function Gallery() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      const mediaRef = collection(db, 'media');
      const q = query(mediaRef, orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const mediaItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MediaItem));
      setMedia(mediaItems);
      setLoading(false);
    }

    fetchMedia();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Gallery</h1>
        <MediaGrid items={media} />
      </div>
    </div>
  );
}