'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';

export default function UVUAdminNavbar() {
    const pathname = usePathname(); // Get the current route

    const navLinks = [
        { href: '/uvu/admin', label: 'Courses' },
        { href: '/uvu/admin/createCourse', label: 'Create Course' },
        { href: '/uvu/admin/createUser', label: 'Create User' },
    ];

    return (
        <nav className="flex items-center justify-between px-5">
            <div className="flex items-center">
                <img src="/uvu-logo.png" className="w-24 h-auto" />
                <h1 className="font-bold text-xl">Admin Portal</h1>
            </div>

            <div className="flex gap-8 items-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${
                            pathname === link.href ? 'font-bold' : 'font-normal'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
                <LogoutButton />
            </div>
        </nav>
    );
}