import RegistrationForm from "@/app/components/RegistrationForm";
import UVUAdminNavbar from "@/app/components/navbars/UVUAdminNavbar";

export default function UVUAdminCreateUser() {
    return (
        <div className="h-screen flex flex-col">
            <UVUAdminNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-100">
                <RegistrationForm />
            </div>
        </div>
    )
}