import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ["/middlewareside", "/chats", "/clientsidehoc"];

export async function middleware(req: NextRequest) {
  const bearerTokenFromCookies = (await cookies()).get("bearertoken")?.value;

  if (
    !bearerTokenFromCookies &&
    protectedRoute.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
