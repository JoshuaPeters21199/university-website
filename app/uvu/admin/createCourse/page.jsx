import UVUAdminNavbar from "@/app/components/navbars/UVUAdminNavbar";
import UVUCreateCourseForm from "@/app/components/uvuCreateCourseForm";

export default function UVUAdminCreateCourse() {
    return (
        <div className="h-screen flex flex-col">
            <UVUAdminNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-200">
                <UVUCreateCourseForm />
            </div>
        </div>
    )
}