'use client'

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });

        if (result.error) {
            setError('Invalid username or password');
        } else {
            // Fetch user session data to determine school and role
            const response = await fetch('/api/auth/session');
            const session = await response.json();

            if (session?.user) {
                const { school, role } = session.user;

                // Construct the dynamic redirect path
                const redirectPath = `/${school.toLowerCase()}/${role.toLowerCase()}`;
                router.push(redirectPath); // Navigate to the specific page
            } else {
                router.push('/'); // Fallback in case session data is missing
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)} />
            <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />

            <button className="bg-black text-white font-bold cursor-pointer px-6 py-2">Login</button>

            {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                </div>
            )}

            <Link href={'/register'}>
                Don't have an account? <span className="underline">Register</span>
            </Link>
        </form>
    )
}