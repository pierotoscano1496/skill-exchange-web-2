"use server";

import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import axios from "axios";
import { cookies } from "next/headers";

const getBackendInstanceAuth = () => {
    const bearerToken = process.env.BEARER_TOKEN_NAME ? cookies().get(process.env.BEARER_TOKEN_NAME)?.value : "bearertoken";
    const backendInstanceAuth = axios.create({
        baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        }
    });

    return backendInstanceAuth;
}

export const obtenerUsuarioLogged = async () => {
    const resp = await getBackendInstanceAuth().get("usuario");
    return resp.data as UsuarioRegisteredResponse;
};