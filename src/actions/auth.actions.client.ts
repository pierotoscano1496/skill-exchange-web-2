"use server";

import { getBackendInstance } from "@/utils/constants.backend";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { throws } from "node:assert";

export const loginUsuario = async (email: string, password: string) => {
  try {
    const resp = await (
      await getBackendInstance()
    ).post("/auth/login", { email, password });
    const bearertoken = resp.headers.authorization as string;
    if (bearertoken) {
      const token = bearertoken.replace("Bearer ", "");
      const cookieStore = await cookies();
      cookieStore.set(process.env.BEARER_TOKEN_NAME!, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: Number.parseInt(process.env.BEARER_TOKEN_MAX_AGE!),
        sameSite: "strict",
        path: "/",
      });

      return true;
    } else {
      return false;
    }
  } catch (error) {
    let mensaje = "Ocurrió un error, inténtelo más tarde";
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        if (axiosError.response.status === 401) {
          mensaje = "Regístrese para acceder";
        }
      }
    }

    throw new Error(mensaje);
  }
};
