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

    // Retrieve uvu students that DO NOT already have the course
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

    // Retrieve uvu students that already have the cousre
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
            console.log(school);
            const course = props.courseId;
            console.log(course);
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
                <h1 className="font-bold">{props.courseName}</h1>
                {props.courseTeacher && (
                    <h2>
                        Teacher: <span className="italic">{props.courseTeacher}</span>
                    </h2>
                )}
                <h3>
                    TA: <span className="italic">{props.courseTA}</span>
                </h3>
                <button 
                    className="bg-black text-white rounded-md px-2 py-1 flex items-center"
                    onClick={() => setStudentsVisible(!studentsVisible)}
                >
                    View Students 
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                        </path>
                    </svg>
                </button>
            </div>

            {studentsVisible && (
                <div>
                    <ul>
                        {studentsInCourse.length > 0 && (
                            <div>
                                {studentsInCourse.map((studentObj, index) => (
                                    <li key={index}>
                                        {`${studentObj.firstName} ${studentObj.lastName}`}
                                    </li>
                                ))}
                            </div>
                        )}

                        {studentsInCourse.length === 0 && (
                            <div>Currently no students in this course.</div>
                        )}
                    </ul>
                    {session?.user?.role === 'teacher' && (
                        <div>
                            <button 
                                className="text-sm text-white bg-black px-2 py-1 rounded-md"
                                onClick={() => setAddStudentVisible(!addStudentVisible)}
                            >
                                Add Student
                            </button>

                            {addStudentVisible && (
                                <div>
                                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                                        <label htmlFor="student-dropdown">Choose a student:</label>

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

                                        <button className="bg-black text-white">Add Student to Course</button>
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