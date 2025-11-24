import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { ENV_CONFIG } from "@/lib/config/environment";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { correo, contrasena } = body as { correo: string; contrasena: string };

  try {
    const response = await fetch(
      `${ENV_CONFIG.API.BASE_URL}${ENV_CONFIG.API.ENDPOINTS.LOGIN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: correo,
          password: contrasena,
        }),
      }
    );

    if (response.status === 200) {
      const bearerToken = response.headers.get("Authorization") ?? "";

      return new Response("Hola usuario", {
        status: 200,
        headers: {
          Authorization: bearerToken,
        },
      });
    }

    return new Response("No autorizado", { status: 401 });
  } catch {
    return new Response("Error de servidor", { status: 400 });
  }
}