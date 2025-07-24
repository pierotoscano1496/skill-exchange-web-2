import { ENV_CONFIG } from "../config/environment";
import type { ApiResponse, SkillInfo, Usuario } from "../types/api-responses";
import { apiService } from "./api-service";

export interface RegisterUserRequest {
  dni?: string;
  carnetExtranjeria?: string;
  tipoDocumento: "dni" | "ce";
  correo: string;
  nombres: string;
  apellidos: string;
  tipo: "cliente" | "trabajador";
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

class UserService {
  async registerUser(data: RegisterUserRequest): Promise<ApiResponse<Usuario>> {
    return apiService.fetchApi<Usuario>(ENV_CONFIG.API.ENDPOINTS.USUARIO, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getOwnSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
    return apiService.fetchApi<SkillInfo[]>(
      ENV_CONFIG.API.ENDPOINTS.USUARIO_OWN_SKILLS_INFO,
      {
        method: "GET",
      },
      true
    );
  }
}

export const userService = new UserService();
