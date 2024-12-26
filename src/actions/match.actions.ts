"use server";

import CreateMatchServicioBody from "@/interfaces/requestbody/matching/CreateMatchServicioBody";
import UpdateEstadoMatchServicioBody from "@/interfaces/requestbody/matching/UpdateEstadoMatchServicioBody";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import MatchServicioProveedorDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioProveedorDetailsResponse";
import MatchServicioResponse from "@/interfaces/responsebody/matching/MatchServicioResponse";
import { getBackendInstanceAuth } from "@/utils/constants.backend";
import { TipoMatchServicioEstado } from "@/utils/types";

export const registrarMatch = async (mathServicio: CreateMatchServicioBody) => {
    const resp = await (await getBackendInstanceAuth()).post("match", mathServicio);
    return resp.data as MatchServicioResponse;
}

export const obtenerDetailsMatchsPrestamistaAndOptionalEstado = async (idPrestamista: string, estado?: TipoMatchServicioEstado) => {
    const endpoint: string = `match/details/prestamista/${idPrestamista}${estado && `/estado/${estado}`}`;
    const resp = await (await getBackendInstanceAuth()).get(endpoint);
    return resp.data as MatchServicioDetailsResponse[];
}

export const obtenerDetailsMatchsPrestamistaEnServicio = async (idPrestamista: string) => {
    const endpoint: string = `match/details/prestamista/${idPrestamista}/serving`;
    const resp = await (await getBackendInstanceAuth()).get(endpoint);
    return resp.data as MatchServicioDetailsResponse[];
}

export const obtenerDetailsMatchsByCliente = async (idCliente: string) => {
    const resp = await (await getBackendInstanceAuth()).get(`match/details/cliente/${idCliente}`);
    return resp.data as MatchServicioProveedorDetailsResponse[];
}

export const obtenerDetailsMatchsFromProveedor = async (idProveedor: string) => {
    const resp = await (await getBackendInstanceAuth()).get(`match/details/proveedor/${idProveedor}`);
    return resp.data as MatchServicioProveedorDetailsResponse[];
}

export const actualizarMatchEstado = async (id: string, requestbody: UpdateEstadoMatchServicioBody) => {
    const resp = await (await getBackendInstanceAuth()).patch(`match/estado/${id}`, requestbody);
    return resp.data as MatchServicioResponse;
}