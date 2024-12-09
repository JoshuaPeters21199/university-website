import RegistrationForm from "@/app/components/RegistrationForm";
import UofUTeacherNavbar from "@/app/components/navbars/UofUTeacherNavbar";

export default function UofUTeacherCreateTA() {
    return (
        <div className="h-screen flex flex-col">
            <UofUTeacherNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-200">
                <RegistrationForm />
            </div>
        </div>
    )
}