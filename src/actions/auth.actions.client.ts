import axios from "axios";

export const loginUsuario = async (email: string, password: string) => {
    const resp = await axios.post("/api/login", { email, password });
    return resp;
};