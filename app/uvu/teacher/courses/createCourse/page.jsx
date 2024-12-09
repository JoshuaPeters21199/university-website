import Link from "next/link";

export default function UVUTeacherCreateCourse() {
    return (
        <div>
            <h1>UVU Teacher Create Course page</h1>
            <div>
                <Link href={'/uvu/teacher/courses'}>Go Back</Link>
            </div>
        </div>
    )
}