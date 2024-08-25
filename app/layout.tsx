import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { NavLinks } from "@/components/ui/nav-links";
import { cn } from "@/lib/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next Auth - Native",
    description: "Нативная аутентификация в Next App Router",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={cn(`min-h-screen px-4 md:px-0`, inter.className)}>
                <NavLinks />
                <main className="h-full flex flex-col items-center justify-between">
                    {children}
                </main>
            </body>
        </html>
    );
}
