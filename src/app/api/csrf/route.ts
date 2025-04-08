import { CsrfData } from "@/libs/interfaces.custom";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const response = await fetch("https://skill-exchange-backend-b36ba056d3f1.herokuapp.com/api/csrf/v1");

    if (response.ok) {
        const data = await response.json() as CsrfData;
        return NextResponse.json(data);
    }

    return new Response("Error de solicitud", {
        status: 500
    });
}