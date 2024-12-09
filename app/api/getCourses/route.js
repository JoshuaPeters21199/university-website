import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { role, school, user, courses } = body;

        let coursesData;
        if (role === 'admin') {
            coursesData = await Course.find({ school: school });
        } else if (role === 'teacher') {
            coursesData = await Course.find({ school: school, teacher: user });
        } else if (role === 'ta') {
            coursesData = await Course.find({ school: school, ta: user });
        } else if (role === 'student') {
            // Check if courses parameter is provided
            if (!courses || !Array.isArray(courses)) {
                return NextResponse.json({ 
                    success: false, 
                    error: 'Courses array is required for students' 
                }, { status: 400 });
            }
            // Query courses based on the student's courses array
            coursesData = await Course.find({
                school: school,
                id: { $in: courses },
            });
        } 
        else {
            return NextResponse.json({ success: false, error: 'Unauthorized role' }, { status: 403 });
        }

        return NextResponse.json({ success: true, data: coursesData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed on this route' }, { status: 405 });
}