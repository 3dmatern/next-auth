import bcrypt from "bcrypt";
import { FormState, SignUpFormSchema } from "@/lib/definitions";

export async function signUp(state: FormState, formData: FormData) {
    // 1. Валидация полей формы
    const validatedFields = SignUpFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // Если какие-либо поля формы невалидны, возвращаем ошибку
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    // 2. Дальнейшие действия по аутентификации...
    // например: сохранение данных в БД или связь с провайдером.
    const { name, email, password } = validatedFields.data;
    // например Хешируйте пароль пользователя перед его сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Вставьте пользователя в базу данных или вызовите API библиотеки аутентификации.
};
