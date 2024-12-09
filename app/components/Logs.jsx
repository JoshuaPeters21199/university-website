'use client'

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LogCard from "./LogCard";

export default function Logs() {
    const { data: session } = useSession();
    const [logs, setLogs] = useState([]);

    // Retrieve logs from database
    useEffect(() => {
        const fetchLogs = async () => {
            if (!session) return;

            try {
                const role = session?.user?.role;
                const username = session?.user?.username;
                const school = session?.user?.school;
                const courses = session?.user?.courses;

                const res = await fetch('/api/getLogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ role, school, username, courses })
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch students');
                }
                
                const data = await res.json();

                setLogs(data.data);
            } catch (err) {
                throw new Error(err.message);
            }
        };

        fetchLogs();
    }, [session]);

    // Function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="px-96 flex flex-col gap-10">
            {logs.map((log, index) => (
                <div key={index}>
                    <LogCard
                        logDate={formatDate(log.date)}
                        course={log.courseId}
                        username={log.username}
                        message={log.text}
                    />
                </div>
            ))}
        </div>
    )
}