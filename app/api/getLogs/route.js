import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Log from "@/models/log";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { role, school, username, courses } = body;

        let logs;
        if (role === 'admin') {
            logs = await Log.find({ school: school });
        } else if (role === 'teacher') {
            logs = await Log.find({ school: school, courseId: { $in: courses } });
        } else if (role === 'ta') {
            logs = await Log.find({ school: school, courseId: { $in: courses } });
        } else if (role === 'student') {
            logs = await Log.find({ school: school, username: username })
        } else {
            return NextResponse.json({ success: false, error: 'Unauthorized role' }, { status: 403 });
        }

        return NextResponse.json({ success: true, data: logs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed on this route' }, { status: 405 });
}