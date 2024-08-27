"use server";

import prisma from "@/lib/prisma";

export async function getUser(userId: number) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
