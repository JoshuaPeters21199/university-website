import RegistrationForm from "@/app/components/RegistrationForm";
import Link from "next/link";

export default function UofUAdminCreateUser() {
    return (
        <div>
            <div>UofU Admin create user page</div>
            <Link href={'/uofu/admin'}>Go Back</Link>
            <RegistrationForm />
        </div>
    )
}