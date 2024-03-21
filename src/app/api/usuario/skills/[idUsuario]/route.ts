import AsignacionSkillToUsuarioRequest from "@/interfaces/requestbody/AsignacionSkillToUsuarioRequest";
import { JWT_COOKIE_TOKEN_NAME } from "@/utils/constants";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

type AsignarSkillsParams = {
    params: {
        idUsuario: string;
    }
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `http://localhost:9081/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default async function PATCH(req: NextRequest, { params }: AsignarSkillsParams) {
    try {
        const { idUsuario } = params;
        const requestBody = await req.json() as AsignacionSkillToUsuarioRequest[];

        const cookiesStore = cookies();
        const bearerToken = cookiesStore.get(JWT_COOKIE_TOKEN_NAME)?.value;

        const response = await axiosInstance.patch(`/usuario/skills/${idUsuario}`, requestBody, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        });

        const skillsAsignados = response.data;

        return new Response(JSON.stringify(skillsAsignados));
    } catch (error) {
        return new Response("Error durante la asignación de habilidades", {
            status: 500
        });
    }
}