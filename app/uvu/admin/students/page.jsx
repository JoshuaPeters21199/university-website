import UVUAdminNavbar from "@/app/components/navbars/UVUAdminNavbar";
import Students from "@/app/components/Students";

export default function UVUAdminStudents() {
    return (
        <div className="h-screen flex flex-col">
            <UVUAdminNavbar />

            <div className="py-10 flex-grow bg-slate-200">
                <Students />
            </div>
        </div>
    )
}