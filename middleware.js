import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
        // Redirect to login if no session exists
        return NextResponse.redirect(new URL('/', req.url));
    }

    const { role, school } = token;
    const url = req.nextUrl.pathname;

    // Define accessible paths based on role and school
    const accessMap = {
        'admin': { 'uvu': '/uvu/admin', 'uofu': '/uofu/admin' },
        'teacher': { 'uvu': '/uvu/teacher', 'uofu': '/uofu/teacher' },
        'ta': { 'uvu': '/uvu/ta', 'uofu': '/uofu/ta' },
        'student': { 'uvu': '/uvu/student', 'uofu': '/uofu/student' }
    };

    // Get the allowed path for the user's role and school
    const allowedPath = accessMap[role]?.[school];

    if (role === 'admin') {
        if (!url.startsWith(allowedPath)) {
            return NextResponse.redirect(new URL(allowedPath, req.url));
        }
    } else if (allowedPath) {
        if (!url.startsWith(allowedPath)) {
            return NextResponse.redirect(new URL(allowedPath, req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/uvu/admin/:path*',
        '/uvu/teacher/:path*',
        '/uvu/ta/:path*',
        '/uvu/student/:path*',
        '/uofu/admin/:path*',
        '/uofu/teacher/:path*',
        '/uofu/ta/:path*',
        '/uofu/student/:path*',
    ]
}