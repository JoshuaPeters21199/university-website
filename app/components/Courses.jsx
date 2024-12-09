'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";

export default function Courses() {
    const { data: session } = useSession();
    const [retrievedCourses, setRetrievedCourses] = useState([]);
    const courseViewer = session?.user?.role;

    // Retreive courses from database
    useEffect(() => {
        const fetchCourses = async () => {
            if (!session) return;

            try {
                const role = session?.user?.role;
                const user = `${session?.user?.firstName} ${session?.user?.lastName}`;
                const school = session?.user?.school;

                const body = {
                    role,
                    school,
                    user,
                };

                // Only add courses if the user is a student
                if (role === 'student') {
                    body.courses = session?.user?.courses;
                }

                const response = await fetch('/api/getCourses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                
                const data = await response.json();

                setRetrievedCourses(data.data);
            } catch (err) {
                throw new Error(err.message);
            }
        };

        fetchCourses();
    }, [session]);

    return (
        <div className="px-96">
            <ul className="flex flex-col gap-10">
                {retrievedCourses.map((course, index) => (
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
            {/* {courseViewer === 'admin' && (
                <ul className="flex flex-col gap-10">
                    {retrievedCourses.map((course, index) => (
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
                <ul className="flex flex-col gap-10">
                    {retrievedCourses.map((course, index) => (
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
                <ul className="flex flex-col gap-10">
                    {retrievedCourses.map((course, index) => (
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

            {courseViewer === 'student' && (
                <ul className="flex flex-col gap-10">
                    {retrievedCourses.map((course, index) => (
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
            )} */}
        </div>
    )
}