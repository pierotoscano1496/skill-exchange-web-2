"use server";

import { ENV_CONFIG } from "@/lib/config/environment";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../utils";
import { cookies } from "next/headers";
import { error } from "console";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        return {
          ok: false,
          error: "Credenciales incorrectas. Inténtalo de nuevo.",
        };
      }

      const raw = response.headers.get("Authorization") ?? "";
      const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;

      if (!token) {
        return { ok: false, error: "Token no encontrado en la respuesta." };
      }

      const { exp } = jwtDecode<JwtPayload>(token);
      const expires = new Date(exp * 1000);
      const cookieStore = await cookies();
      cookieStore.set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires,
      });

      return { ok: true };
    } catch (error) {
      console.error("An unexpected error occurred during login:", error);
      return { ok: false, error: "Error al iniciar sesión." };
    }
  }

  async logout() {
    const cookieStore = await cookies();
    cookieStore.set("auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });
  }

  async getSession() {
    const token = (await cookies()).get("auth")?.value ?? null;
    return { token };
  }
}

export const authService = new AuthService();
