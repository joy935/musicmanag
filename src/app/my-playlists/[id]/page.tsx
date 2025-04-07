"use client";

import { db } from "../../lib/firebase";
import { use, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

/* interface Playlist and Song
to define and use the structure of the playlist 
and song objects */
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
    // set up states for playlist info, songs, loading, and error
    const [playlistInfo, setPlaylistInfo] = useState<Playlist | null>(null);
    const [songs, setSongs] = useState<Song[]>([]);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState<string>("");;
    const [error, setError] = useState("");
    
    // get the playlist id from the URL
    const params = useParams();
    const playlistId = params.id as string;
    
    const router = useRouter();
    
    useEffect(() => {
        /* fetch the playlist and songs from firebase
        and set the playlist info and songs state */
        const fetchPlaylistAndSongs = async () => {
            try {
                // fetch the playlist
                const playlist = doc(db, "playlists", playlistId);
                const playlistDoc = await getDoc(playlist);

                // display error if playlist not found
                if (!playlistDoc.exists()) {
                setError("Playlist not found.");
                return;
                }
                
                // set the playlist info state
                // use Omit to exclude the id property from the playlist data
                const playlistData = playlistDoc.data() as Omit<Playlist, "id">;
                setPlaylistInfo({ id: playlistDoc.id, ...playlistData });
        
                // fetch songs from subcollection
                const songs = collection(db, "playlists", playlistId, "songs");
                const songsDoc = await getDocs(songs);
                const songsData = songsDoc.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() as Omit<Song, "id">,
                }));

                // set the songs state
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
    
    // set the edit name and description state when the playlist info changes
    // this is to prefill the input fields with the current playlist name and description
    useEffect(() => {
        if (playlistInfo) {
            setEditName(playlistInfo.playlist);
            setEditDescription(playlistInfo.description || "");
        }
    }
    , [playlistInfo]);

    // update the playlist name and description
    const updatePlaylist = async () => {
        // check if the playlist name and description are empty
        if (!playlistInfo) return;

        try { 
            const playlistRef = doc(db, "playlists", playlistId);
            await updateDoc(playlistRef, {
                playlist: editName,
                description: editDescription,
            });
            setPlaylistInfo({ ...playlistInfo, playlist: editName, description: editDescription });
            setSuccess("Playlist updated successfully.");
            setTimeout(() => {
                setSuccess("");
            }
            , 2000);
            setError("");     
        }
        catch (err) {
            setError("Failed to update playlist.");
            setSuccess("");
            console.error(err);
        }
    };

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
            <div className="mb-4 w-full max-w-md space-y-6">

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}

                {/* Update Playlist Info */}
                {playlistInfo && (
                <div className="text-center">
                    <input className="text-2xl font-semibold text-center"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)} placeholder="Playlist Name"></input>
                    <textarea className="text-xl text-gray-600 block w-full mt-2 p-2 border rounded-lg"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)} placeholder="Playlist Description"></textarea>
                    <button className="mt-2 bg-blue text-white px-4 py-2 rounded-xl hover:bg-brown"
                    onClick={updatePlaylist}>
                        Update Playlist
                    </button>
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
                            <button className="mt-2 bg-blue text-white px-4 py-2 rounded-xl hover:bg-brown"
                            onClick={() => removeSong(song.id)}>
                                Remove
                            </button>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>

                {/* Add Songs Button */}
                <button className="mt-6 bg-orange text-white px-4 py-2 rounded-xl hover:bg-brown"
                onClick={() => router.push(`/playlists/${playlistId}`)}>
                    Add Songs
                </button>
            </div>
    </main>
    );
}