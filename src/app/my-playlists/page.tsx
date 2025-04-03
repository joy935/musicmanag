"use client";

import Header from "../components/ui/Header";
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function MyPlaylists() {

    const [allPlaylists, setAllPlaylists] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState<User | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        // check if user is logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
            // user is signed in, set user state
            setUser(user);
            } else {
            // user is signed out, set user state to null
            setUser(null);
            setError("You must be logged in to create a playlist.");
            setLoading(false);
            router.push("/login");
            }
        });
            return () => unsubscribe();
    }
    , []);

    /* fetch and display all the playlists from firebase */
    useEffect(() => {
        const fetchPlaylists = async () => {
        try {
            const playlistsCollection = collection(db, "playlists");
            const playlistsSnapshot = await getDocs(playlistsCollection);
            const playlistsData = playlistsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setAllPlaylists(playlistsData);
        } catch (err) {
            setError("Failed to fetch playlists.");
            console.error(err);
        } finally {
            setLoading(false);
        }
        };
    
        fetchPlaylists();
    }, []);

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
            <Header />
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl font-bold mb-4">My Playlists</h1>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                
                {allPlaylists.length === 0 && !loading && <p>No playlists found.</p>}

                {!loading && allPlaylists.map((playlist) => (
                    <div key={playlist.id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
                        <h2 className="text-xl font-semibold">{playlist.name}</h2>
                        <p>{playlist.description}</p>
                        <button
                            className="mt-4 bg-blue text-white px-4 py-2 rounded-full hover:bg-brown transition duration-200"
                            onClick={() => router.push(`/my-playlists/${playlist.id}`)}>
                            View Playlist
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}