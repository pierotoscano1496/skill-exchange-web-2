"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { ENV_CONFIG } from "@/lib/config/environment";
import { AUTH_COOKIE } from "@/lib/constants/auth";

type JwtPayload = { exp: number; [k: string]: unknown };

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

    (await cookies()).set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires,
    });

    return { ok: true };
  } catch (e) {
    console.error("loginAction error:", e);
    return { ok: false, error: "Error inesperado. Intenta nuevamente." };
  }
}

export async function logoutAction() {
  (await cookies()).delete(AUTH_COOKIE);
  return { ok: true };
}
