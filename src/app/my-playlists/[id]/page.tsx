"use client";

import Header from "../../components/ui/Header";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function MyPlaylist() {

    const [playlistInfo, setPlaylistInfo] = useState<any | null>(null);
    const [songs, setSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any | null>(null);
    
    const params = useParams();
    const playlistId = params.id as string;
    
    // const router = useRouter();
    
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
        
                setPlaylistInfo({ id: playlistDoc.id, ...playlistDoc.data() });
        
                // fetch songs from subcollection
                const songs = collection(db, "playlists", playlistId, "songs");
                const songsDoc = await getDocs(songs);
                const songsData = songsDoc.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
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
    
    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
            <Header />
            <div className="w-full max-w-md space-y-6">

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Playlist Info */}
                {playlistInfo && (
                <div className="text-center">
                <h2 className="text-xl font-bold">{playlistInfo.playlist}</h2>
                <p className="text-sm text-gray-600">{playlistInfo.description}</p>
                </div>
                )}

                {/* Songs */}
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
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
    </main>
    );
}