import UsuarioCredenciales from "@/interfaces/requestbody/UsuarioCredenciales";
import ApiTools from "./ApiTools";
import tokenManager from "./TokenManager";
import { AxiosError } from "axios";
import ResponseServerError from "@/errorhandling/ResponseServerError";
import Usuario from "@/interfaces/Usuario";

export default class UsuarioApiTools extends ApiTools {
    constructor() {
        super("usuario");
    }

    async obtener(): Promise<Usuario> {
        try {
            const response = await this.axiosInstance.get("/", {
                headers: {
                    "Authorization": `Bearer ${tokenManager.bearerToken}`
                }
            });

            return response.data as Usuario;
        } catch (error) {
            const err = error as AxiosError;
            let mensaje: string;
            if (err.status === 404) {
                mensaje = "No hay datos del usuario";
            } else {
                mensaje = "Error al obtener información del usuario";
            }
            throw new ResponseServerError(mensaje, err.status!);
        }
    }
}