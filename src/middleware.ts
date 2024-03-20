import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ["/middlewareside", "/chats", "/clientsidehoc"];

export function middleware(req: NextRequest) {
    const cookiesStore = cookies();
    const bearerTokenFromCookies = cookiesStore.get("bearertoken")?.value;

    if (!bearerTokenFromCookies && protectedRoute.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    /* if (req.nextUrl.pathname === "/login" && token) {
        return NextResponse.redirect(new URL("middlewareside", req.url));
    } */

    return NextResponse.next();
}

/* export function middleware(request:NextRequest){
    const currentUser=request.cookies.get('currentUser')?.value;

    if(currentUser){
        return NextResponse.redirect(new URL("/chats",request.url))
    }
    return NextResponse.redirect(new URL("/login",request.url))
}

export const config={
    matcher
} */