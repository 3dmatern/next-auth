import { z } from "zod";

export const SignUpFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Имя должно быть не менее 2-ух символов."})
        .trim(),
    email: z.string().email({ message: "Пожалуйста, введите корректный email." }).trim(),
    password: z
        .string()
        .min(6, { message: "Длинна не менее 6-ти символов." })
        .regex(/[a-zA-Z]/, { message: "Содержать хотя бы 1 букву." })
        .regex(/[0-9]/, { message: "Содержать хотя бы 1 число." })
        .regex(/[^a-zA-Z0-9]/, { message: "Содержать хотя бы 1 специальный символ" })
        .trim()
});

export const SignInFormSchema = z.object({
    email: z.string().email({ message: "Пожалуйста, введите корректный email." }).trim(),
    password: z.string().min(6, { message: "Длина не менее 6-ти символов." }).trim()
});

export type FormStateSignUp = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string;
} | undefined;

export type FormStateSignIn = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string;
} | undefined;

export type SessionPayload = {
    userId: number;
    expires: Date;
};