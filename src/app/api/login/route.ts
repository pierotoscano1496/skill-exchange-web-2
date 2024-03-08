import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
    const request = await req.json();
    const { correo, contrasena } = request.body;

    try {
        const csrfToken = request.headers["XSRF-TOKEN"];
        const response = await axios.post("http://localhost:9081/api/auth/login", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": `XSRF-TOKEN=${csrfToken}`,
                "X-XSRF-TOKEN": csrfToken
            },
            body: JSON.stringify({
                email: correo,
                password: contrasena
            })
        });

        if (response.status === 200) {
            const bearerToken = response.headers["Authorization"] as string;

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
    } catch (error) {
        console.log(error)

        return new Response("Error de servidor", {
            status: 400,
        })
    }
}