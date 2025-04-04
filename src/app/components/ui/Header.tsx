export default function Header() {
    return (
    <header className="w-full bg-blue py-6 shadow-md mb-10">
        <h1 className="text-center text-3xl font-bold text-white">
            Music Playlist Manager
        </h1>
        <nav className="flex justify-center mt-4">
            <a href="/" className="text-white mx-4 hover:text-gray-200">Home</a>
            <a href="/my-playlists" className="text-white mx-4 hover:text-gray-200">View Playlists</a>
            <a href="/login" className="text-white mx-4 hover:text-gray-200">Login</a>
            <a href="/signup" className="text-white mx-4 hover:text-gray-200">Sign Up</a>
        </nav>
    </header>
    );
}