import Link from "next/link"

export default function CourseCard(props) {

    return (
        <div className="bg-zinc-100 p-3">
            <h1>{props.courseName}</h1>
            {props.courseTeacher && <h2>{props.courseTeacher}</h2>}
            <h3>{props.courseTA}</h3>
        </div>
    )
}