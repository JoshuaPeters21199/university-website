import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import RegistrationForm from "../components/RegistrationForm";

export default async function Register() {
    const session = await getServerSession(authOptions);

    if (session) redirect('/');
    
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-100">
            <RegistrationForm />
        </div>
    )
}