import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Tipo mínimo de payload que nos interesa.
 * Puedes ampliarlo con los claims personalizados que tengas.
 */
export interface JwtPayload {
  /** Expiry en segundos desde Unix epoch (RFC 7519 §4.1.4) */
  exp: number;
  /** Issued-At opcional (RFC 7519 §4.1.6) */
  iat?: number;
  [claim: string]: unknown;
}

/**
 * Devuelve la fecha de expiración como objeto Date
 * o null si el token no es válido / no trae `exp`.
 */
export function getExpirationDate(token: string): Date | null {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (typeof exp !== "number") return null;
    // JWT usa segundos → multiplicamos por 1000 para milisegundos
    return new Date(exp * 1000);
  } catch {
    return null;
  }
}

/**
 * Helper para verificar si el token ya caducó.
 */
export function isTokenExpired(token: string): boolean {
  const expDate = getExpirationDate(token);
  if (!expDate) return true; // inválido ⇒ lo tratamos como expirado
  return expDate.getTime() <= Date.now();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
