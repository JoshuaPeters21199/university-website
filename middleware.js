import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
        // Redirect to login if no session exists
        return NextResponse.redirect(new URL("/login", req.url));
    }
}