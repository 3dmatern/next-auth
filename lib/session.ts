import "server-only";

// TODO: https://nextjs.org/docs/app/building-your-application/authentication#2-encrypting-and-decrypting-sessions
import { SessionPayload } from "@/lib/definitions";
import { jwtVerify, SignJWT } from "jose";

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
        const { payload } = await jwtVerify(session, encodeKey, {
            algorithms: ["HS256"]
        });
        return payload;
    } catch (error) {
        console.error("Ошибка верификации сессии");
    }
}
