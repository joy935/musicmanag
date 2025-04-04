"use client";

import Header from "../../components/ui/Header";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Playlist {
    id: string;
    playlist: string;
    description?: string;
}

interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    releaseYear: number;
}

export default function MyPlaylist() {

    const [playlistInfo, setPlaylistInfo] = useState<Playlist | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const params = useParams();
    const playlistId = params.id as string;
    
    const router = useRouter();
    
    useEffect(() => {
        const fetchPlaylistAndSongs = async () => {
            try {
                // fetch the playlist
                const playlist = doc(db, "playlists", playlistId);
                const playlistDoc = await getDoc(playlist);
        
                if (!playlistDoc.exists()) {
                setError("Playlist not found.");
                return;
                }

                const playlistData = playlistDoc.data() as Omit<Playlist, "id">;
                setPlaylistInfo({ id: playlistDoc.id, ...playlistData });
        
                // fetch songs from subcollection
                const songs = collection(db, "playlists", playlistId, "songs");
                const songsDoc = await getDocs(songs);
                const songsData = songsDoc.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() as Omit<Song, "id">,
                }));
        
                setSongs(songsData);
            } catch (err) {
                setError("Failed to fetch playlist and songs.");
                console.error(err);
            } finally {
                setLoading(false);
            }
            };
        
            fetchPlaylistAndSongs();
        }, [playlistId]);
    

    // remove song from playlist
    const removeSong = async (songId: string) => {
        try {
            const songRef = doc(db, "playlists", playlistId, "songs", songId);
            await deleteDoc(songRef);
            setSongs(songs.filter((song) => song.id !== songId));
        } catch (err) {
            setError("Failed to remove song.");
            console.error(err);
        }
    }; 

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4">
            <div className="w-full max-w-md space-y-6">

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Playlist Info */}
                {playlistInfo && (
                <div className="text-center">
                <h2 className="text-2xl font-semibold text-center">{playlistInfo.playlist}</h2>
                <p className="text-xl text-gray-600">{playlistInfo.description}</p>
                </div>
                )}

                {/* Display songs from the playlist */}
                <div className="mt-6">
                    {songs.length === 0 ? (
                    <p className="text-sm text-gray-500">No songs yet.</p>
                    ) : (
                    <ul className="space-y-4">
                        {songs.map((song) => (
                        <li key={song.id} className="bg-white p-4 rounded-xl shadow">
                            <p className="font-semibold">{song.title}</p>
                            <p className="text-sm text-gray-600">{song.artist}</p>
                            <p className="text-sm text-gray-500">Album: {song.album}</p>
                            <p className="text-sm text-gray-400">Released: {song.releaseYear}</p>
                            {/* Remove a song from the playlist */}
                            <button className="mt-2 bg-blue text-white px-4 py-2 rounded-full hover:bg-brown"
                            onClick={() => removeSong(song.id)}>
                                Remove
                            </button>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>

                {/* Add Songs Button */}
                <button className="mt-6 bg-orange text-white px-4 py-2 rounded-full hover:bg-brown"
                onClick={() => router.push(`/playlists/${playlistId}`)}>
                    Add Songs
                </button>
            </div>
    </main>
    );
}