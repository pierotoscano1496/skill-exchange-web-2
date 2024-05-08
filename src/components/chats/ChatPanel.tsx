"use client";

import ContactModule from "@/interfaces/chatting/ContactModule";
import { useEffect, useState } from "react";
import ChatModule from "./ChatModule";
import chatPanelStyles from "@/styles/chats/chatpanel.module.scss";
import ChatMessagingService from "@/services/ChatMessagingService";
import UsuarioBasicInfo from "@/interfaces/chatting/UsuarioBasicInfo";
import MensajeChat from "@/interfaces/models/chats/MensajeChat";

type Props = {
    idUsuario: string
}

export default ({ idUsuario }: Props) => {
    const [contacts, setContacts] = useState<ContactModule[]>([]);

    useEffect(() => {
        ChatMessagingService.connectAndSubscribe((message) => {
            const receivedMessage = JSON.parse(message.body) as MensajeChat;

            // Actualizar mensajes del módulo correspondiente
            updateContactModuleLastMessageSent(receivedMessage.idReceptor);
        });
        ChatMessagingService.activate();

        return () => {
            ChatMessagingService.deactivate();
        }
    })

    const openChatModule = (idContact: string) => {
        setContacts([...contacts].map(c => {
            if (c.contactInfo.id === idContact) {
                c.active = !c.active;
            }

            return c;
        }));
    }

    const handleSentMensajeFromModuleToMainWS = (mensaje: string, receptor: UsuarioBasicInfo) => {
        ChatMessagingService.sendMessage({
            id: crypto.randomUUID(),
            idEmisor: idUsuario,
            idReceptor: receptor.id,
            mensaje: mensaje,
            fecha: new Date()
        });
    }

    const updateContactModuleLastMessageSent = (idContact: string) => {
        setContacts([...contacts].map(c => {
            if (c.contactInfo.id === idContact) {
                c.lastMessageSent = true;
            }

            return c;
        }));
    }

    return (
        <>
            <aside className={chatPanelStyles.chatpanel}>
                <h3>Chats</h3>
                {contacts.map(c =>
                    <div onClick={() => openChatModule(c.contactInfo.id)}>
                        <span key={c.contactInfo.id}>{`${c.contactInfo.nombres} ${c.contactInfo.apellidos}`}</span>
                    </div>
                )}
            </aside>
            {
                contacts.map(c =>
                    <ChatModule key={c.contactInfo.id}
                        open={c.active}
                        idUsuario={idUsuario}
                        receptor={c.contactInfo}
                        sendMessageToMainWSPanel={handleSentMensajeFromModuleToMainWS}
                        isLastMenssageSent={c.lastMessageSent}
                    />
                )
            }
        </>
    )
}