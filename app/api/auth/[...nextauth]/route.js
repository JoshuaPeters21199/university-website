import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ username: credentials.username })

                    if (!user) {
                        console.log('Invalid username or password');
                        return null;
                    }

                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        console.log('Invalid username or password');
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        // name: `${user.firstName} ${user.lastName}`,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        role: user.role,
                        school: user.school,
                        courses: user.courses,
                    }
                } catch (error) {
                    console.log('An error occurred: ', error)
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.school = token.school;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.username = token.username;
            session.user.courses = token.courses;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.school = user.school;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.username = user.username;
                token.courses = user.courses;
            }
            return token;
        }
    },
    secret: process.env.AUTH_SECRET,
};

const handler  = NextAuth(authOptions);
export { handler as GET, handler as POST };