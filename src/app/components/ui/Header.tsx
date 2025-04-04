"use client";

import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useEffect, useState } from "react";

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
                <a href="/" className="text-white mx-4 hover:text-gray-200">Home</a>
                <a href="/my-playlists" className="text-white mx-4 hover:text-gray-200">View Playlists</a>

                {/* check if the user is logged in to display either the logout link or the login and sign up links */}
                {!user ? (
                    <>
                        <a href="/login" className="text-white mx-4 hover:text-gray-200">Login</a>
                        <a href="/signup" className="text-white mx-4 hover:text-gray-200">Sign Up</a>
                    </>
                ) : (
                    <a onClick={() =>
                            signOut(auth)
                            .then(() => console.log("User signed out"))
                            .catch((error) => console.error("Error signing out: ", error))}
                        className="text-white mx-4 hover:text-gray-200">
                        Logout
                    </a>
                )}
            </nav>
        </header>
    );
}
