export default function Signin() {
    return (
        <main className="flex items-center justify-center md:h-screen py-6">  
            <form className="w-full max-w-sm space-y-5 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-semibold text-center">Sign in</h1>
            <div className="flex-1 space-y-4">
                <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <input className="w-full bg-transparent outline-none text-sm" id="username" type="text" name="username" placeholder="Username" required />
                </div>
            </div>
            <div className="flex-1 space-y-4">
                <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <input className="w-full bg-transparent outline-none text-sm" id="email" type="email" name="email" placeholder="Email address" required />
                </div>
                <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <input className="w-full bg-transparent outline-none text-sm" id="password" type="password" name="password" placeholder="Password" minLength={6} required />
                </div>
            </div>
            <div className="flex justify-center">
                <input type="hidden" name="redirectTo"/>
                <button className="px-4 py-2 rounded transition bg-orange hover:bg-blue">Sign in</button>
            </div>
        </form>
        </main>
    );
}