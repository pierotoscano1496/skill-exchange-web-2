import { JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
    const cookiesStore = cookies();
    const bearerToken = cookiesStore.get(JWT_COOKIE_TOKEN_NAME)?.value;
    console.log(bearerToken);
    return NextResponse.json({ mensaje: "Token" });
}