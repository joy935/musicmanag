// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);