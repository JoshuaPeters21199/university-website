'use client'

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <div>
            <div>
                <div>{session?.user?.name}</div>
                <div>{session?.user?.role}</div>

                <button onClick={() => signOut()}>Log Out</button>
            </div>
        </div>
    )
}