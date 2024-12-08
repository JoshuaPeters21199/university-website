'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

export default function Courses() {
    const { data: session } = useSession();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const courseViewer = session?.user?.role;

    // Retreive courses from database
    useEffect(() => {
        const fetchCourses = async () => {
            if (!session) return;

            try {
                const role = session?.user?.role;
                const teacherUsername = `${session?.user?.firstName} ${session?.user?.lastName}`;
                const response = await fetch('/api/uvuCourses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        role,
                        teacherUsername
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                
                const data = await response.json();

                setCourses(data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCourses();
    }, [session]);

    return (
        <div>
            {courseViewer === 'admin' && (
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>
                            <CourseCard 
                                courseName={course.display} 
                                courseTeacher={course.teacher}
                                courseTA={course.ta}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {courseViewer === 'teacher' && (
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>
                            <CourseCard
                                courseName={course.display}
                                courseTA={course.ta}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}