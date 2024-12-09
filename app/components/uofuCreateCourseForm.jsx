'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UofUCreateCourseForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const school = session?.user?.school;

    const [courseId, setCourseId] = useState('');
    const [courseDisplayName, setCourseDisplayName] = useState('');
    const [courseTeacher, setCourseTeacher] = useState('');
    const [courseTa, setCourseTa] = useState('');
    const [error, setError] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [tas, setTas] = useState([]);

    // Retrieve teachers from database
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await fetch('/api/uofuTeachers');

                if (!res.ok) {
                    setError('Failed to fetch teachers');
                }
    
                const data = await res.json();
    
                // Map the teachers to an array of { firstName, lastName }
                const formattedTeachers = data.data.map(teacher => ({
                    firstName: teacher.firstName,
                    lastName: teacher.lastName
                }));

                setTeachers(formattedTeachers);
            } catch (error) {
                setError(error.message);
            }        
        };

        fetchTeachers();
    }, [])

    // Retrieve TA's from database
    useEffect(() => {
        const fetchTas = async () => {
            try {
                const res = await fetch('/api/uofuTas');

                if (!res.ok) {
                    setError('Failed to fetch TAs');
                }
    
                const data = await res.json();
    
                // Map the TA's to an array of { firstName, lastName }
                const formattedTas = data.data.map(ta => ({
                    firstName: ta.firstName,
                    lastName: ta.lastName
                }));

                setTas(formattedTas);
            } catch (error) {
                setError(error.message);
            }        
        };

        fetchTas();
    }, [])

    // Submitting the form
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!courseId || !courseDisplayName || !school || !courseTeacher || !courseTa) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch('/api/addCourseToDatabase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseId, courseDisplayName, school, courseTeacher, courseTa
                })
            });

            if (res.ok) {
                const form = event.target;
                form.reset();
                router.push('/uofu/admin');
            } else {
                console.log('Course creation failed')
            }
        } catch (error) {
            console.log('Error during course creation: ', error);
        }
    }

    // Handle form changes
    const handleTeacherChange = (event) => {
        setCourseTeacher(event.target.value);
    }

    const handleTaChange = (event) => {
        setCourseTa(event.target.value);
    }

    return (
        <div className="shadow rounded-lg w-[400px] h-auto flex flex-col justify-between p-5 bg-white">
            <div>
                <h1 className="font-bold">Create Course</h1>

                <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>

                    {/* Course ID */}
                    <input 
                        type="text" 
                        placeholder="Course ID"
                        onChange={event => setCourseId(event.target.value)}
                    />

                    {/* Course Display Name */}
                    <input 
                        type="text" 
                        placeholder="Display Name"
                        onChange={event => setCourseDisplayName(event.target.value)}
                    />

                    {/* ADMIN ONLY - Teacher Dropdrown */}
                    {session?.user?.role === 'admin' && (
                        <div className="flex flex-col">
                            <label htmlFor="teacher-dropdown">Choose a teacher:</label>
                            <select 
                                id="teacher-dropdown"
                                value={courseTeacher}
                                onChange={handleTeacherChange}
                                className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                                required
                            >
                                <option value="" disabled>
                                    Select a teacher
                                </option>
                                {teachers.map((teacher, index) => (
                                    <option key={index} value={`${teacher.firstName} ${teacher.lastName}`}>
                                        {`${teacher.firstName} ${teacher.lastName}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* TA Dropdown */}
                    <div className="flex flex-col">
                        <label htmlFor="ta-dropdown">Choose a TA:</label>
                        <select 
                            id="ta-dropdown"
                            value={courseTa}
                            onChange={handleTaChange}
                            className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                            required
                        >
                            <option value="" disabled>
                                Select a TA
                            </option>
                            {tas.map((ta, index) => (
                                <option key={index} value={`${ta.firstName} ${ta.lastName}`}>
                                    {`${ta.firstName} ${ta.lastName}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="bg-black text-white font-bold cursor-pointer px-6 py-2">Create Course</button>

                    {/* Error message */}
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