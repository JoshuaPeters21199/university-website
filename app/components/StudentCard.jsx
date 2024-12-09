'use client'

import { useState } from "react"

export default function StudentCard(props) {
    const [coursesVisible, setCoursesVisible] = useState(false);
    const courses = props.courses;

    return (
        <div className="bg-white shadow p-3 rounded-lg">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl">{props.studentName}</h1>
                <h2 className="">
                    Username: <span className="italic">{props.username}</span>
                </h2>

                <button 
                    className="bg-white rounded-md mt-1 flex items-center"
                    onClick={() => setCoursesVisible(!coursesVisible)}
                >
                    Student Courses
                    {coursesVisible ? (
                        <svg className="ml-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    ) : (
                        <svg className="ml-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    )}
                </button>

                {coursesVisible && (
                    <div>
                        {courses.length > 0 && (
                            <ul className="list-disc list-inside">
                                {courses.map((course, index) => (
                                    <li key={index} className="px-8 py-2 text-sm">
                                        {course}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {courses.length === 0 && (
                            <div className="px-8 py-2 text-sm italic">Student currently has no courses.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}