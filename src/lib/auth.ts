import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

const ADMIN_USERNAME = 'sherpa';
const ADMIN_PASSWORD = 'Monchi123';

export async function loginAdmin(username: string, password: string) {
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    throw new Error('Invalid credentials');
  }
  
  // Use a consistent email format for Firebase auth
  return signInWithEmailAndPassword(auth, 'admin@globalsound.com', password);
}

export async function logoutAdmin() {
  return signOut(auth);
}