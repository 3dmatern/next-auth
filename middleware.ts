import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { updateSession } from "./lib/session";

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
};

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log("middleware pathname:", pathname);
    const response = await updateSession(request);

    if (pathname === "/profile" && !response) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }
    return response;
};