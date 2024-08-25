"use client";

import { useActionState, useState } from "react";
import { useDebounce } from "use-debounce";

import { signUp } from "@/actions/auth";
import { ErrorMessage } from "../error-message";

export function SignUpForm() {
    const [email, setEmail] = useState("");
    const [state, action, pending] = useActionState(signUp, undefined);
    const [emailDebounce] = useDebounce(email, 1000);

    return (
        <form action={action}>
            <div>
                <label htmlFor="name" className="block">Имя</label>
                <input id="name" name="name" placeholder="Имя" />
            </div>
            {state?.errors?.name && <ErrorMessage message={state.errors.name} />}

            <div>
                <label htmlFor="email" className="block">Email</label>
                <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {emailDebounce && <ErrorMessage message={emailDebounce} />}
            {state?.errors?.email && <ErrorMessage message={state.errors.email} />}

            <div>
                <label htmlFor="password" className="block">Пароль</label>
                <input id="password" name="password" placeholder="Пароль" />
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Пароль должен:</p>
                    {<ErrorMessage message={state.errors.password} />}
                </div>
            )}

            <button
                type="submit"
                aria-disabled={pending}
            >
                {pending ? "Отправка..." : "Зарегистрироваться"}
            </button>
        </form>
    );
};
