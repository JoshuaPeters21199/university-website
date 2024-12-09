'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreateLogForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const [courseId, setCourseId] = useState('');
    const [school, setSchool] = useState('');
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');
    const [studentCourses, setStudentCourses] = useState([]);
    const [error, setError] = useState('');

    // Retrieve course options
    useEffect(() => {
        if (session) {
            setStudentCourses(session.user.courses);
            setSchool(session.user.school);
            setUsername(session.user.username);
        }
    }, [session])

    const handleCourseChange = (event) => {
        setCourseId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!courseId || !school || !username || !text) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch('/api/createLog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseId, school, username, text
                })
            });

            if (res.ok) {
                const form = event.target;
                form.reset();
                router.push('/uvu/student/logs');
            } else {
                console.log('Log creation failed')
            }
        } catch (error) {
            console.log('Error while creating log: ', error);
        }
    };

    return (
        <div className="shadow rounded-lg w-[400px] h-auto flex flex-col justify-between p-5 bg-white">
            <div>
                <h1 className="font-bold">Create Log</h1>

                <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>
                    <label htmlFor="course-dropdown">Choose a course:</label>
                    <select
                        id="course-dropdown"
                        value={courseId}
                        onChange={handleCourseChange}
                        className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                        required
                    >
                        <option value="" disabled>
                            Select a course
                        </option>
                        {/* Check whether studentCourses has been populated yet */}
                        {studentCourses.length > 0 ? (
                            studentCourses.map((course, index) => (
                                <option key={index} value={course}>
                                    {course}
                                </option>
                            ))
                        ) : (
                            <option>No courses available</option>
                        )}
                    </select>

                    <label htmlFor="log-text">Log Note:</label>
                    <textarea
                        id="log-text"
                        className="form-control border border-gray-200 py-2 px-4 bg-zinc-100/40"
                        rows={4}
                        placeholder="Type your log note here..."
                        onChange={event => setText(event.target.value)}
                    ></textarea>

                    <button className="bg-black text-white font-bold cursor-pointer px-6 py-2">Save Log</button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}