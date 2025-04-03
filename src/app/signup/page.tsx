"use client";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, collection, addDoc } from "@/app/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";

export default function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const auth = getAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // create user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // signed up
                const user = userCredential.user;
                setUser(user);
                // redirect to home page
                router.push("/login");
                // add user to Firestore
                const userRef = collection(db, "users");
                return addDoc(userRef, {
                    username: username,
                    email: email,
                });
            })
            .then(() => {
                setSuccess("User created successfully");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
            .finally(() => {
                setLoading(false);
            });
            
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4 py-16">
            <div className="w-full max-w-md space-y-6">
                <form className="w-full max-w-sm space-y-6 p-6 bg-white rounded-xl shadow-lg"
                onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold text-center">Create Your Account</h1>

                    <div className="space-y-4">
                        <div className="border border-gray-300 rounded-full px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="username" type="text" name="username" placeholder="Username" required
                            value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="border border-gray-300 rounded-full px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="email" type="email" name="email" placeholder="Email address" required
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="border border-gray-300 rounded-full px-4 py-3">
                            <input className="w-full bg-transparent outline-none text-sm" id="password" type="password" name="password" placeholder="Password" minLength={6} required 
                            value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <input type="hidden" name="redirectTo" />

                    <div className="flex justify-center">
                        <button type="submit" className="w-full px-6 py-3 bg-orange text-white font-medium text-sm rounded-full hover:bg-blue transition duration-200" 
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
