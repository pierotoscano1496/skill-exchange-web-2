"use server";

import Categoria from "@/interfaces/models/Categoria";
import { getBackendInstance } from "@/utils/constants.backend";

export const obtenerCategorias = async () => {
    const resp = await getBackendInstance().get("categoria");
    return resp.data as Categoria[]
}