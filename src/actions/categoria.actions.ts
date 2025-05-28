"use server";

import Categoria from "@/interfaces/models/Categoria";
import { getBackendInstance } from "@/utils/constants.backend";

export const obtenerCategorias = async () => {
  const resp = await (await getBackendInstance()).get("categoria");
  return resp.data as Categoria[];
};

export const obtenerCategoriasDetails = async () => {
  const resp = await (await getBackendInstance()).get("categoria/details");
  return resp.data as Categoria[];
};
