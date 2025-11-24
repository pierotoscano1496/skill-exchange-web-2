"use client";

import { jwtDecode } from "jwt-decode";
import { ENV_CONFIG } from "@/lib/config/environment";
import { AUTH_COOKIE, USER_COOKIE } from "@/lib/constants/auth";
import { apiService } from "@/lib/services/api-service";
import type { Usuario } from "@/lib/types/api-responses";

type JwtPayload = { exp: number; [k: string]: unknown };

// Cookie helpers (client-side)
function setCookie(
  name: string,
  value: string,
  opts: { expires?: Date; path?: string; secure?: boolean; sameSite?: "lax" | "strict" | "none" } = {}
) {
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (opts.expires) cookie += `; Expires=${opts.expires.toUTCString()}`;
  cookie += `; Path=${opts.path ?? "/"}`;
  if (opts.secure) cookie += "; Secure";
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
  document.cookie = cookie;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`;
}

function readCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export async function loginAction(email: string, password: string) {
  try {
    const res = await fetch(
      `${ENV_CONFIG.API.BASE_URL}${ENV_CONFIG.API.ENDPOINTS.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { ok: false, error: "Credenciales inválidas." };
    }

    const raw = res.headers.get("Authorization") ?? "";
    const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;
    if (!token) {
      return { ok: false, error: "Token no encontrado en la respuesta." };
    }

    const { exp } = jwtDecode<JwtPayload>(token);
    const expires = new Date(exp * 1000);

    // Guardar token (no httpOnly en static export)
    setCookie(AUTH_COOKIE, token, {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires,
    });

    // Obtener usuario y guardarlo en cookie legible por el cliente
    const usuarioResp = await apiService.getUsuario();
    const usuario: Usuario | null = usuarioResp?.data ?? null;
    if (!usuario) {
      return { ok: false, error: "Usuario no encontrado." };
    }

    setCookie(USER_COOKIE, JSON.stringify(usuario), {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires,
    });

    return { ok: true };
  } catch (e) {
    console.error("loginAction error:", e);
    return { ok: false, error: "Error inesperado. Intenta nuevamente." };
  }
}

export async function logoutAction() {
  try {
    const token = readCookie(AUTH_COOKIE);
    if (token) {
      await fetch(
        `${ENV_CONFIG.API.BASE_URL}${ENV_CONFIG.API.ENDPOINTS.LOGOUT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token.startsWith("Bearer ")
              ? token
              : `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );
    }
    deleteCookie(AUTH_COOKIE);
    deleteCookie(USER_COOKIE);
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al cerrar sesión." };
  }
}

export async function getToken() {
  if (typeof window === "undefined") return "";
  const v = readCookie(AUTH_COOKIE);
  return v ? decodeURIComponent(v) : "";
}
