import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/app/components/Navbar";

export default async function UofUAdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin' || session.user.school !== 'uofu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div>
            <div>Welcome to the U of U Admin Dashboard</div>
            <Navbar />
            <Link href={'/uofu/admin/createUser'}>Create User</Link>
        </div>
    )
}