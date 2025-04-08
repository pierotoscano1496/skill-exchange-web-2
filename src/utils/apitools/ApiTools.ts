import AuthenticationError from "@/errorhandling/AuthenticationError";
import ResponseServerError from "@/errorhandling/ResponseServerError";
import Usuario from "@/interfaces/Usuario";
import UsuarioCredenciales from "@/interfaces/requestbody/UsuarioCredenciales";
import HttpResponse from "@/interfaces/responsebody/HttpResponse";
import axios, { AxiosError, AxiosInstance } from "axios";
import tokenManager from "./TokenManager";

export default class ApiTools {
    private _axiosInstance: AxiosInstance;

    /**
     * Getter axiosInstance
     * @return {AxiosInstance}
     */
    public get axiosInstance(): AxiosInstance {
        return this._axiosInstance;
    }

    constructor(mainPath: string) {
        this._axiosInstance = axios.create({
            baseURL: `https://skill-exchange-backend-b36ba056d3f1.herokuapp.com/api/${mainPath}`,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}