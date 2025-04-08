import CreateServicioBody from "@/interfaces/requestbody/servicio/CreateServicioBody";
import ServicioRegisteredResponse from "@/interfaces/responsebody/servicio/ServicioRegisteredResponse";
import { JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";
import axios, { AxiosInstance } from "axios";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `https://skill-exchange-backend-b36ba056d3f1.herokuapp.com/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function POST(req: NextRequest, res: NextApiResponse) {
    try {
        const body: CreateServicioBody = await req.json();
        const bearerToken = (await cookies()).get(JWT_COOKIE_TOKEN_NAME)?.value;

        const response = await axiosInstance.post("/servicio", body, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        });

        const servicio = response.data as ServicioRegisteredResponse;

        return new Response(JSON.stringify(servicio));
    } catch (error) {
        return new Response("Error al registrar el servicio", {
            status: 500
        });
    }
}