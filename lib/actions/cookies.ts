"use client";

import { Usuario } from "../types/api-responses";
import { USER_COOKIE } from "../constants/auth";

export function getUsuario(): Usuario {
  if (typeof window === "undefined") {
    throw new Error("Esta función solo puede ejecutarse en el cliente");
  }

  const user = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${USER_COOKIE}=`))
    ?.split("=")[1];

  if (!user) {
    throw new Error("Usuario no encontrado en las cookies");
  }

  try {
    return JSON.parse(decodeURIComponent(user)) as Usuario;
  } catch (error) {
    throw new Error("Error al parsear el usuario desde las cookies");
  }
}
