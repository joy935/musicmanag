"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc  } from 'firebase/firestore';
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

    
    useEffect(() => {
        /* fetchPlaylists to fetch and display all the playlists from firebase */
        const fetchPlaylists = async () => {
        try {
            const playlistsCollection = collection(db, "playlists");
            const playlistsSnapshot = await getDocs(playlistsCollection);
            const playlistsData = playlistsSnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data() as Omit<Playlist, "id">, // Omit the playlist id from the type
                }))
            .filter((playlist) => playlist.userId === user?.uid); // filter playlists by userId
            setAllPlaylists(playlistsData); // set the playlists state
        } catch {
            setError("Failed to fetch playlists.");
        } finally {
            setLoading(false);
        }
        };
    
        fetchPlaylists();
    }, [user?.uid]);

    /* handleDelete function to delete a playlist
    This function will be called when the user clicks the delete button
    It will delete the playlist from firebase and update the local state
    to remove the deleted playlist */
    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, "playlists", id));
            // Remove it from local state
            setAllPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
        } catch (err) {
            console.error("Failed to delete playlist:", err);
            setError("Could not delete the playlist. Try again.");
        }
    };

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
                        <button className="mt-4 border border-blue text-black px-4 py-2 mr-2 rounded-xl hover:bg-blue transition duration-200"
                        onClick={() => handleDelete(playlist.id)}>
                            Delete Playlist
                        </button>
                        <button
                            className="mt-4 bg-blue text-white px-4 py-2 rounded-xl hover:bg-brown transition duration-200"
                            onClick={() => router.push(`/my-playlists/${playlist.id}`)}>
                            View Playlist
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}