"use server";

import Skill from "@/interfaces/models/Skill";
import { getBackendInstance } from "@/utils/constants.backend";

export const obtenerSkillsBySubCategoria = async (idSubCategoria: string) => {
    const resp = await getBackendInstance().get(`skill/sub-categoria/${idSubCategoria}`)
    return resp.data as Skill[];
}