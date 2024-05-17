"use client";

import { useEffect, useState } from "react";
import chatPanelStyles from "@/app/styles/chats/chatpanel.module.scss";
import { getConversationsFromUserLogged } from "@/actions/chatting.actions";
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
    const [idConversationActive, setIdConversationActive] = useState<string>();

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
            {contactosUnicos.map(c =>
                <div key={c.idConversation}
                    className={`${chatPanelStyles.contactModule} ${idConversationActive === c.idConversation && chatPanelStyles.active}`}
                    onClick={() => {
                        onOpenChatModule(c.idConversation);
                        setIdConversationActive(c.idConversation)
                    }}>
                    <span>{c.contact.fullName}</span>
                </div>
            )}
        </aside>
    )
}