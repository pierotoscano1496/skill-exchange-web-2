"use server";

import CreateMatchServicioBody from "@/interfaces/requestbody/matching/CreateMatchServicioBody";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import MatchServicioProveedorDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioProveedorDetailsResponse";
import MatchServicioResponse from "@/interfaces/responsebody/matching/MatchServicioResponse";
import { TipoMatchServicioEstado } from "@/utils/types";
import axios from "axios";
import { cookies } from "next/headers";

const getBackendInstanceAuth = () => {
    const bearerToken = process.env.BEARER_TOKEN_NAME ? cookies().get(process.env.BEARER_TOKEN_NAME)?.value : "bearertoken";
    const backendInstanceAuth = axios.create({
        baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        }
    });

    return backendInstanceAuth;
}

export const registrarMatch = async (mathServicio: CreateMatchServicioBody) => {
    const resp = await getBackendInstanceAuth().post("match", mathServicio);
    return resp.data as MatchServicioResponse;
}

export const obtenerDetailsMatchsPrestamistaAndOptionalEstado = async (idPrestamista: string, estado?: TipoMatchServicioEstado) => {
    const endpoint: string = `match/details/prestamista/${idPrestamista}${estado && `/estado/${estado}`}`;
    const resp = await getBackendInstanceAuth().get(endpoint);
    return resp.data as MatchServicioDetailsResponse[];
}

export const obtenerDetailsMatchsPrestamistaEnServicio = async (idPrestamista: string) => {
    const endpoint: string = `match/details/prestamista/${idPrestamista}/serving`;
    const resp = await getBackendInstanceAuth().get(endpoint);
    return resp.data as MatchServicioDetailsResponse[];
}

export const obtenerDetailsMatchsByCliente = async (idCliente: string) => {
    const resp = await getBackendInstanceAuth().get(`match/details/cliente/${idCliente}`);
    return resp.data as MatchServicioProveedorDetailsResponse[];
}

export const obtenerDetailsMatchsFromProveedor = async (idProveedor: string) => {
    const resp = await getBackendInstanceAuth().get(`match/details/proveedor/${idProveedor}`);
    return resp.data as MatchServicioProveedorDetailsResponse[];
}

export const actualizarMatchEstado = async (id: string, estado: TipoMatchServicioEstado) => {
    const resp = await getBackendInstanceAuth().patch(`match/estado/${id}`, estado);
    return resp.data as MatchServicioResponse;
}