"use server";

import CreateMatchServicioBody from "@/interfaces/requestbody/matching/CreateMatchServicioBody";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import MatchServicioResponse from "@/interfaces/responsebody/matching/MatchServicioResponse";
import { TipoMatchServicioEstado } from "@/utils/types";
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

export const registrarMatch = async (mathServicio: CreateMatchServicioBody) => {
    const resp = await backendInstanceAuth.post("match", mathServicio);
    return resp.data as MatchServicioResponse;
}

export const obtenerDetailsMatchsPrestamistaAndOptionalEstado = async (idPrestamista: string, estado?: TipoMatchServicioEstado) => {
    const endpoint: string = `match/details/prestamista/${idPrestamista}${estado && `/estado/${estado}`}`;
    const resp = await backendInstanceAuth.get(endpoint);
    return resp.data as MatchServicioDetailsResponse[];
}

export const actualizarMatchEstado = async (id: string, estado: TipoMatchServicioEstado) => {
    const endpoint: string = `match/estado/${id}`;
    const resp = await backendInstanceAuth.patch(endpoint, estado);
    return resp.data as MatchServicioResponse;
}