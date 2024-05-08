"use client";

import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ChatModule from "@/components/chats/ChatModule";
import ChatPanel from "@/components/chats/ChatPanel";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import { useEffect, useState } from "react";

export default () => {
    const [usuarioLogged, setUsuarioLogged] = useState<UsuarioRegisteredResponse>();
    const [idConversacionSelected, setIdConversacionSelected] = useState<string>();

    useEffect(() => {
        const setup = async () => {
            const usuario = await obtenerUsuarioLogged();
            setUsuarioLogged(usuario);
        }

        setup();
    }, [])

    const openChatModule = (idConversacion: string) => {
        setIdConversacionSelected(idConversacion);
    }

    return (
        <div className="container row">
            {usuarioLogged &&
                <>
                    <ChatPanel idUserLogged={usuarioLogged.id}
                        onOpenChatModule={openChatModule}
                    />
                    {idConversacionSelected &&
                        <ChatModule idConversacion={idConversacionSelected}
                            idUsuarioLogged={usuarioLogged.id}
                        />
                    }

                </>
            }
        </div>
    )
}