import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
};

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log("middleware pathname:", pathname);
    return NextResponse.next();
};