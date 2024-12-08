import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function GET() {
    try {
        await connectDB();
        const teachers = await User.find({ role: 'teacher', school: 'uvu' });

        return NextResponse.json({ success: true, data: teachers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST() {
    return NextResponse.json({ message: 'POST method not allowed on this route' }, { status: 405 });
}
