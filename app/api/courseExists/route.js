import { connectDB } from "@/lib/mongodb";
import Course from "@/models/course";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { id } = await request.json();
        const course = await Course.findOne({id}).select('_id');
        console.log('course: ', course);
        return NextResponse.json({ course });
    } catch (error) {
        console.log(error);
    }
}