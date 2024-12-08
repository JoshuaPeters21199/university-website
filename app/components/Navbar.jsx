'use client'

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [school, setSchool] = useState(session?.user?.school || '');
    const [role, setRole] = useState(session?.user?.role || '');
    const [navbarLinks, setNavbarLinks] = useState([]);

    // Update school and role when session changes
    useEffect(() => {
        if (session) {
            setSchool(session.user?.school || '');
            setRole(session.user?.role || '');
        }
    }, [session]);

    // Update navbar links based on role
    useEffect(() => {
        if (role === 'admin') {
            setNavbarLinks(['Courses', 'Create User']);
        }
    }, [role])

    return (
        <div>
            <div>
                {school === 'uvu' && (
                    <img src="/uvu-logo.png"></img>
                )}
                {school === 'uofu' && (
                    <img src="/uofu-logo.jpg"></img>
                )}
            </div>
            <div>
                {navbarLinks.map((page, index) => (
                    <div key={index}>{page}</div>
                ))}
                <button onClick={() => signOut()}>Log Out</button>
            </div>
        </div>
    )
}