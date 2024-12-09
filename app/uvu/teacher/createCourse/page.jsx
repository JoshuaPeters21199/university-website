import UVUTeacherNavbar from "@/app/components/navbars/UVUTeacherNavbar";
import UVUCreateCourseForm from "@/app/components/uvuCreateCourseForm";

export default function UVUTeacherCreateCourse() {
    return (
        <div className="h-screen flex flex-col">
            <UVUTeacherNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-200">
                <UVUCreateCourseForm />
            </div>
        </div>
    )
}