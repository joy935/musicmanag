"use client";

import { useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Playlist () {

    const [playlist, setPlaylist] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // create playlist
            const docRef = await addDoc(collection(db, "playlists"), {
                playlist: playlist,
                description: description,
                user: user,
            });
            setSuccess("Playlist created successfully!");
            setPlaylist("");
            setDescription("");
        } catch (error) {
            if (error instanceof Error) {
                setError("Error creating playlist: " + error.message);
            }
            else {
                setError("Error creating playlist: " + String(error));
        }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-2xl font-semibold text-center">Create a Playlist</h1>
                    <input className="w-full px-5 py-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent placeholder-gray-400 text-lg" id="playlist" type="text" name="playlist" placeholder="Playlist Name" value={playlist} required
                    onChange={(e) => setPlaylist(e.target.value)}/>

                    <input className="w-full px-5 py-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent placeholder-gray-400 text-lg" id="description" type="text" name="description" placeholder="Description" value={description}
                    onChange={(e) => setDescription(e.target.value)}/>

                    <button className="w-full px-5 py-4 rounded-full bg-blue text-white text-lg font-semibold shadow-md hover:bg-orange transition duration-200">
                        Create Playlist
                        { loading && <span className="ml-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> }
                    </button>
                </div>
            </form>
            { success && <div className="mt-4 text-green-500">{success}</div> }
            { error && <div className="mt-4 text-red-500">{error}</div> }
        </main>
    );
}