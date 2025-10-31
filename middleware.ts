import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { USER_COOKIE } from "./lib/constants/auth";

const AUTH_COOKIE_NAME = "auth";
const LOGIN_PATH = "/login";
const HOME_PATH = "/explorar";
const PUBLIC_PATHS = [LOGIN_PATH, "/register"];

function isPublicPath(path: string) {
  return PUBLIC_PATHS.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`)
  );
}

function getJwtExpiration(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const json = JSON.parse(atob(padded));
    // 'exp' viene en segundos UNIX
    return typeof json?.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

// Decodifica el JWT y verifica expiración
function isTokenExpired(token: string): boolean {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    // exp está en segundos
    console.log("Token expiration time:", new Date(decoded.exp * 1000));
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true; // Si no se puede decodificar, lo consideramos expirado
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Leer el token de la cookie
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  // Obtener información del usuario de la cookie
  const userCookie = request.cookies.get(USER_COOKIE)?.value;

  const isAuthenticated = token && !isTokenExpired(token) && userCookie;

  if (isPublicPath(pathname)) {
    if (isAuthenticated && pathname.startsWith(LOGIN_PATH)) {
      const url = request.nextUrl.clone();
      url.pathname = HOME_PATH;
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)).*)",
  ],
};
