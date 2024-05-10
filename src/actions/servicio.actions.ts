"use server";

import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import MensajeChat from "@/interfaces/models/chats/MensajeChat";
import FirstMessageChatBody from "@/interfaces/requestbody/messaging/FirstMessageChatBody";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";
import ServicioReviewResponse from "@/interfaces/responsebody/review/ServicioReviewResponse";
import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import { getBackendInstance, getBackendInstanceAuth } from "@/utils/constants.backend";
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
    const resp = await getBackendInstanceAuth().get(`servicio/usuario/${idPrestamista}`);
    return resp.data as ServicioResponse[];
}

export const searchServicioWithParams = async (params: SearchServiciosParametersBody) => {
    const resp = await getBackendInstanceAuth().post("servicio/busqueda", params);
    return resp.data as ServicioBusquedaResponse[];
}

export const getServicioDetails = async (id: string) => {
    const response = await getBackendInstance().get(`servicio/details/preview/${id}`);
    return response.data as ServicioDetailsResponse;
}

export const getServicioReview = async (id: string) => {
    const response = await getBackendInstance().get(`servicios/review/${id}`);
    return response.data as ServicioReviewResponse;
}
