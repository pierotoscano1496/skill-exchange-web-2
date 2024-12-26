import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import { JWT_COOKIE_TOKEN_MAX_AGE, JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";
import { getBackendInstance } from "@/utils/constants.backend";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const { email, password } = await req.json();

    try {
        const response = await getBackendInstance().post("/auth/login", {
            email,
            password
        });

        const bearertoken = response.headers.authorization as string;
        const token = bearertoken.replace("Bearer ", "");

        const bearerTokenSerialized = cookie.serialize(JWT_COOKIE_TOKEN_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: JWT_COOKIE_TOKEN_MAX_AGE,
            sameSite: "strict",
            path: "/"
        });

        return new Response("OK", {
            status: 200,
            headers: {
                "Set-Cookie": bearerTokenSerialized
            }
        });
    } catch (error) {
        return new NextResponse("Error de autenticación", {
            status: 401
        });
    }
}