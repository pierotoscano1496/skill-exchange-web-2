import SubCategoria from "@/interfaces/models/SubCategoria";
import { getBackendInstance } from "@/utils/constants.backend";

export const obtenerSubCategoriasByCategoria = async (idCategoria: string) => {
    const resp = await getBackendInstance().get(`sub-categoria/categoria/${idCategoria}`);
    return resp.data as SubCategoria[];
}