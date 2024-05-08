"use client";

import ContactModule from "@/interfaces/chatting/ContactModule";
import { useEffect, useState } from "react";
import ChatModule from "./ChatModule";
import chatPanelStyles from "@/styles/chats/chatpanel.module.scss";
import ChatMessagingService from "@/services/ChatMessagingService";
import UsuarioBasicInfo from "@/interfaces/chatting/UsuarioBasicInfo";
import MensajeChat from "@/interfaces/models/chats/MensajeChat";
import { getConversationWithUser, getConversationsFromUserLogged } from "@/actions/chatting.actions";
import Message from "@/interfaces/models/chats/Message";
import Contact from "@/interfaces/models/chats/Contact";

type Props = {
    idUserLogged: string
    onOpenChatModule: (idConversacion: string) => void
}

interface ContactoUnico {
    idConversation: string;
    contact: Contact;
    active: boolean;
}

export default ({ idUserLogged, onOpenChatModule }: Props) => {
    const [contactosUnicos, setContactosUnicos] = useState<ContactoUnico[]>([]);

    useEffect(() => {
        const loadConversaciones = async () => {
            const conversations = await getConversationsFromUserLogged();

            const uniqueContacts: ContactoUnico[] = [];
            conversations.forEach(conversation => {
                const contactoUnico = conversation.contacts
                    .filter(contact => contact.idContact !== idUserLogged)
                    .map(contact => ({
                        idConversation: conversation.id,
                        contact,
                        active: false
                    } as ContactoUnico));

                uniqueContacts.push(...contactoUnico);
            });
            setContactosUnicos(uniqueContacts);
        }

        loadConversaciones();

        return (() => {
            setContactosUnicos([]);
        })
    }, []);

    return (
        <aside className={`${chatPanelStyles.chatpanel} flex-grow-1`}>
            <h3>Chats</h3>
            {contactosUnicos.map(c =>
                <div onClick={() => onOpenChatModule(c.idConversation)}>
                    <span key={c.idConversation}>{c.contact.fullName}</span>
                </div>
            )}
        </aside>
    )
}