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
        'Admin': { 'uvu': '/uvu/admin', 'uofu': '/uofu/admin' },
        'Teacher': { 'uvu': '/uvu/teacher', 'uofu': '/uofu/teacher' }
    };

    // Get the allowed path for the user's role and school
    const allowedPath = accessMap[role]?.[school];

    if (allowedPath && url !== allowedPath) {
        // If the user tries to access disallowed pages, redirect them to their dashboard
        return NextResponse.redirect(new URL(allowedPath, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/uvu/admin/:path*',
        '/uvu/teacher/:path*',
        '/uvu/student/:path*',
        '/uofu/admin/:path*',
        '/uofu/teacher/:path*',
        '/uofu/student/:path*',
    ]
}

// Restrict routes by school and role
// if (url.startsWith('/uvu/admin') && (role !== 'Admin' || school !== 'uvu')) {
//     return NextResponse.redirect(new URL('/', req.url));
// }

// if (url.startsWith('/uvu/teacher') && (role !== 'Teacher' || school !== 'Utah Valley University')) {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
// }

// if (url.startsWith('/uvu/student') && (role !== 'Student' || school !== 'Utah Valley University')) {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
// }

// if (url.startsWith('/uofu/admin') && (role !== 'Admin' || school !== 'University of Utah')) {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
// }

// if (url.startsWith('/uofu/teacher') && (role !== 'Teacher' || school !== 'uofu')) {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
// }

// if (url.startsWith('/uofu/student') && (role !== 'Student' || school !== 'University of Utah')) {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
// }