"use client";

import { useAuth } from "@/context/auth-context";
import { SignInForm } from "@/components/ui/auth/sign-in-form";

export default function AuthPage() {
    const { setIsAuth } = useAuth();
    setIsAuth(false);

    return (
        <>
            <h1 className="text-3xl font-bold underline">Auth</h1>
            <SignInForm />
        </>
    );
};