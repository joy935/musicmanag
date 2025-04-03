"use client";

import Header from "../../components/ui/Header";
import { db, collection } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { getDocs, addDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function AddToPlaylist() {

    const [allSongs, setAllSongs] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [filteredSongs, setFilteredSongs] = useState<any[]>([]);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const params = useParams();
    const playlistId = params.id as string;

    /* fetch and display all the songs from firebase */
    useEffect(() => {
        const fetchSongs = async () => {
        try {
            const songsCollection = collection(db, "songs");
            const songsSnapshot = await getDocs(songsCollection);
            const songsData = songsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setAllSongs(songsData);
            setFilteredSongs(songsData);
        } catch (err) {
            setError("Failed to fetch songs.");
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchSongs();
    }, []);

    /* handle searching for a specific song */
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearch(query);
        const filteredSongs = allSongs.filter((song) =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.album.toLowerCase().includes(query)
            );
        setFilteredSongs(filteredSongs);
    };

    /* add a song to the playlist */
    const addToPlaylist = async (song: any) => {

        if (!playlistId) {
            setError("No playlist selected.");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }

        const songToAdd = {
        // Create a new object with the song details
            id: song.id,
            title: song.title,
            artist: song.artist,
            album: song.album,
            releaseYear: song.releaseYear
        };

        // Add the song to the playlist
        try {
            const playlistCollection = collection(db, "playlists", playlistId, "songs");
            
            // check if the song already exists in the playlist
            const playlistSnapshot = await getDocs(playlistCollection);
            const playlistData = playlistSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const songExists = playlistData.some((item) => item.id === songToAdd.id);
            if (songExists) {
                setError("Song already exists in the playlist.");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            
            // add the song to the playlist
            await addDoc(playlistCollection, songToAdd);
            setSuccess(true);
        }
        catch (err) {
            setError("Failed to add song to playlist.");
            console.error(err);
        }
        finally {
            setTimeout(() => {
                setSuccess(false);
            }
            , 2000);
        }  
    }; 

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
            <Header />
            <div className="w-full max-w-md space-y-6">
                <h1>Add songs to your playlist!</h1>
                <input
                type="text"
                placeholder="Search a song..."
                className="w-full px-5 py-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent placeholder-gray-400 text-lg"
                value={search} 
                onChange={handleSearch}/>

                {loading}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Song added to playlist!</p>}

                {/* display all the songs or the searched songs */}
                {!loading && !error && (
                <ul className="space-y-4">
                    {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => (
                        <li key={song.id} className="p-4 bg-white rounded-xl shadow">
                        <p className="text-lg font-semibold">{song.title}</p>
                        <p className="text-sm text-gray-600">Artist: {song.artist}</p>
                        <p className="text-sm text-gray-600">Album: {song.album}</p>
                        <p className="text-sm text-gray-500">Released: {song.releaseYear}</p>
                        <button className="mt-2 px-4 py-2 bg-blue text-white rounded-full hover:bg-orange transition duration-200"
                        onClick={() => addToPlaylist(song)}>
                            Add to Playlist
                        </button>
                        </li>
                    ))
                    ) : (
                    <p className="text-center text-gray-500">No songs found.</p>
                    )}
                </ul>
                )}

            </div>
        </main>
    );
}