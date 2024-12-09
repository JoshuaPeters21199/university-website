import UofUAdminNavbar from "@/app/components/navbars/UofUAdminNavbar";
import Students from "@/app/components/Students";

export default function UofUAdminStudents() {
    return (
        <div className="h-screen flex flex-col">
            <UofUAdminNavbar />

            <div className="py-10 flex-grow bg-slate-200">
                <Students />
            </div>
        </div>
    )
}