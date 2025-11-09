import Usuario from "@/src/interfaces/Usuario";
import { NextRequest } from "next/server";
import { ENV_CONFIG } from "@/lib/config/environment";
import { AUTH_COOKIE } from "@/lib/constants/auth";

export async function GET(req: NextRequest) {
    const token =
        req.cookies.get("Authorization")?.value ??
        req.cookies.get(AUTH_COOKIE)?.value;

    if (token) {
        const response = await fetch(
            `${ENV_CONFIG.API.BASE_URL}${ENV_CONFIG.API.ENDPOINTS.USUARIO_AUTH}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            const usuario: Usuario = (await response.json()) as Usuario;

            return new Response(JSON.stringify(usuario), {
                status: 200,
            });
        }

        return new Response("Usuario no autenticado", {
            status: 404,
        });
    }

    return new Response("Usuario no autorizado", {
        status: 401,
    });
}