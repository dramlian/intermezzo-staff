import { auth } from "./app/lib/auth";
import { NextResponse } from "next/server";

const allowedEmails = (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

export default auth((req) => {
    if (!req.auth) {
        const signInUrl = new URL("/api/auth/signin", req.url);
        signInUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(signInUrl);
    }

    const email = req.auth.user?.email ?? "";
    if (!allowedEmails.includes(email)) {
        return NextResponse.redirect(new URL("/api/auth/signout", req.url));
    }
});

export const config = {
    matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};