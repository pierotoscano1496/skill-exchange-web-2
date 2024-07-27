import axios from "axios";

export const loginUsuario = async (email: string, password: string) => {
    /* const resp = await getBackendInstance().post("auth/login", { email, password });
    const bearertoken = resp.headers.authorization as string;
    const token = bearertoken.replace("Bearer ", "");
    return token; */
    const resp = await axios.post("/api/login", { email, password });
    return resp;
};