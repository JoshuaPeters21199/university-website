'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";

export default function CourseCard(props) {
    const { data: session } = useSession();
    const [studentsVisible, setStudentsVisible] = useState(false);
    const [addStudentVisible, setAddStudentVisible] = useState(false);
    const [studentsNotInCourse, setStudentsNotInCourse] = useState([]);
    const [studentsInCourse, setStudentsInCourse] = useState([]);
    const [student, setStudent] = useState('');
    const [error, setError] = useState('');

    // Retrieve students that DO NOT already have the course
    useEffect(() => {
        const fetchStudentsNotInCourse = async () => {
            if (!session) return;

            try {
                const school = session?.user?.school;
                const course = props.courseId;

                const response = await fetch('/api/retreiveStudentsNotInCourse', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        school, course
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch students')
                }

                const data = await response.json();
                setStudentsNotInCourse(data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStudentsNotInCourse();
    }, [session])

    // Retrieve students that already have the cousre
    useEffect(() => {
        const fetchStudentsInCourse = async () => {
            if (!session) return;

            try {
                const school = session?.user?.school;
                const course = props.courseId;

                const response = await fetch('/api/retreiveStudents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        school, course
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch students')
                }

                const data = await response.json();
                setStudentsInCourse(data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStudentsInCourse();
    }, [session])

    const handleStudentChange = (event) => {
        setStudent(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault;

        if (!student) {
            setError('All fields are required');
            return;
        }

        try {
            const school = session?.user?.school;
            const course = props.courseId;

            const response = await fetch('/api/addStudentToCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    school, student, course
                })
            });

            if (response.ok) {
                const form = event.target;
                form.reset();
            } else {
                console.log('Adding student to course failed.')
            }
        } catch (error) {
            console.log('Error while adding student: ', error);
        }
    }

    return (
        <div className="bg-white shadow p-3 rounded-lg">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl">{props.courseName}</h1>
                {props.courseTeacher && (
                    <h2>
                        Teacher: <span className="italic">{props.courseTeacher}</span>
                    </h2>
                )}
                <h3>
                    TA: <span className="italic">{props.courseTA}</span>
                </h3>
                {(session?.user?.role === 'admin' || session?.user?.role === 'teacher' || session?.user?.role === 'ta') && (
                    <button 
                        className="bg-white mt-1 flex items-center"
                        onClick={() => setStudentsVisible(!studentsVisible)}
                    >
                        Students
                        {studentsVisible ? (
                            <svg className="ml-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        ) : (
                            <svg className="ml-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        )}
                    </button>
                )}
            </div>

            {studentsVisible && (
                <div>
                    <div>
                        {studentsInCourse.length > 0 && (
                            <ul className="list-disc list-inside">
                                {studentsInCourse.map((studentObj, index) => (
                                    <li key={index} className="ml-8 px-2 py-2 text-sm">
                                        {`${studentObj.firstName} ${studentObj.lastName}`}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {studentsInCourse.length === 0 && (
                            <div className="px-8 py-2 text-sm italic">Currently no students in this course.</div>
                        )}
                    </div>
                    {session?.user?.role === 'teacher' && (
                        <div>
                            <button 
                                className="text-sm ml-8 px-2 py-1 mt-2 flex items-center"
                                onClick={() => setAddStudentVisible(!addStudentVisible)}
                            >
                                Add Student
                                {addStudentVisible ? (
                                    <svg className="ml-1" width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                ) : (
                                    <svg className="ml-1" width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                )}
                            </button>

                            {addStudentVisible && (
                                <div className="mt-2 ml-20 w-[200px]">
                                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                                        <label className="text-sm" htmlFor="student-dropdown">Choose a student:</label>

                                        <select
                                            id="student-dropdown"
                                            value={student}
                                            onChange={handleStudentChange}
                                            className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a student
                                            </option>
                                            {studentsNotInCourse.map((studentObj, index) => (
                                                <option key={index} value={`${studentObj.firstName} ${studentObj.lastName}`}>
                                                    {`${studentObj.firstName} ${studentObj.lastName}`}
                                                </option>
                                            ))}
                                        </select>

                                        <button className="bg-black text-white py-2 rounded-md text-sm">Add Student to Course</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}