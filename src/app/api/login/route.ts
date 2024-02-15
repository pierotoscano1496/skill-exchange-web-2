import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    console.log(body);
    const { correo, contrasena } = body;
    let bearerToken = null;

    try {
        const response = await fetch("http://localhost:9081/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: correo,
                password: contrasena
            })
        });

        if (response.status === 200) {
            bearerToken = response.headers.get("Authorization")!!;

            return new Response("Hola usuario", {
                status: 200,
                headers: {
                    'Authorization': bearerToken
                }
            })
        } else {
            return new Response("No autorizado", {
                status: 401,
            })
        }
    } catch {
        return new Response("Error de servidor", {
            status: 400,
        })
    }
}