import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/app/components/Navbar";

export default async function UOFUTeacherPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'teacher' || session.user.school !== 'uofu') {
        return <div>You are not authorized to access this page.</div>
    }

    return (
        <div>
            <div>Welcome to the U of U Teacher Dashboard</div>
            <Navbar />
        </div>
    )
}