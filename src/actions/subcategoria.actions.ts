"use server";

import SubCategoria from "@/interfaces/models/SubCategoria";
import SubCategoriaResponse from "@/interfaces/responsebody/subCategoria/SubCategoriaResponse";
import { getBackendInstance } from "@/utils/constants.backend";

export const obtenerSubCategorias = async () => {
    const resp = await getBackendInstance().get("sub-categoria");
    return resp.data as SubCategoriaResponse[];
}

export const obtenerSubCategoriasByCategoria = async (idCategoria: string) => {
    const resp = await getBackendInstance().get(`sub-categoria/categoria/${idCategoria}`);
    return resp.data as SubCategoria[];
}