"use server";

import ComentarioServicioBody from "@/interfaces/requestbody/review/ComentarioServicioBody";
import ComentarioServicioResponse from "@/interfaces/responsebody/review/ComentarioServicioResponse";
import { getBackendInstanceAuth } from "@/utils/constants.backend";

export const comentarServicio = async (comentario: ComentarioServicioBody) => {
    const resp = await (await getBackendInstanceAuth()).post("servicios/comments/publish", comentario);
    return resp.data as ComentarioServicioResponse;
}