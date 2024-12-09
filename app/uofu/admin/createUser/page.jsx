import RegistrationForm from "@/app/components/RegistrationForm";
import UofUAdminNavbar from "@/app/components/navbars/UofUAdminNavbar";

export default function UofUAdminCreateUser() {
    return (
        <div className="h-screen flex flex-col">
            <UofUAdminNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-200">
                <RegistrationForm />
            </div>
        </div>
    )
}