import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/app/components/Navbar";

export default async function UVUAdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin' || session.user.school !== 'uvu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div>
            <div>Welcome to the UVU Admin Dashboard</div>
            <Navbar />
            <div className="flex gap-3">
                <Link href={'/uvu/admin/createUser'}>Create User</Link>
                <Link href={'/uvu/admin/courses'}>Courses</Link>
            </div>
        </div>
    )
}