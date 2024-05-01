"use server";

import MensajeChat from "@/interfaces/models/MensajeChat";
import FirstMessageChatBody from "@/interfaces/requestbody/messaging/FirstMessageChatBody";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import { backendInstance } from "@/utils/constants.backend";
import axios from "axios";
import { cookies } from "next/headers";

const bearerToken = process.env.BEARER_TOKEN_NAME ? cookies().get(process.env.BEARER_TOKEN_NAME)?.value : "bearertoken";

const backendInstanceAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
    }
});

export const obtenerServiciosByPrestamista = async (idPrestamista: string) => {
    const resp = await backendInstanceAuth.get(`usuario/${idPrestamista}`);
    return resp.data as ServicioResponse[];
}