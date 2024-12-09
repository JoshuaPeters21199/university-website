import UofUAdminNavbar from "@/app/components/navbars/UofUAdminNavbar";
import UofUCreateCourseForm from "@/app/components/uofuCreateCourseForm";

export default function UofUAdminCreateCourse() {
    return (
        <div className="h-screen flex flex-col">
            <UofUAdminNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-200">
                <UofUCreateCourseForm />
            </div>
        </div>
    )
}