import { ENV_CONFIG } from "../config/environment";
import type { ApiResponse, Usuario } from "../types/api-responses";
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
}

export const userService = new UserService();
