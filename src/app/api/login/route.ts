import axios, { AxiosInstance } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import AuthenticationError from "@/errorhandling/AuthenticationError";
import AuthApiTools from "@/utils/apitools/AuthApiTools";
import cookie from "cookie";
import { JWT_COOKIE_TOKEN_MAX_AGE, JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:9081/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function POST(req: NextRequest, res: NextApiResponse) {
    const { email, password } = await req.json();

    try {
        const response = await axiosInstance.post("/auth/login", {
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

        return new Response(JSON.stringify({
            mensaje: "Éxito al autenticar"
        }), {
            status: 200,
            headers: {
                "Set-Cookie": bearerTokenSerialized
            }
        });
    } catch (error) {
        return NextResponse.json({
            mensaje: "Error de autenticación"
        }, {
            status: 401
        });
    }
}