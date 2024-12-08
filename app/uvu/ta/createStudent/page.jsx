import Link from "next/link";
import RegistrationForm from "@/app/components/RegistrationForm";

export default function UVUTaCreateStudent() {
    return (
        <div>
            <div>
                <Link href={'/uvu/ta'}>Go Back</Link>
            </div>
            <RegistrationForm />
        </div>
    )
}