import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHM_3Vg_3YBhf_EnQwXwvXz8U4XNNpxJk",
  authDomain: "global-sound-web.firebaseapp.com",
  projectId: "global-sound-web",
  storageBucket: "global-sound-web.appspot.com",
  messagingSenderId: "859076034011",
  appId: "1:859076034011:web:5c9b8f9b8f9b8f9b8f9b8f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Custom hook for authentication state
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}