import { auth } from "./auth";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

export async function isAdmin(): Promise<boolean> {
    const session = await auth();
    if (!session?.user?.email) return false;
    return adminEmails.includes(session.user.email);
}