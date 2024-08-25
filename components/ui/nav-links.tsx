"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks() {
    const pathname = usePathname();

    const onIsActive = (path: string): boolean => {
        return pathname === path;
    };

    return (
        <nav className="py-4 flex flex-row gap-4">
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
                    onIsActive("/") ? "text-teal-600" : ""
                )}
                href="/auth"
            >
                Вход
            </Link>

            <Link
                className={cn(
                    `hover:text-teal-600`,
                    onIsActive("/") ? "text-teal-600" : ""
                )}
                href="/auth/register"
            >
                Регистрация
            </Link>
        </nav>
    );
};