import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { role, school, user } = body;

        let courses;
        if (role === 'admin') {
            courses = await Course.find({ school: school });
        } else if (role === 'teacher') {
            courses = await Course.find({ school: school, teacher: user });
        } else if (role === 'ta') {
            courses = await Course.find({ school: school, ta: user });
        } else {
            return NextResponse.json({ success: false, error: 'Unauthorized role' }, { status: 403 });
        }

        return NextResponse.json({ success: true, data: courses }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed on this route' }, { status: 405 });
}