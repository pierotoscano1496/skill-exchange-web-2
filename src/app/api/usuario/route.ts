import Usuario from "@/interfaces/Usuario";
import UsuarioApiTools from "@/utils/apitools/UsuarioApiTools";
import { JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function GET(req: NextRequest) {
    try {
        const bearerToken = (await cookies()).get(JWT_COOKIE_TOKEN_NAME)?.value;

        const response = await axiosInstance.get("/usuario", {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        });

        const usuario = response.data;

        return new Response(JSON.stringify(usuario));
    } catch (error) {
        return new Response("Usuario no autenticado", {
            status: 404
        });
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const token = data.token;

    if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL_BACKEND}usuario`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 200) {
            const usuario: Usuario = await response.json() as Usuario;

            return new Response(JSON.stringify(usuario), {
                status: 200
            });
        }

        return new Response("Usuario no autenticado", {
            status: 404
        });
    }

    return new Response("Usuario no autorizado", {
        status: 401
    });
}