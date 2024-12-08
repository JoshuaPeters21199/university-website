import Link from "next/link";
import RegistrationForm from "@/app/components/RegistrationForm";

export default function UVUTeacherCreateTA() {
    return (
        <div>
            <div>
                <Link href={'/uvu/teacher'}>Go Back</Link>
            </div>
            <RegistrationForm />
        </div>
    )
}