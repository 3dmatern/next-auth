import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

import { NavLinks } from "@/components/ui/nav-links";
import { cn } from "@/lib/cn";
import { getSession } from "@/lib/session";

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
                <NavLinks isSession={!!session} />
                <main className="h-full flex flex-col items-center justify-between">
                    {children}
                </main>
            </body>
        </html>
    );
}
