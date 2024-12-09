import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { role, school, user } = body;

        let students;
        if (role === 'admin') {
            students = await User.find({ school: school, role: 'student' });
        } else if (role === 'teacher') {
            students = await User.find({ school: school, teacher: user, role: 'student' });
        } else if (role === 'ta') {
            students = await User.find({ school: school, ta: user, role: 'student' });
        } else {
            return NextResponse.json({ success: false, error: 'Unauthorized role' }, { status: 403 });
        }

        return NextResponse.json({ success: true, data: students }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed on this route' }, { status: 405 });
}