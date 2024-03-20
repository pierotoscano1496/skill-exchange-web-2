import { TipoDocumento, TipoRegistroUsuario } from "@/utils/types";
import SkillUsuario from "../models/SkillUsuario";
import { RegistroSkill } from "./RegistroSkill";

export interface RegistroUsuarioBodyFirstStep {
    dni?: string;
    carnetExtranjeria?: string;
    tipoDocumento?: TipoDocumento;
    nombres?: string;
    apellidos?: string;
    tipo?: TipoRegistroUsuario;
    fechaNacimiento?: Date;
}

export interface RegistroUsuarioBodyRedes extends RegistroUsuarioBodyFirstStep {
    correo?: string;
    clave?: string;
    introduccion?: string;
    perfilLinkedin?: string;
    perfilFacebook?: string;
    perfilInstagram?: string;
    perfilTiktok?: string;
}

export interface RegistroUsuarioBodySkills extends RegistroUsuarioBodyRedes {
    skills: RegistroSkill[]
}