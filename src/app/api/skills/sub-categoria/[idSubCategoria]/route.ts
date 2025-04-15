import axios, { AxiosInstance } from "axios";
import { NextRequest } from "next/server";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function GET(req: NextRequest, { params }: { params: { idSubCategoria: string } }) {
    const { idSubCategoria } = params;

    try {
        const response = await axiosInstance.get(`/skill/sub-categoria/${idSubCategoria}`);
        return new Response(JSON.stringify(response.data));
    } catch (error) {
        return new Response("No se recopilaron las habilidades", {
            status: 404
        });
    }
}