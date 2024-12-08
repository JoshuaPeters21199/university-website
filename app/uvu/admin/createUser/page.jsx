import RegistrationForm from "@/app/components/RegistrationForm";
import Link from "next/link";

export default function UVUAdminCreateUser() {
    return (
        <div>
            <div>UVU Admin create user page</div>
            <Link href={'/uvu/admin'}>Go Back</Link>
            <RegistrationForm />
        </div>
    )
}