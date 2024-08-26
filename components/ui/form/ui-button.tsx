import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes } from "react";

export function UiButton({ className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...rest}
            className={cn(
                `
                    w-full p-1.5 bg-teal-600 text-white text-sm rounded-lg
                    hover:bg-teal-600/80 transition-colors
                `,
                className ? className : ""
            )}
        >
            {children}
        </button>
    )
};
