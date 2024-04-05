import axios from "axios";
//import { cookies } from "next/headers";
import { JWT_COOKIE_TOKEN_NAME } from "./constants";

//const bearerToken = cookies().get(JWT_COOKIE_TOKEN_NAME)?.value;

export const backendInstance = axios.create({
    baseURL: "/backend/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

/* export const backendInstanceAuthorized = axios.create({
    baseURL: "/backend/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
    }
}); */