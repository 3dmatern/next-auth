"use client";

import { useActionState } from "react";

import { signIn } from "@/actions/auth";

import { ErrorMessage } from "../error-message";
import { UiLabel } from "../form/ui-label";
import { UiInput } from "../form/ui-input";
import { UiButton } from "../form/ui-button";

export function SignInForm() {
    const [state, action, pending] = useActionState(signIn, undefined);

    return (
        <form
            action={action}
            className="flex flex-col gap-3"
        >
            <UiLabel
                name="Email"
                errorMessage={state?.errors?.email}
            >
                <UiInput type="email" name="email" placeholder="Введите email" />
            </UiLabel>

            <UiLabel
                name="Пароль"
                errorMessage={state?.errors?.password}
            >
                <UiInput type="password" name="password" placeholder="Введите пароль" />
            </UiLabel>

            {state?.message && <ErrorMessage message={state.message} />}

            <UiButton
                type="submit"
                aria-disabled={pending}
            >
                {pending ? "Аутентификация..." : "Вход"}
            </UiButton>
        </form>
    );
};