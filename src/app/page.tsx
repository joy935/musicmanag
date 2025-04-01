"use client"

import './globals.css';
import Header from './components/ui/Header';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

// write data
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     email: "maryann@email.com",
//     username: "maryann",
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// get data 

export default function Home() {
  const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    return (
      <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
      <Header />
      <div className="w-full max-w-md space-y-6">
        <input
          type="text"
          placeholder="Search a song..."
          className="w-full px-5 py-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent placeholder-gray-400 text-lg"
        />
        <Link href="/playlist" className="block">
          <button className="w-full px-5 py-4 rounded-full bg-blue text-white text-lg font-semibold shadow-md hover:bg-orange transition duration-200">
          Create a playlist</button>
        </Link>
        
      </div>
    </main>

    );
}
