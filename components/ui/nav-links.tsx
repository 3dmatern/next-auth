"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

export function NavLinks() {
    const pathname = usePathname();

    const onIsActive = (path: string): boolean => {
        return pathname === path;
    };

    return (
        <nav className="py-4 flex flex-row items-center justify-center gap-4">
            <Link
                className={cn(
                    `hover:text-teal-600`,
                    onIsActive("/") ? "text-teal-600" : ""
                )}
                href="/"
            >
                Главная
            </Link>

            <Link
                className={cn(
                    `hover:text-teal-600`,
                    onIsActive("/auth") ? "text-teal-600" : ""
                )}
                href="/auth"
            >
                Вход
            </Link>

            <Link
                className={cn(
                    `hover:text-teal-600`,
                    onIsActive("/auth/register") ? "text-teal-600" : ""
                )}
                href="/auth/register"
            >
                Регистрация
            </Link>
        </nav>
    );
};