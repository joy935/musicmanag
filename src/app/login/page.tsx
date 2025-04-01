"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Login() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

return (
    <main className="flex items-center justify-center min-h-screen px-4 py-10 bg-background">
        <form className="w-full max-w-sm space-y-6 p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-2xl font-semibold text-center">Log In</h1>

            <div className="space-y-4">
                <div className="border border-gray-300 rounded-full px-4 py-3">
                    <input className="w-full bg-transparent outline-none text-sm" id="email" type="email" name="email" placeholder="Email address" required/>
                </div>
                <div className="border border-gray-300 rounded-full px-4 py-3">
                    <input className="w-full bg-transparent outline-none text-sm" id="password" type="password" name="password" placeholder="Password" minLength={6} required/>
                </div>
            </div>

            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <div className="flex justify-center">
                <button type="submit" className="w-full px-6 py-3 bg-blue text-white font-medium text-sm rounded-full hover:bg-orange transition duration-200">
                Log in</button>
            </div>

            <hr className="border-t border-gray-200" />

            <div className="text-center">
                <p className="text-sm mb-3">Not a member yet?</p>
                <Link href="/signup">
                    <button type="button" className="w-full px-6 py-3 bg-orange text-white font-medium text-sm rounded-full hover:bg-blue transition duration-200">
                    Sign up</button>
                </Link>
            </div>
        </form>
    </main>
    );
}
