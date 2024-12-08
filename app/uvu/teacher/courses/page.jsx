import Link from "next/link";
import Courses from "@/app/components/Courses";

export default function UVUTeacherCourses() {
    return (
        <div>
            <div className="flex gap-3">
                <Link href={'/uvu/teacher'}>Go Back</Link>
                <Link href={'/uvu/teacher/courses/createCourse'}>Create Course</Link>
            </div>
            <div>
                <Courses />
            </div>
        </div>
    )
}