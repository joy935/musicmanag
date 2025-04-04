"use client"

import './globals.css';
import Link from 'next/link';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/app/lib/firebase";

export default function Home() {

    useEffect(() => {
      // check if user is logged in
      const unsubscribe = onAuthStateChanged(auth, () => {});
      return () => unsubscribe();
    }, []);

    return (
      <main className="min-h-screen bg-background flex flex-col items-center px-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/playlists" className="block">
          <button className="w-full px-5 py-4 rounded-full bg-blue text-white text-lg font-semibold shadow-md hover:bg-orange transition duration-200">
          Create a playlist</button>
        </Link>
      </div>
    </main>

    );
}
