import UVUTaNavbar from "@/app/components/navbars/UVUTaNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logs from "@/app/components/Logs";

export default async function UVUTaLogs() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ta' || session.user.school !== 'uvu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div className="h-screen flex flex-col">
            <UVUTaNavbar />

            <div className="bg-slate-200 flex-grow py-10">
                <Logs />
            </div>
        </div>
    )
}