"use client";

import { useActionState, useState } from "react";
import { useDebounce } from "use-debounce";

import { signUp } from "@/actions/auth";

import { ErrorMessage } from "../error-message";
import { UiLabel } from "../form/ui-label";
import { UiInput } from "../form/ui-input";
import { UiButton } from "../form/ui-button";

export function SignUpForm() {
    const [email, setEmail] = useState("");
    const [state, action, pending] = useActionState(signUp, undefined);
    const [emailDebounce] = useDebounce(email, 1000);

    return (
        <form
            action={action}
            className="flex flex-col gap-3"
        >
            <UiLabel
                name="Имя"
                errorMessage={state?.errors?.name}
            >
                <UiInput name="name" placeholder="Введите имя" />
            </UiLabel>

            <UiLabel
                name="Email"
                errorMessage={state?.errors?.email}
            >
                <UiInput
                    id="email"
                    name="email"
                    placeholder="Введите email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailDebounce && <ErrorMessage message={emailDebounce} />}
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
                {pending ? "Отправка..." : "Зарегистрироваться"}
            </UiButton>
        </form>
    );
};
