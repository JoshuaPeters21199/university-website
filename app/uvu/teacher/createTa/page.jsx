import RegistrationForm from "@/app/components/RegistrationForm";
import UVUTeacherNavbar from "@/app/components/navbars/UVUTeacherNavbar";

export default function UVUTeacherCreateTA() {
    return (
        <div className="h-screen flex flex-col">
            <UVUTeacherNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-200">
                <RegistrationForm />
            </div>
        </div>
    )
}