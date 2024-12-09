import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UVUTaNavbar from "@/app/components/navbars/UVUTaNavbar";
import Courses from "@/app/components/Courses";

export default async function UVUTaPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ta' || session.user.school !== 'uvu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div className="h-screen flex flex-col">
            <UVUTaNavbar />

            <div className="bg-slate-200 flex-grow py-10">
                <Courses />
            </div>
        </div>
    )
}