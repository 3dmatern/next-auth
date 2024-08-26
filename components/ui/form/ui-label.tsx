"use client";

import { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type Props = {
    name: string;
    errorMessage?: string | string[];
};

export function UiLabel({
    name,
    errorMessage,
    className,
    children,
    ...rest
}: Props & LabelHTMLAttributes<HTMLLabelElement>): React.ReactElement<HTMLLabelElement> {
    return (
        <label
            {...rest}
            className={cn(
                "w-full block text-sm font-medium leading-6 text-gray-800",
                className ? className : "",
            )}
        >
            <span className="block mb-1">{name}</span>

            {children}
            
            {
                errorMessage
                    && typeof errorMessage === "string"
                    && <p className="text-sm text-red-600">{errorMessage}</p>
            }
            {
                Array.isArray(errorMessage)
                    && errorMessage.map(err => (
                        <p key={err} className="text-sm text-red-600">{err}</p>
                    )
                )
            }
        </label>
    );
};