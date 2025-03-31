"use client"

import { useSearchParams } from "next/navigation";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

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

const app = initializeApp(firebaseConfig);

// write data
function writeUserData(userId: string, username: string, email: string) {
  const db = getDatabase();
  const reference = ref(db, 'users/' + userId);

  set(reference, {
    username: username,
    email: email,
  });
}
writeUserData("123", "Clara", "clara@mail.com")

// get data 

export default function Login() {
  const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    return (
      <main className="flex items-center justify-center md:h-screen py-6">
        <h1>Home</h1>
      </main>
    );
}
