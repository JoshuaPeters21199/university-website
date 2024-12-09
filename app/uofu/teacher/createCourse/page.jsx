import UofUTeacherNavbar from "@/app/components/navbars/UofUTeacherNavbar";
import UofUCreateCourseForm from "@/app/components/uofuCreateCourseForm";

export default function UVUTeacherCreateCourse() {
    return (
        <div className="h-screen flex flex-col">
            <UofUTeacherNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-200">
                <UofUCreateCourseForm />
            </div>
        </div>
    )
}