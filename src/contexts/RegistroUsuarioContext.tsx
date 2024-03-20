"use client"

import { RegistroSkill } from "@/interfaces/registro-usuario/RegistroSkill";
import { RegistroUsuarioBodySkills } from "@/interfaces/registro-usuario/RegistroUsuarioBody";
import { TipoRegistroUsuario } from "@/utils/types";
import React from "react";

interface RegistroUsuarioContextType {
    usuarioDatos: RegistroUsuarioBodySkills,
    setUsuarioDatos: React.Dispatch<React.SetStateAction<RegistroUsuarioBodySkills>>,
    setNombres: (nombres: string) => void,
    setApellidos: (apellidos: string) => void,
    setDocumento: (documento: string) => void,
    setTipoDocumento: (tipoDocumento: string) => void,
    setFechaNacimiento: (fechaNacimiento: string) => void,
    setTipoRegistro: (tipoRegistro: TipoRegistroUsuario) => void,
    setCorreo: (correo: string) => void,
    setClave: (clave: string) => void,
    setIntroduccion: (introduccion: string) => void,
    setPerfilFacebook: (perfilFacebook: string) => void,
    setPerfilInstagram: (perfilInstagram: string) => void,
    setPerfilLinkedin: (perfilLinkedin: string) => void,
    setPerfilTiktok: (perfilTiktok: string) => void,
    addSkill: (skill: RegistroSkill) => void,
    removeSkill: (id: string) => void,
    validateRegistroUsuario: () => boolean,
    validateRegistroDatosContacto: () => boolean,
    validateRegistroSkills: () => boolean
};

export const RegistroUsuarioContext = React.createContext<RegistroUsuarioContextType>({} as RegistroUsuarioContextType);