import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

import { cn } from "@/lib/cn";
import { getSession } from "@/lib/session";

import AuthProvider from "@/context/auth-context";
import { NavLinks } from "@/components/ui/nav-links";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next Auth - Native",
    description: "Нативная аутентификация в Next App Router",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    return (
        <html lang="ru">
            <body className={cn(`min-h-screen px-4 md:px-0`, inter.className)}>
                <AuthProvider session={session}>
                    <NavLinks />
                    <main className="h-full flex flex-col items-center justify-between">
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
