"use client";

import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ChatModule from "@/components/chats/ChatModule";
import ChatPanel from "@/components/chats/ChatPanel";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import React, { useEffect, useState } from "react";

const MensajesPage: React.FC = () => {
  const [usuarioLogged, setUsuarioLogged] =
    useState<UsuarioRegisteredResponse>();
  const [idConversacionSelected, setIdConversacionSelected] =
    useState<string>();

  useEffect(() => {
    const setup = async () => {
      const usuario = await obtenerUsuarioLogged();
      setUsuarioLogged(usuario);
    };

    setup();
  }, []);

  const openChatModule = (idConversacion: string) => {
    setIdConversacionSelected(idConversacion);
  };

  return (
    <main>
      <div className="container row">
        {usuarioLogged && (
          <>
            <ChatPanel
              idUserLogged={usuarioLogged.id}
              onOpenChatModule={openChatModule}
            />
            {idConversacionSelected && (
              <ChatModule
                key={idConversacionSelected}
                idConversacion={idConversacionSelected}
                idUsuarioLogged={usuarioLogged.id}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
};

MensajesPage.displayName = "MensajesPage";

export default MensajesPage;
