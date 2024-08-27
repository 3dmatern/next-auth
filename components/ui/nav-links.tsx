"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { useAuth } from "@/context/auth-context";

import { UiButton } from "./form/ui-button";

export function NavLinks() {
    const pathname = usePathname();

    const onIsActive = (path: string): boolean => {
        return pathname === path;
    };

    return (
        <nav className="py-4 flex flex-row items-center justify-center gap-4">
            <Link
                className={cn(
                    `hover:text-teal-600 transition-colors`,
                    onIsActive("/") ? "text-teal-600" : ""
                )}
                href="/"
            >
                Главная
            </Link>

            <AuthButtons onIsActive={onIsActive} />
        </nav>
    );
};

function AuthButtons({ onIsActive }: { onIsActive: (str: string) => boolean}) {
    const { isAuth, logout } = useAuth();

    if (isAuth) {
        return (
            <>
                <Link
                    className={cn(
                        `hover:text-teal-600 transition-colors`,
                        onIsActive("/profile") ? "text-teal-600" : ""
                    )}
                    href="/profile"
                >
                    Профиль
                </Link>
                <UiButton
                    type="button"
                    onClick={logout}
                    className="w-fit bg-red-700 hover:bg-red-700/80"
                >
                    Выход
                </UiButton>
            </>
        );
    }

    return (
        <>
            <Link
                className={cn(
                    `hover:text-teal-600 transition-colors`,
                    onIsActive("/auth") ? "text-teal-600" : ""
                )}
                href="/auth"
            >
                Вход
            </Link>

            <Link
                className={cn(
                    `hover:text-teal-600 transition-colors`,
                    onIsActive("/auth/register") ? "text-teal-600" : ""
                )}
                href="/auth/register"
            >
                Регистрация
            </Link>
        </>
    );
}