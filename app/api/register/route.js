import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { school, firstName, lastName, role, username, password, courses } = await request.json();

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectDB();
        await User.create({ school, firstName, lastName, role, username, password: hashedPassword, courses }); // This line stores the data to the DB

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}