"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            router.push(callbackUrl);
        })
        .then(() => {
            setSuccess("User logged in successfully");
        })
        .catch(() => {
            setError("Failed to log in. Please check your email and password.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <form className="w-full max-w-sm space-y-6 p-6 bg-white rounded-xl shadow-lg"
                onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold text-center">Log In</h1>

                    {loading && <p>Loading...</p>}

                    <div className="space-y-4">
                        <div className="border border-gray-300 rounded-full px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="email" type="email" name="email" placeholder="Email address" required
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="border border-gray-300 rounded-full px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="password" type="password" name="password" placeholder="Password" minLength={6} required
                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <input type="hidden" name="redirectTo" value={callbackUrl} />

                    <div className="flex justify-center">
                        <button type="submit" className="w-full px-6 py-3 bg-brown text-white font-medium text-sm rounded-full hover:bg-orange transition duration-200">
                        Log in</button>
                    </div>

                    <hr className="border-t border-gray-200" />

                    <div className="text-center">
                        <p className="text-sm mb-3">Not a member yet?</p>
                        <Link href="/signup">
                            <button type="button" className="w-full px-6 py-3 border border-brown text-black font-medium text-sm rounded-full hover:bg-brown transition duration-200">
                            Sign up</button>
                        </Link>
                    </div>
                    { success && <div className="mt-4 text-green-500">{success}</div> }
                    { error && <div className="mt-4 text-red-500">{error}</div> }
                </form>
    );
    }