"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

// interface Playlist to define and use 
// the structure of the playlist object
interface Playlist {
    id: string;
    playlist: string;
    description?: string;
    userId: string;
}

export default function MyPlaylists() {
    /* set up states for playlists, loading, error, and user
    to manage the playlists and user information
    and display the playlists to the user */
    const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
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
            setError("You must be logged in to view your playlists.");
            setLoading(false);
            }
        });
            return () => unsubscribe();
    }
    , [router]);

    /* fetch and display all the playlists from firebase */
    useEffect(() => {
        const fetchPlaylists = async () => {
        try {
            const playlistsCollection = collection(db, "playlists");
            const playlistsSnapshot = await getDocs(playlistsCollection);
            const playlistsData = playlistsSnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data() as Omit<Playlist, "id">,
                }))
            .filter((playlist) => playlist.userId === user?.uid); // filter playlists by userId
            setAllPlaylists(playlistsData);
        } catch {
            setError("Failed to fetch playlists.");
        } finally {
            setLoading(false);
        }
        };
    
        fetchPlaylists();
    }, [user?.uid]);

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-2xl font-semibold text-center">My Playlists</h1>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                
                {/* Display a message if no playlists are found */}
                {allPlaylists.length === 0 && !loading && <p>No playlists found.</p>}

                {/* Display the playlists */}
                {!loading && allPlaylists.map((playlist) => (
                    <div key={playlist.id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
                        <h2 className="text-xl font-semibold">{playlist.playlist}</h2>
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