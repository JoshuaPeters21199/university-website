'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';

export default function UVUStudentNavbar() {
    const pathname = usePathname(); // Get the current route

    const navLinks = [
        { href: '/uvu/student', label: 'Courses' },
        { href: '/uvu/student/logs', label: 'Logs' },
        { href: '/uvu/student/createLog', label: 'Create Log' },
    ];

    return (
        <nav className="flex items-center justify-between px-5 bg-green-900 text-white">
            <div className="flex items-center">
                <img src="/uvu-logo-white.png" className="w-24 h-auto" />
                <h1 className="font-bold text-xl">Student Portal</h1>
            </div>

            <div className="flex gap-8 items-center">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${
                            pathname === link.href ? 'font-bold text-lg' : 'font-normal'
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