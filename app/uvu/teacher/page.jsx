import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/app/components/Navbar";

export default async function UVUTeacherPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'teacher' || session.user.school !== 'uvu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div>
            <div>Welcome to the UVU Teacher Dashboard</div>
            <Navbar />
        </div>
    )
}