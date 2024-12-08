import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import User from "@/models/user";

export async function POST(req) {
    try {
        await connectDB();
        const { school, course } = await req.json();

        // Find students
        const students = await User.find(
            { school, role: 'student', courses: { $in: [course] } },
        )

        return NextResponse.json({ success: true, data: students }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}