"use client";

import { getChats } from "@/actions/chatting.actions";
import ContactModule from "@/interfaces/chatting/ContactModule";
import MensajeChat from "@/interfaces/models/chats/MensajeChat";
import ChatMessagingService from "@/services/ChatMessagingService";
import { useEffect, useState } from "react";
import chattingStyles from "@/styles/chats/chatting.module.scss";
import UsuarioBasicInfo from "@/interfaces/chatting/UsuarioBasicInfo";

type Params = {
    idUsuario: string,
    receptor: UsuarioBasicInfo,
    open: boolean,
    sendMessageToMainWSPanel: (mensaje: string, receptor: UsuarioBasicInfo) => void,
    isLastMenssageSent: boolean
}

export default ({ idUsuario, receptor, open, sendMessageToMainWSPanel, isLastMenssageSent }: Params) => {
    const [messages, setMessages] = useState<MensajeChat[]>([]);
    const [newMensaje, setNewMensaje] = useState<string>("");

    useEffect(() => {
        /* ChatMessagingService.connectAndSubscribe((message) => {
            const receivedMessage = JSON.parse(message.body) as MensajeChat;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
        ChatMessagingService.activate(); */

        // Obtener mensajes:
        loadMensajes();

        /* return () => {
            ChatMessagingService.deactivate();
        } */
    }, []);

    const loadMensajes = async () => {
        const mensajes = await getChats(receptor.id);
        setMessages(mensajes);
    }

    const enviarMensaje = () => {
        /* ChatMessagingService.sendMessage({
            id: crypto.randomUUID(),
            idEmisor: idUsuario,
            idReceptor: receptor.id,
            mensaje: newMensaje,
            fecha: new Date()
        }); */

        // Enviar mensaje al web socket del panel
        sendMessageToMainWSPanel(newMensaje, receptor);

        //Actualizar mensajes
        setNewMensaje("");
    }

    return (
        <>
            {open &&
                <div className={chattingStyles.chattingModule}>
                    <div className={chattingStyles.contactName}>
                        <h3>{`${receptor.nombres} ${receptor.apellidos}`}</h3>
                    </div>
                    <div className={chattingStyles.bubbleContent}>
                        {messages.map(m => (
                            <div className={`${chattingStyles.bubbleMessage} ${m.idEmisor == idUsuario ? chattingStyles.myself : chattingStyles.themself}`}>
                                <span>{m.mensaje}</span>
                            </div>
                        ))}
                    </div>
                    <div className={chattingStyles.sendOption}>
                        <input type="text"
                            value={newMensaje}
                            onChange={(e) => setNewMensaje(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()} />
                        {
                            !isLastMenssageSent && <span>No se pudo enviar el mensaje. Inténtelo de nuevo</span>
                        }
                    </div>
                </div>
            }
        </>
    )
}