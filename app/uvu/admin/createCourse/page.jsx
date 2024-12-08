import Link from "next/link";
import CourseForm from "@/app/components/CourseForm";
import UVUAdminNavbar from "@/app/components/navbars/UVUAdminNavbar";

export default function UVUAdminCreateCourse() {
    return (
        <div className="h-screen flex flex-col">
            <UVUAdminNavbar />

            <div className="flex flex-grow items-center justify-center bg-slate-100">
                <CourseForm />
            </div>
        </div>
    )
}