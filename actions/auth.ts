"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import {
    FormStateSignIn,
    FormStateSignUp,
    SignInFormSchema,
    SignUpFormSchema
} from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

export async function signUp(state: FormStateSignUp, formData: FormData) {
    // 1. Валидация полей формы
    const validatedFields = SignUpFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    });

    // Если какие-либо поля формы невалидны, возвращаем ошибку
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    // 2. Дальнейшие действия по аутентификации...
    // например: сохранение данных в БД или связь с провайдером.
    const { name, email, password } = validatedFields.data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return { message: "Пользователь с таким email уже существует." };
    }

    // например Хешируйте пароль пользователя перед его сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Вставьте пользователя в базу данных или вызовите API библиотеки аутентификации.
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    
    if (!newUser) {
        return {
            message: "При создании учетной записи произошла ошибка."
        }
    }

    // 4. Создаем сессию пользователя
    await createSession(newUser.id);

    // 5. Редирект пользователя
    redirect("/profile");
};

export async function signIn(state: FormStateSignIn, formData: FormData) {
    console.log(formData.get("email"));
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });
    
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password } = validatedFields.data;
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (!existingUser) {
        return { message: "Неверные учетные данные." };
    }

    const isVerifyPassword = await bcrypt.compare(password, existingUser.password);
    if (!isVerifyPassword) {
        return { message: "Неверные учетные данные." };
    }

    await createSession(existingUser.id);

    redirect("/profile");
};

export async function logOut() {
    deleteSession();
    redirect("/auth");  
};
