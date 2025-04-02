"use client"

import './globals.css';
import Header from './components/ui/Header';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function Home() {
  const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      // check if user is logged in
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // user is signed in, set user state
          setUser(user);
        } else {
          // user is signed out, set user state to null
          setUser(null);
        }
      });
    
      return () => unsubscribe();
    }, []);

    return (
      <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
      <Header />
      <div className="w-full max-w-md space-y-6">
        <Link href="/playlist" className="block">
          <button className="w-full px-5 py-4 rounded-full bg-blue text-white text-lg font-semibold shadow-md hover:bg-orange transition duration-200">
          Create a playlist</button>
        </Link>
        <div className="flex gap-4">
          <Link href="/signup" className="w-1/2">
            <button className="w-full px-5 py-4 rounded-full border-2 border-brown text-black text-lg text-center justify-center font-semibold shadow-md hover:bg-brown transition duration-200">
            Sign Up</button>
          </Link>
          <Link href="/login" className="w-1/2">
            <button className="w-full px-5 py-4 rounded-full bg-brown text-white text-lg text-center justify-center font-semibold shadow-md hover:bg-orange transition duration-200">
            Log In</button>
          </Link>
        </div>
        
      </div>
    </main>

    );
}
