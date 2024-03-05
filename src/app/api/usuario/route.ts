import Usuario from "@/interfaces/Usuario";
import variables from "@/utils/variables";
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

export async function POST(req: NextRequest) {
    const body = await req.json();
    const token = body.token;

    const response = await fetch(`${variables.apiRest}usuario`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const usuario = await response.json() as Usuario;
        return new Response(usuario);
    }

    return new Response(await response.text(), { status: 500 });
}