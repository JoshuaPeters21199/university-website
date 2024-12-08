import Link from "next/link";
import CourseForm from "@/app/components/CourseForm";

export default function UVUAdminCreateCourse() {
    return (
        <div>
            <h1>UVU Admin Create Course page</h1>
            <div>
                <Link href={'/uvu/admin/courses'}>Go Back</Link>
            </div>
            <CourseForm />
        </div>
    )
}