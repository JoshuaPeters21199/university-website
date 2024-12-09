import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UVUStudentNavbar from "@/app/components/navbars/UVUStudentNavbar";
import Courses from "@/app/components/Courses";

export default async function UVUStudentPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'student' || session.user.school !== 'uvu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div className="h-screen flex flex-col">
            <UVUStudentNavbar />

            <div className="bg-slate-200 flex-grow py-10">
                <Courses />
            </div>
        </div>
    )
}