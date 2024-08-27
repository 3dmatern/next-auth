"use client";

import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
    const { currentUser } = useAuth();
    return (
        <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    );
};