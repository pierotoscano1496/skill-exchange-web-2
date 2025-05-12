import { TipoDocumento } from "@/utils/types";
import { RegistroSkill } from "./RegistroSkill";

export interface RegistroUsuarioBodyFirstStep {
  id?: string;
  dni?: string;
  carnetExtranjeria?: string;
  tipoDocumento?: TipoDocumento;
  nombres?: string;
  apellidos?: string;
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
  skills: RegistroSkill[];
}
