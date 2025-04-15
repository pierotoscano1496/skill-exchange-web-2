import axios from "axios";
import { cookies } from "next/headers";

/**
 * Usar para llamadas a Endpoints públicos
 * @returns AxiosInstance
 */
export const getBackendInstance = () => {
  console.log(process.env.NEXT_PUBLIC_MAIN_URL_BACKEND);
  const backendInstanceAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND || "https://skill-exchange-backend-b36ba056d3f1.herokuapp.com/api/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return backendInstanceAuth;
};

/**
 * Usar para llamadas a Endpoints restringidos
 * @returns Promise<AxiosInstance>
 */
export const getBackendInstanceAuth = async () => {
  const bearerToken = process.env.BEARER_TOKEN_NAME
    ? (await cookies()).get(process.env.BEARER_TOKEN_NAME)?.value
    : "";
  const backendInstanceAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return backendInstanceAuth;
};

/**
 * Usar para llamadas a Endpoints restringidos (formularios)
 * @returns AxiosInstance
 */
export const getBackendInstanceAuthForms = async () => {
  const bearerToken = (await cookies()).get(
    process.env.BEARER_TOKEN_NAME!
  )!.value;

  const backendInstanceAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MAIN_URL_BACKEND!,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return backendInstanceAuth;
};
