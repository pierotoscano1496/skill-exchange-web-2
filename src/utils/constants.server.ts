import axios from "axios";
import { cookies } from "next/headers";
import { JWT_COOKIE_TOKEN_NAME } from "./constants";

export const MAIN_SERVER_URL = "http://localhost:9081/api";

const bearerToken = cookies().get(JWT_COOKIE_TOKEN_NAME)?.value;

export const serverInstance = axios.create({
    baseURL: MAIN_SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const serverInstanceAuthorized = axios.create({
    baseURL: MAIN_SERVER_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
    }
});