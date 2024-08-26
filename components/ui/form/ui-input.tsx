import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function UiInput(
    { className, ...rest }: InputHTMLAttributes<HTMLInputElement>
): React.ReactElement<HTMLInputElement> {
    return (
        <input
            {...rest}
            className={cn(
                `w-full py-1.5 px-2`,
                className ? className : ""
            )}
        />
    );
};