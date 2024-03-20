import UsuarioCredenciales from "@/interfaces/requestbody/UsuarioCredenciales";
import ApiTools from "./ApiTools";
import tokenManager from "./TokenManager";
import AuthenticationError from "@/errorhandling/AuthenticationError";

export default class AuthApiTools extends ApiTools {
    constructor() {
        super("auth");
    }

    async login(credenciales: UsuarioCredenciales): Promise<string> {
        try {
            const response = await this.axiosInstance.post(`/login`, credenciales);

            let token = response.headers.authorization as string;
            token = token.replace("Bearer ", "");
            tokenManager.bearerToken = token;
            return "Éxito al ingresar";
        } catch {
            throw new AuthenticationError("Error de autenticación");
        }
    }
}