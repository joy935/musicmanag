"use client";

import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // check if user is logged in
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <header className="w-full bg-blue py-6 shadow-md mb-10">
            <h1 className="text-center text-3xl font-bold text-white">
                Music Playlist Manager
            </h1>
            <nav className="flex justify-center mt-4">
                <Link href="/" className="text-white mx-4 rounded-xl p-2 hover:bg-brown">Home</Link>
                <Link href="/my-playlists" className="text-white mx-4 rounded-xl p-2 hover:bg-brown">View Playlists</Link>

                {/* check if the user is logged in to display either the logout link or the login and sign up links */}
                {!user ? (
                    <>
                        <Link href="/login" className="text-white rounded-xl mx-4 p-2 hover:bg-brown">Login</Link>
                        <Link href="/signup" className="text-white rounded-xl mx-4 p-2 hover:bg-brown">Sign Up</Link>
                    </>
                ) : (
                    <button onClick={() =>
                            signOut(auth)
                            .then(() => console.log("User signed out"))
                            .catch((error) => console.error("Error signing out: ", error))}
                        className="text-white rounded-xl mx-4 p-2 hover:bg-brown">
                        Logout
                    </button>
                )}
            </nav>
        </header>
    );
}
