import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8DBfymvE60C3ITw4oLtMMI7QRax9ngDM",
  authDomain: "musicmanager-55e66.firebaseapp.com",
  databaseURL: "https://musicmanager-55e66-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "musicmanager-55e66",
  storageBucket: "musicmanager-55e66.firebasestorage.app",
  messagingSenderId: "574446229759",
  appId: "1:574446229759:web:eeef933dddc1bfab3f94ca",
  measurementId: "G-E4HXRD5XKX"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // initialize Firebase only if there are no apps initialized
const db = getFirestore(app); // initialize Firestore
const auth = getAuth(app); // initialize Firebase Authentication

export { db, collection, addDoc, auth };