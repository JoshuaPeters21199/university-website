import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Courses from "@/app/components/Courses";
import UVUAdminNavbar from "@/app/components/navbars/UVUAdminNavbar";

export default async function UVUAdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin' || session.user.school !== 'uvu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div className="h-screen flex flex-col">
            <UVUAdminNavbar />

            <div className="bg-slate-200 flex-grow py-10">
                <Courses />
            </div>
        </div>
    )
}