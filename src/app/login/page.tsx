import { Suspense } from "react";
import Login from "../components/ui/Login";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
        <Suspense fallback={<p>Loading login...</p>}>
            <Login />
        </Suspense>
        </main>
    );
}