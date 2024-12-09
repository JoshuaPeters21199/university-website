'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import StudentCard from "./StudentCard";

export default function Students() {
    const { data: session } = useSession();
    const [students, setStudents] = useState([]);
    const studentViewer = session?.user?.role;

    // Retrieve students from database
    useEffect(() => {
        const fetchStudents = async () => {
            if (!session) return;

            try {
                const role = session?.user?.role;
                const user = `${session?.user?.firstName} ${session?.user?.lastName}`;
                const school = session?.user?.school;
                const res = await fetch('/api/getStudents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role, school, user })
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch students');
                }
                
                const data = await res.json();

                setStudents(data.data);
            } catch (err) {
                throw new Error(err.message);
            }
        };

        fetchStudents();
    }, [session]);

    return (
        <div className="px-96 flex flex-col gap-10">
            {students.map((student, index) => (
                <div key={index}>
                    <StudentCard 
                        studentName={`${student.firstName} ${student.lastName}`} 
                        username={student.username}
                        courses={student.courses}
                    />
                </div>
            ))}
        </div>
    )
}