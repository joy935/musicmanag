import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

//const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, addDoc, auth };