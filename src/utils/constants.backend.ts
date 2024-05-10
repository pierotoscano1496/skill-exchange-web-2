"use server";

import axios from "axios";
import { cookies } from "next/headers";

/**
 * Usar para llamadas a Endpoints públicos
 * @returns AxiosInstance
 */
export const getBackendInstance = () => {
    const backendInstanceAuth = axios.create({
        baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });

    return backendInstanceAuth;
}

/**
 * Usar para llamadas a Endpoints restringidos
 * @returns AxiosInstance
 */
export const getBackendInstanceAuth = () => {
    const bearerToken = process.env.BEARER_TOKEN_NAME ? cookies().get(process.env.BEARER_TOKEN_NAME)?.value : "";
    const backendInstanceAuth = axios.create({
        baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        }
    });

    return backendInstanceAuth;
}

/* export const backendInstanceAuthorized = axios.create({
    baseURL: "/backend/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
    }
}); */