"use server";

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { SessionPayload } from "@/lib/definitions";

const secretKey = process.env.SESSION_SECRET;
const encodeKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodeKey);
};

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify<JWTPayload & SessionPayload>(session, encodeKey, {
            algorithms: ["HS256"]
        });
        return payload;
    } catch (error) {
        console.error("Ошибка верификации сессии");
    }
};

export async function createSession(userId: number) {
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ userId, expires });

    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: "lax",
        path: "/"
    });
};

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return null;

    const expires = new Date(Date.now() + 10 * 1000);
    const response = NextResponse.next();
    response.cookies.set("session", session, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: "lax",
        path: "/"
    });

    return response;
};

export async function deleteSession() {
    cookies().delete("session");
};
