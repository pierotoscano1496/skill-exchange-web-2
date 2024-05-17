"use server";

import Skill from "@/interfaces/models/Skill";
import SkillResponse from "@/interfaces/responsebody/skill/SkillResponse";
import { getBackendInstance } from "@/utils/constants.backend";

export const obtenerSkills = async () => {
    const resp = await getBackendInstance().get("skill");
    return resp.data as SkillResponse[];
}

export const obtenerSkillsBySubCategoria = async (idSubCategoria: string) => {
    const resp = await getBackendInstance().get(`skill/sub-categoria/${idSubCategoria}`);
    return resp.data as Skill[];
}