import { Suspense } from "react";
import Login from "../components/ui/Login";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center px-4">
        <Suspense fallback={<p>Loading login...</p>}>
            <Login />
        </Suspense>
        </main>
    );
}