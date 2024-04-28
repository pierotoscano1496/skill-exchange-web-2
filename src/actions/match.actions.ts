"use server";

import CreateMatchServicioBody from "@/interfaces/requestbody/matching/CreateMatchServicioBody";
import axios from "axios";
import { cookies } from "next/headers";

const bearerToken = process.env.BEARER_TOKEN_NAME ? cookies().get(process.env.BEARER_TOKEN_NAME)?.value : "bearertoken";

const backendInstanceAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`
    }
});

export const registrarMatch = async (mathServicio: CreateMatchServicioBody) => {
    const resp = await backendInstanceAuth.post("match", mathServicio);
    return resp.data;
}