"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { UiButton } from "./form/ui-button";
import { logOut } from "@/actions/auth";

type Props = {
    isSession: boolean;
};

export function NavLinks({ isSession }: Props) {
    const pathname = usePathname();

    const onIsActive = (path: string): boolean => {
        return pathname === path;
    };

    const authButtons = () => {
        if (isSession) {
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
                        onClick={async () => await logOut()}
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
    };

    useEffect(() => {
        console.log("nav-links: ", isSession);
    }, [isSession]);

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

            {authButtons()}
        </nav>
    );
};