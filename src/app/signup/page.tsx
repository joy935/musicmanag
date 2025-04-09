"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
    // set up states for username, email, password, error, success, and loading
    // to manage the user information and display messages to the user
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // get the auth instance and router instance
    const router = useRouter();

    /* handleSubmit function to create a user
    with the email and password
    and then redirect to the login page */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                // redirect to login page
                router.push("/login");
            })
            .then(() => {
                setSuccess("User created successfully");
            })
            .catch ((err) => { 
                console.error("Signup error:", err.code, err.message);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4">
            <div className="w-full max-w-md space-y-6">
                <form className="w-full space-y-6 p-6"
                onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold text-center">Create Your Account</h1>

                    <div className="space-y-4">
                        <div className="border border-gray-300 rounded-xl px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="username" type="text" name="username" placeholder="Username" required
                            value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="border border-gray-300 rounded-xl px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="email" type="email" name="email" placeholder="Email address" required
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="border border-gray-300 rounded-xl px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="password" type="password" name="password" placeholder="Password" minLength={6} required 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters.</p>
                    </div>

                    <input type="hidden" name="redirectTo" />

                    <div className="flex justify-center">
                        <button type="submit" className="w-full px-6 py-3 border border-brown text-black font-medium text-sm rounded-full hover:bg-brown transition duration-200" 
                        disabled={loading}>
                        Sign up
                        </button>
                    </div>

                    { success && <div className="mt-4 text-green-500">{success}</div> }
                    { error && <div className="mt-4 text-red-500">{error}</div> }
                </form>
            </div>
        </main>
    );
}
