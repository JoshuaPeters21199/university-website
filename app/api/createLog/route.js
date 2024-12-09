import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Log from "@/models/log";

export async function POST(request) {
    try {
        const { courseId, school, username, text } = await request.json();

        await connectDB();
        await Log.create({ courseId, school, username, text });

        return NextResponse.json({ message: "Log saved" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while saving the log" }, { status: 500 });
    }
}