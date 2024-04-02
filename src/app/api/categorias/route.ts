import { JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";
import { MAIN_SERVER_URL } from "@/utils/constants.server";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: MAIN_SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function GET(req: NextRequest) {
    try {
        const cookiesStore = cookies();
        const bearerToken = cookiesStore.get(JWT_COOKIE_TOKEN_NAME)?.value;

        /* const response = await axiosInstance.get("/categoria", {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        }); */
        const response = await axiosInstance.get("/categoria");

        const categorias = response.data;

        return new Response(JSON.stringify(categorias));
    } catch (error) {
        return new Response("No se encuentran las categorías", {
            status: 404
        });
    }
}