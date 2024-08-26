import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    console.log("middleware url:", request.url);
    return NextResponse.next();
};