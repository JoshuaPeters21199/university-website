'use client'

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button 
            onClick={() => signOut()} 
            className="bg-black text-white px-3 py-1 rounded-md font-bold"
        >
            Log Out
        </button>
    )
}