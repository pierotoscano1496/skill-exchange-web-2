"use server";

import MensajeChat from "@/interfaces/models/chats/MensajeChat";
import FirstMessageChatBody from "@/interfaces/requestbody/messaging/FirstMessageChatBody";
import MessageBody from "@/interfaces/requestbody/messaging/MessageBody";
import { getBackendInstanceAuth, getBackendInstanceAuthForms } from "@/utils/constants.backend";

export const getConversationById = async (idConversation: string) => {
    const resp = await getBackendInstanceAuth().get(`chat/${idConversation}`);
    return resp.data as MensajeChat;
}

export const getConversationWithUser = async (idUsuario: string) => {
    const resp = await getBackendInstanceAuth().get(`chat/with/${idUsuario}`);
    return resp.data as MensajeChat;
}

export const getConversationsFromUserLogged = async () => {
    const resp = await getBackendInstanceAuth().get("chat/own");
    return resp.data as MensajeChat[];
}

export const sendContactMessage = async (mensajeChat: FirstMessageChatBody) => {
    // Enviar primer mensaje o enviar a la conversación existente
    const resp = await getBackendInstanceAuth().post("chat", mensajeChat);
    return resp.data as MensajeChat;
}

export const getChats = async (idReceptor: string) => {
    const resp = await getBackendInstanceAuth().get(`chat/with/${idReceptor}`);
    return resp.data as MensajeChat;
}

export const getChatsNoMessages = async (idReceptor: string) => {
    const resp = await getBackendInstanceAuth().get(`chat/with-no-messages/${idReceptor}`);
    return resp.data as MensajeChat;
}

export const saveChatFile = async (idConversation: string, formDataFile: FormData) => {
    const resp = await getBackendInstanceAuthForms().put(`chat-resources/upload/${idConversation}`, formDataFile);
    return resp.data as string;
}

export const enviarMensajeByForm = async (idConversation: string, message: MessageBody) => {
    const resp = await getBackendInstanceAuth().patch(`chat/${idConversation}/send`, message);

    return resp.data as MensajeChat;
}