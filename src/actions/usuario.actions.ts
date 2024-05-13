"use server";

import AsignacionSkillToUsuarioRequest from "@/interfaces/requestbody/AsignacionSkillToUsuarioRequest";
import CreateUsuarioBody from "@/interfaces/requestbody/CreateUsuarioBody";
import SkillResponse from "@/interfaces/responsebody/skill/SkillResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import UsuarioSkillsAsignadosResponse from "@/interfaces/responsebody/usuario/UsuarioSkillsAsignadosResponse";
import { getBackendInstance, getBackendInstanceAuth } from "@/utils/constants.backend";

export const obtenerUsuarioLogged = async () => {
    const resp = await getBackendInstanceAuth().get("usuario");
    return resp.data as UsuarioRegisteredResponse;
};

export const registrarUsuarioDatos = async (createUsuarioBody: CreateUsuarioBody) => {
    const resp = await getBackendInstance().post(`usuario`, createUsuarioBody);
    return resp.data as UsuarioRegisteredResponse;
}

export const asignarSkillsToUsuario = async (idUsuario: string, skillsToAsignar: AsignacionSkillToUsuarioRequest[]) => {
    const resp = await getBackendInstance().patch(`usuario/skills/${idUsuario}`, skillsToAsignar);
    return resp.data as UsuarioSkillsAsignadosResponse;
}

export const obtenerSkillsFromUsuario = async (idUsuario: string) => {
    const resp = await getBackendInstance().patch(`usuario/skills/${idUsuario}`);
    return resp.data as SkillResponse[];
}