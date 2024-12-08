import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";

export async function POST(request) {
    try {
        const { id, display, school, teacher, ta } = await request.json();

        await connectDB();
        await Course.create({ id, display, school, teacher, ta });

        return NextResponse.json({ message: 'Course saved.'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred while creating the course.'}, { status: 500 });
    }
}