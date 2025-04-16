"use client";

import { getConversationById, saveChatFile } from "@/actions/chatting.actions";
import ChatMessagingService from "@/services/ChatMessagingService";
import { useEffect, useState } from "react";
import chattingStyles from "@/app/styles/chats/chatting.module.scss";
import Message from "@/interfaces/models/chats/Message";
import BubbleMessage from "./BubbleMessage";
import Contact from "@/interfaces/models/chats/Contact";

type Params = {
  idUsuarioLogged: string;
  idConversacion: string;
};

const ChatModule = ({ idConversacion, idUsuarioLogged }: Params) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMensaje, setNewMensaje] = useState<string>("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [attempMensajeEnviado, setAttempMensajeEnviado] =
    useState<boolean>(false);
  const [receptor, setReceptor] = useState<Contact>();

  useEffect(() => {
    const setupChat = async () => {
      if (!isSubscribed) {
        console.log("Iniciando");

        const conversacion = await getConversationById(idConversacion);
        if (conversacion) {
          setMessages(conversacion.messages);
          const contactReceptor = conversacion.contacts.find(
            (c) => c.idContact != idUsuarioLogged
          )!;
          setReceptor(contactReceptor);

          ChatMessagingService.connectAndSubscribe(
            conversacion.id,
            (message) => {
              const receivedMessage = JSON.parse(message.body) as Message;
              //setMessages([...messages, receivedMessage]);
              setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            }
          );
          ChatMessagingService.activate();

          setIsSubscribed(true);
        }
      }
    };

    setupChat();

    return () => {
      if (isSubscribed) {
        ChatMessagingService.deactivate();
        setIsSubscribed(false);
      }
      setMessages([]);
      setNewMensaje("");
      setNewFile(null);
      setAttempMensajeEnviado(false);
    };
  }, [idConversacion]);

  const enviarMensaje = async (mensaje: string) => {
    if (isSubscribed && newMensaje) {
      let savedFileUrl: string | undefined = undefined;

      // Verificar si se enviará un archivo:
      if (newFile) {
        const formData = new FormData();
        formData.append("file", newFile);

        savedFileUrl = await saveChatFile(idConversacion, formData);
      }

      ChatMessagingService.sendMessage(idConversacion, {
        sentBy: idUsuarioLogged,
        mensaje,
        resourceUrl: savedFileUrl,
      });

      setNewMensaje("");
      setNewFile(null);
      setAttempMensajeEnviado(false);
    } else {
      setAttempMensajeEnviado(true);
    }
  };

  const handleLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setNewFile(file);
    }
  };

  return (
    <div className={`${chattingStyles.chattingModule} flex-grow-3`}>
      <div className={chattingStyles.contactName}>
        {receptor && <h3>{receptor?.fullName}</h3>}
      </div>
      <div className={chattingStyles.bubbleContent}>
        {messages.map((m, i) => (
          <BubbleMessage
            key={i}
            myself={m.sentBy === idUsuarioLogged}
            resourceUrl={m.resourceUrl}
            text={m.mensaje}
          />
        ))}
      </div>
      <div className={chattingStyles.sendOption}>
        <div className="form">
          <div className="form-control">
            <input
              type="text"
              value={newMensaje}
              onChange={(e) => setNewMensaje(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && enviarMensaje(e.currentTarget.value)
              }
            />
            {attempMensajeEnviado && !newMensaje && <p>Mensaje requerido</p>}
          </div>
          <div className="form-control">
            <input
              type="file"
              name=""
              id="file-message"
              onChange={handleLoadImage}
              accept=".jpg, .jpeg, .png"
            />
          </div>
        </div>
        {newFile && (
          <div className="form-control">
            <img
              className="form-img-previsualizer"
              src={URL.createObjectURL(newFile)}
              alt="Preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

ChatModule.displayName = "ChatModule";

export default ChatModule;
