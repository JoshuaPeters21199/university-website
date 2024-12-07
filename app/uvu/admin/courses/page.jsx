import Link from "next/link";
import Courses from "@/app/components/Courses";

export default function UVUAdminCourses() {
    return (
        <div>
            <h1>UVU Admin courses page</h1>
            <div className="flex gap-3">
                <Link href={'/uvu/admin'}>Go Back</Link>
                <Link href={'/uvu/admin/courses/createCourse'}>Create Course</Link>
            </div>
            <div>
                <Courses />
            </div>
        </div>
    )
}