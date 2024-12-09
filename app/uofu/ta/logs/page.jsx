import UofUTaNavbar from "@/app/components/navbars/UofUTaNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logs from "@/app/components/Logs";

export default async function UofUTaLogs() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ta' || session.user.school !== 'uofu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div className="h-screen flex flex-col">
            <UofUTaNavbar />

            <div className="bg-slate-200 flex-grow py-10">
                <Logs />
            </div>
        </div>
    )
}