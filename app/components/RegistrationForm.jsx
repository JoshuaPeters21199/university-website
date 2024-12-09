'use client'

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RegistrationForm() {
    const { data: session } = useSession();
    const router = useRouter();
    const creatorRole = session?.user?.role || '';
    const creatorSchool = session?.user?.school || '';

    const [school, setSchool] = useState(session?.user?.school || '');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const schools = ['uvu', 'uofu']
    const [title, setTitle] = useState('');
    const [schoolNameDisplay, setSchoolNameDisplay] = useState('');

    const [roles, setRoles] = useState([]);
    const courses = [];

    useEffect(() => {
        if (creatorRole === 'admin') {
            setRoles(['teacher', 'ta', 'student']);
            setTitle(`Create ${schoolNameDisplay} User`);
        } else if (creatorRole === 'teacher') {
            setRole('ta');
            setTitle(`Create ${schoolNameDisplay} TA`);
        } else {
            setRole('student');
            setTitle('Register Student')
        }
    }, [creatorRole]);

    // Set the school display name
    useEffect(() => {
        if (creatorSchool === 'uvu') {
            setSchoolNameDisplay('Utah Valley University');
        } else {
            setSchoolNameDisplay('University of Utah');
        }
    }, [creatorSchool])

    const handleSchoolChange = (event) => {
        setSchool(event.target.value);
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    // Handle form submition
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!school || !firstName || !lastName || !role || !username || !password || !courses) {
            setError("All fields are required.");
            return;
        }

        try {
            // Check to see if the user already exists
            const responseUserExists = await fetch('/api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username
                })
            });

            const { user } = await responseUserExists.json(); // Destructure the user 

            if (user) {
                setError('User already exists.');
                return;
            }

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    school, firstName, lastName, role, username, password, courses
                })
            });

            if (response.ok) {
                const form = event.target;
                form.reset();
                router.push('/');
            } else {
                console.log('User registration failed.')
            }
        } catch (error) {
            console.log('Error during registration: ', error);
        }
    };

    return (
        <div className="shadow rounded-lg w-[600px] h-auto flex flex-col justify-between p-5 bg-white">
            <div>
                <h1 className="font-bold">{title}</h1>

                <form className="flex flex-col gap-3 mt-3" onSubmit={handleSubmit}>
                    {creatorRole === '' && (
                        <div className="flex flex-col">
                            <label htmlFor="school-dropdown">Choose a school:</label>
                            <select
                                id="school-dropdown"
                                value={school}
                                onChange={handleSchoolChange}
                                className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                                required
                            >
                                <option value="" disabled>
                                    Select a school
                                </option>
                                {schools.map((school, index) => (
                                    <option key={index} value={school}>
                                        {school}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <input 
                        type="text" 
                        placeholder="First Name"
                        onChange={event => setFirstName(event.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        onChange={event => setLastName(event.target.value)}
                    />

                    {creatorRole === 'admin' && (
                        <div className="flex flex-col">
                            <label htmlFor="role-dropdown">Choose a role:</label>
                            <select
                                id="role-dropdown"
                                value={role}
                                onChange={handleRoleChange}
                                className="bg-zinc-100/40 py-2 px-6 border border-gray-200"
                                required
                            >
                                <option value="" disabled>
                                    Select a role
                                </option>
                                {roles.map((role, index) => (
                                    <option key={index} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}


                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={event => setUsername(event.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    />

                    <button className="bg-black text-white font-bold cursor-pointer px-6 py-2">Sign Up</button>

                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                            {error}
                        </div>
                    )}

                    {creatorRole === '' && (
                        <Link className="text-sm mt-3 text-right" href={'/'}>
                            Already have an account? <span className="underline">Sign In</span>
                        </Link>
                    )}

                </form>
            </div>
        </div>
    )
}