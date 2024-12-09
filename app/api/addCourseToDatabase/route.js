import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";
import User from "@/models/user";

export async function POST(request) {
    try {
        const { courseId, courseDisplayName, school, courseTeacher, courseTa } = await request.json();

        await connectDB();

        // Check if the course already exists
        const existingCourse = await Course.findOne({ id: courseId, school });
        if (existingCourse) {
            return NextResponse.json({ success: false, error: 'Course already exists' }, { status: 409 });
        }

        // Create new course
        await Course.create({ id: courseId, display: courseDisplayName, school, teacher: courseTeacher, ta: courseTa });

        // Find teacher and check if course is already in their document
        const teacherUser = await User.findOne({ firstName: courseTeacher.split(' ')[0], lastName: courseTeacher.split(' ')[1], school });
        if (teacherUser && teacherUser.courses.includes(courseId)) {
            return NextResponse.json({ success: false, error: 'Course already assigned to this teacher' }, { status: 409 });
        }
        
        // Add course to teacher's document
        await User.findOneAndUpdate(
            { firstName: courseTeacher.split(' ')[0], lastName: courseTeacher.split(' ')[1], school },
            { $push: { courses: courseId } },
            { new: true }
        );

        // Find TA and check if course is already in their document
        const taUser = await User.findOne({ firstName: courseTa.split(' ')[0], lastName: courseTa.split(' ')[1], school });
        if (taUser && taUser.courses.includes(courseId)) {
            return NextResponse.json({ success: false, error: 'Course already assigned to this TA' }, { status: 409 });
        }

        // Add course to TA's document
        await User.findOneAndUpdate(
            { firstName: courseTa.split(' ')[0], lastName: courseTa.split(' ')[1], school },
            { $push: { courses: courseId } },
            { new: true }
        );

        return NextResponse.json({ message: 'Course saved.'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred while creating the course.'}, { status: 500 });
    }
}