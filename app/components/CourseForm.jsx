'use client'

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CourseForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const creatorRole = session?.user?.role || 'teacher';

    const [id, setId] = useState('');
    const [display, setDisplay] = useState('');
    const school = session?.user?.school;
    const [teacher, setTeacher] = useState('');
    const [ta, setTa] = useState('');
    const [error, setError] = useState('');

    const [teachers, setTeachers] = useState([]);
    const [tas, setTas] = useState([]);

    // Retreive teachers list from database
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('/api/uvuTeachers');
                if (!response.ok) {
                    throw new Error('Failed to fetch teachers');
                }
                const data = await response.json();

                const uniqueTeachers = [
                    ...new Set(data.data.map((teacher) => `${teacher.firstName} ${teacher.lastName}`)),
                ];
                setTeachers(uniqueTeachers);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTeachers();
    }, []);

    // Retreive Ta's list from database
    useEffect(() => {
        const fetchTas = async () => {
            try {
                const response = await fetch('/api/uvuTas');
                if (!response.ok) {
                    throw new Error('Failed to fetch TAs');
                }
                const data = await response.json();
                const uniqueTas = [
                    ...new Set(data.data.map((ta) => `${ta.firstName} ${ta.lastName}`)),
                ];
                setTas(uniqueTas);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTas();
    }, []);

    const handleTeacherChange = (event) => {
        setTeacher(event.target.value);
    }

    const handleTaChange = (event) => {
        setTa(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!id || !display || !school || !teacher || !ta) {
            setError('All fields are required.');
            return;
        }

        try {
            const responseCourseExists = await fetch('/api/courseExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            });

            const { course } = await responseCourseExists.json();

            if (course) {
                setError('Course already exists.');
                return;
            }

            const response = await fetch('/api/course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id, display, school, teacher, ta
                })
            });

            if (response.ok) {
                const form = event.target;
                form.reset();
                router.push('/');
            } else {
                console.log('Course creation failed.')
            }
        } catch (error) {
            console.log('Error during course creation: ', error);
        }
    }

    return (
        <div>
            <div>
                <h1>Create Course</h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Course ID"
                        onChange={event => setId(event.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Display Name"
                        onChange={event => setDisplay(event.target.value)}
                    />

                    {creatorRole === 'admin' && (
                        <div className="flex flex-col">
                            <label htmlFor="teacher-dropdown">Choose a teacher:</label>
                            <select 
                                id="teacher-dropdown"
                                value={teacher}
                                onChange={handleTeacherChange}
                                className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                                required
                            >
                                <option value="" disabled>
                                    Select a teacher
                                </option>
                                {teachers.map((teacher, index) => (
                                    <option key={index} value={teacher}>
                                        {teacher}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="teacher-dropdown">Choose a TA:</label>
                        <select 
                            id="teacher-dropdown"
                            value={ta}
                            onChange={handleTaChange}
                            className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                            required
                        >
                            <option>
                                Select a TA
                            </option>
                            {tas.map((ta, index) => (
                                <option key={index} value={ta}>
                                    {ta}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="bg-black text-white font-bold cursor-pointer px-6 py-2">Create Course</button>

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