import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import User from "@/models/user";

export async function POST(request) {
    try {
        const { id, display, school, teacher, ta } = await request.json();

        await connectDB();
        await Course.create({ id, display, school, teacher, ta });

        // Find teacher and add course to their document
        const teacherUser = await User.findOneAndUpdate(
            { firstName: teacher.split(' ')[0], lastName: teacher.split(' ')[1], school },
            { $push: { courses: id } },
            { new: true }
        );

        if (!teacherUser) {
            return NextResponse.json({ success: false, error: 'Teacher not found' }), { status: 404 }
        }

        // Find TA and add course to their document
        const taUser = await User.findOneAndUpdate(
            { firstName: ta.split(' ')[0], lastName: ta.split(' ')[1], school },
            { $push: { courses: id } },
            { new: true }
        );

        if (!taUser) {
            return NextResponse.json({ success: false, error: 'TA not found' }), { status: 404 }
        }

        return NextResponse.json({ message: 'Course saved.'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred while creating the course.'}, { status: 500 });
    }
}