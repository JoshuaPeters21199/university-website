import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

// Detect whether or not a user is logged in and then redirect them to the appropriate page
const handleSessionRedirect = (session) => {
  const { role, school } = session.user;

  const userMap = {
    admin: { 'uvu': '/uvu/admin', 'uofu': '/uofu/admin' },
    teacher: { 'uvu': '/uvu/teacher', 'uofu': '/uofu/teacher' },
    ta: { 'uvu': '/uvu/ta', 'uofu': '/uofu/ta' },
    student: { 'uvu': '/uvu/student', 'uofu': '/uofu/student' }
  };

  const redirectPath = userMap[role]?.[school] || '/unauthorized';
  redirect(redirectPath);
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    handleSessionRedirect(session)
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-slate-100">
      <LoginForm />
    </main>
  );
}