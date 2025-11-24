import { ENV_CONFIG } from "@/lib/config/environment";
import { jwtDecode } from "jwt-decode";

type JwtPayload = { exp: number; [k: string]: unknown };

const AUTH_COOKIE_NAME = "auth";

// ============== Client-side cookie helpers ==============
function setCookieClient(
  name: string,
  value: string,
  opts: { expires?: Date; path?: string; secure?: boolean; sameSite?: "lax" | "strict" | "none" } = {}
) {
  if (typeof document === "undefined") return;
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (opts.expires) cookie += `; Expires=${opts.expires.toUTCString()}`;
  cookie += `; Path=${opts.path ?? "/"}`;
  if (opts.secure) cookie += "; Secure";
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
  document.cookie = cookie;
}

function deleteCookieClient(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`;
}

function readCookieClient(name: string): string | null {
  if (typeof document === "undefined") return null;
  const v = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
  return v ? decodeURIComponent(v) : null;
}

// Try to obtain Next server cookie store when available (SSR), safe in static export
async function getServerCookieStore():
  Promise<null | { set: (name: string, value: string, opts: any) => void; get: (name: string) => { value: string } | undefined; }>
{
  try {
    const mod = await import("next/headers");
    const store = await mod.cookies();
    return store as any;
  } catch {
    return null;
  }
}

class AuthService {
  private baseUrl = ENV_CONFIG.API.BASE_URL;
  private loginEndpoint = ENV_CONFIG.API.ENDPOINTS.LOGIN;

  async login(
    email: string,
    password: string
  ): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${this.loginEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        return { ok: false, error: "Credenciales incorrectas. Inténtalo de nuevo." };
      }

      const raw = response.headers.get("Authorization") ?? "";
      const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;
      if (!token) {
        return { ok: false, error: "Token no encontrado en la respuesta." };
      }

      const { exp } = jwtDecode<JwtPayload>(token);
      const expires = new Date(exp * 1000);

      // Prefer server cookie when available (dev/SSR), fallback to client cookie for static export
      const cookieStore = await getServerCookieStore();
      if (cookieStore) {
        cookieStore.set(AUTH_COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          expires,
        });
      } else {
        setCookieClient(AUTH_COOKIE_NAME, token, {
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          expires,
        });
      }

      return { ok: true };
    } catch (err) {
      console.error("An unexpected error occurred during login:", err);
      return { ok: false, error: "Error al iniciar sesión." };
    }
  }

  async logout() {
    const cookieStore = await getServerCookieStore();
    if (cookieStore) {
      cookieStore.set(AUTH_COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: new Date(0),
      });
    } else {
      deleteCookieClient(AUTH_COOKIE_NAME);
    }
  }

  async getSession() {
    const cookieStore = await getServerCookieStore();
    const token = cookieStore
      ? cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null
      : readCookieClient(AUTH_COOKIE_NAME);
    return { token };
  }
}

export const authService = new AuthService();
