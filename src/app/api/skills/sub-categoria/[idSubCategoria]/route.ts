import axios, { AxiosInstance } from "axios";
import { NextRequest } from "next/server";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://backend:9081/api`,
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