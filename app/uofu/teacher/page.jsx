import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UofUTeacherNavbar from "@/app/components/navbars/UofUTeacherNavbar";
import Courses from "@/app/components/Courses";

export default async function UOFUTeacherPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'teacher' || session.user.school !== 'uofu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div className="h-screen flex flex-col">
            <UofUTeacherNavbar />

            <div className="bg-slate-200 flex-grow py-10">
                <Courses />
            </div>
        </div>
    )
}