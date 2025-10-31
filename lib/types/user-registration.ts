import { UsuarioTipo, UsuarioTipoDocumento } from "../constants/enums";

export interface RegisterUserRequest {
  dni?: string;
  carnetExtranjeria?: string;
  tipoDocumento: UsuarioTipoDocumento;
  correo: string;
  nombres: string;
  apellidos: string;
  tipo: UsuarioTipo;
  fechaNacimiento: string;
  clave: string;
  perfilLinkedin?: string;
  perfilFacebook?: string;
  perfilInstagram?: string;
  perfilTiktok?: string;
  introduccion: string;
  skills?: {
    idSkill: string;
    nivelConocimiento: number;
    descripcion: string;
  }[];
}
