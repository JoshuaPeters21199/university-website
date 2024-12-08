import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import User from "@/models/user";

export async function POST(req) {
    try {
        await connectDB();
        const { school, student, course } = await req.json();

        // Find student and add course to their courses
        const studentUser = await User.findOneAndUpdate(
            { firstName: student.split(' ')[0], lastName: student.split(' ')[1], school },
            { $push: { courses: course } },
            { new: true }
        );

        if (!studentUser) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Course added to student profile.'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}