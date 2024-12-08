import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

// Detect whether or not a user is logged in and then redirect them to the appropriate page
const handleSessionRedirect = (session) => {
  const { role, school } = session.user;

  const userMap = {
    admin: { 'uvu': '/uvu/admin', 'uofu': '/uofu/admin' },
    // admin: {
    //   'uvu': (path) => path.startsWith('/uvu/admin') ? '/uvu/admin': '/unauthorized',
    //   'uofu': (path) => path.startsWith('/uofu/admin') ? '/uofu/admin': '/unauthorized',
    // },
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
    <main>
      <LoginForm />
    </main>
  );
}