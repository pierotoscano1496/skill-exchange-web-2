import { JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type RequestParams = {
    idCategoria: string
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:9081/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export async function GET(req: NextRequest, { params }: { params: RequestParams }) {
    const { idCategoria } = params;

    try {
        const cookiesStore = cookies();
        const bearerToken = cookiesStore.get(JWT_COOKIE_TOKEN_NAME)?.value;

        const response = await axiosInstance.get(`/sub-categoria/${idCategoria}`, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        });

        const subCategorias = response.data;

        return new Response(JSON.stringify(subCategorias));
    } catch (error) {
        return new Response("No se recopilaron las subcategorías", {
            status: 404
        });
    }
}