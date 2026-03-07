import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const allowedEmails = (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (allowedEmails.length === 0) return false;
            return allowedEmails.includes(user.email ?? "");
        },
    },
});
