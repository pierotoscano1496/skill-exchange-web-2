"use server";

import MensajeChat from "@/interfaces/models/chats/MensajeChat";
import FirstMessageChatBody from "@/interfaces/requestbody/messaging/FirstMessageChatBody";
import MessageBody from "@/interfaces/requestbody/messaging/MessageBody";
import { backendInstance } from "@/utils/constants.backend";
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

const getBackendInstanceAuth = () => {
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

export const sendContactMessage = async (mensajeChat: FirstMessageChatBody) => {
    const resp = await getBackendInstanceAuth().post("chat", mensajeChat);

    return resp.data;
}

export const getChats = async (idReceptor: string) => {
    const resp = await getBackendInstanceAuth().get(`chat/with/${idReceptor}`);
    return resp.data as MensajeChat;
}

export const getChatsNoMessages = async (idReceptor: string) => {
    const resp = await getBackendInstanceAuth().get(`chat/with-no-messages/${idReceptor}`);
    return resp.data as MensajeChat;
}

export const saveChatFile = async (formDataFile: FormData) => {
    const resp = await getBackendInstanceAuth().post("archivos/upload", formDataFile);
    return resp.data as string;
}

export const enviarMensajeByForm = async (idConversation: string, message: MessageBody) => {
    const resp = await getBackendInstanceAuth().patch(`chat/${idConversation}/send`, message);

    return resp.data as MensajeChat;
}