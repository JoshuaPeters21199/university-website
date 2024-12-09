'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';

export default function UofUTaNavbar() {
    const pathname = usePathname(); // Get the current route

    const navLinks = [
        { href: '/uofu/ta', label: 'Courses' },
        { href: '/uofu/ta/logs', label: 'Logs' },
        { href: '/uofu/ta/createStudent', label: 'Create Student' },
    ];

    return (
        <nav className="flex items-center justify-between px-5 bg-red-700 text-white">
            <div className="flex items-center">
                <img src="/uofu-logo-white.png" className="w-20 h-auto py-2" />
                <h1 className="font-bold text-xl ml-2">TA Portal</h1>
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