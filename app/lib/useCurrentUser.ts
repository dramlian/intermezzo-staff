"use client";

import { useSession } from "next-auth/react";

export function useCurrentUser(): { name: string; email: string } {
    const { data: session } = useSession();
    return {
        name: session?.user?.name ?? session?.user?.email ?? "",
        email: session?.user?.email ?? "",
    };
}
