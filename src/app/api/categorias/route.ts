import axios, { AxiosInstance } from "axios";
import { NextRequest } from "next/server";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function GET(req: NextRequest) {
    try {
        const response = await axiosInstance.get("/categoria");

        const categorias = response.data;

        return new Response(JSON.stringify(categorias));
    } catch (error) {
        return new Response("No se encuentran las categorías", {
            status: 404
        });
    }
}