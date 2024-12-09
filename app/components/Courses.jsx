'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

export default function Courses() {
    const { data: session } = useSession();
    const [courses, setCourses] = useState([]);
    const courseViewer = session?.user?.role;

    // Retreive courses from database
    useEffect(() => {
        const fetchCourses = async () => {
            if (!session) return;

            try {
                const role = session?.user?.role;
                const user = `${session?.user?.firstName} ${session?.user?.lastName}`;
                const school = session?.user?.school;
                const response = await fetch('/api/getCourses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role, school, user })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                
                const data = await response.json();

                setCourses(data.data);
            } catch (err) {
                throw new Error(err.message);
            }
        };

        fetchCourses();
    }, [session]);

    return (
        <div className="px-96">
            {courseViewer === 'admin' && (
                <ul className="flex flex-col gap-10">
                    {courses.map((course, index) => (
                        <li key={index}>
                            <CourseCard 
                                courseId={course.id}
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
                                courseId={course.id}
                                courseName={course.display}
                                courseTA={course.ta}
                            />
                        </li>
                    ))}
                </ul>
            )}

            {courseViewer === 'ta' && (
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>
                            <CourseCard
                                courseId={course.id}
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