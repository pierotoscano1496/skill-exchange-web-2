import { CsrfData } from "@/libs/interfaces.custom";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const response = await fetch("http://localhost:9081/api/csrf/v1");

    if (response.ok) {
        const data = await response.json() as CsrfData;
        return new Response(data.token);
    }

    return new Response("Error de solicitud", {
        status: 500
    });
}