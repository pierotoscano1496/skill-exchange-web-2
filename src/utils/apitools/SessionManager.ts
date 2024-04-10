import { cookies } from "next/headers"
import { JWT_COOKIE_TOKEN_NAME } from "../constants"
import { getServerInstanceAuthorized } from "../constants.server"

export const checkUsuario = async () => {
    if (cookies().get(JWT_COOKIE_TOKEN_NAME)) {
        const response = await getServerInstanceAuthorized().get("usuario");
        const usuario = response.data;

        if (usuario) {
            return true;
        }
        return false;
    }

    return false;
}