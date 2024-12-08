import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const { username } = await request.json();
        const user = await User.findOne({username}).select('_id');
        console.log('user: ', user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}