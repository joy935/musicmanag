export default function Playlist () {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-2xl font-semibold text-center">Create a Playlist</h1>
                <input className="w-full px-5 py-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent placeholder-gray-400 text-lg" id="playlist" type="text" name="playlist" placeholder="Playlist Name" required/>
                <input className="w-full px-5 py-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent placeholder-gray-400 text-lg" id="description" type="text" name="description" placeholder="Description"/>
                <button className="w-full px-5 py-4 rounded-full bg-blue text-white text-lg font-semibold shadow-md hover:bg-orange transition duration-200">
                    Create Playlist
                </button>
            </div>
        </main>
    );
}