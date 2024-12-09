'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';

export default function UVUTeacherNavbar() {
    const pathname = usePathname(); // Get the current route

    const navLinks = [
        { href: '/uvu/teacher', label: 'Courses' },
        { href: '/uvu/teacher/logs', label: 'Logs' },
        { href: '/uvu/teacher/createCourse', label: 'Create Course' },
        { href: '/uvu/teacher/createTa', label: 'Create TA' },
    ];

    return (
        <nav className="flex items-center justify-between px-5 bg-green-900 text-white">
            <div className="flex items-center">
                <img src="/uvu-logo-white.png" className="w-24 h-auto" />
                <h1 className="font-bold text-xl">Teacher Portal</h1>
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