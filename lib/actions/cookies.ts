"use server";

import { cookies } from "next/headers";
import { Usuario } from "../types/api-responses";
import { USER_COOKIE } from "../constants/auth";

export async function getUsuario(): Promise<Usuario> {
  const cookiesStore = await cookies();
  const user = cookiesStore.get(USER_COOKIE)?.value;
  if (!user) {
    throw new Error("Usuario no encontrado en las cookies");
  }

  try {
    return JSON.parse(user) as Usuario;
  } catch (error) {
    throw new Error("Error al parsear el usuario desde las cookies");
  }
}
