import Usuario from "@/src/interfaces/Usuario";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("Authorization")?.value;

    if (token) {
        const response = await fetch("http://localhost:9081/api/usuario", {
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