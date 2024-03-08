"use client";

import React, { useEffect, useState } from "react";
import { Client, Message } from "@stomp/stompjs";
import { getCookieParam, removeCookieParam } from "@/utils/cookieManager";
//import { cookies } from "next/headers";

interface ChatProps {
    roomId: string
};

interface Mensaje {
    nombre: string;
    contenido: string;
}

const ChatApplication: React.FC<ChatProps> = ({ roomId }) => {
    const [mensaje, setMensaje] = useState("");
    const [messageHistory, setMessageHistory] = useState<Mensaje[]>([]);
    const [connected, setConnected] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Client | null>(null);
    //let stompClient: Client;

    useEffect(() => {
        const token = getCookieParam("token");
        const socket = new WebSocket(`ws://localhost:9081/api/websockets?token=${token}`);

        /*
        stompClient = new Client({
            brokerURL: `ws://localhost:9081/api/websockets?token=${token}`
        });

        stompClient.onConnect = (frame) => {
            setConnected(true);
            console.log("Conectado, frame: " + frame);

            stompClient.subscribe(`/topic/mensajes/${roomId}`, (message) => {
                console.log(mensaje)
            });
        };

        stompClient.onWebSocketError = (error) => {
            console.error("Error con websocket", error);
        };

        stompClient.onStompError = (frame) => {
            console.error('Error de broker: ' + frame.headers['message']);
            console.error('Detalles adicionales: ' + frame.body);
        }; */

        const stomp = new Client({
            webSocketFactory: () => socket,
            debug: (str: string) => console.log(str),
            reconnectDelay: 5000
        });

        stomp.onConnect = () => {
            stomp.subscribe(`/topic/mensajes/${roomId}`, (message: Message) => {
                const newMessage: Mensaje = JSON.parse(message.body as string);
                setMessageHistory((prevMessages) => [...prevMessages, newMessage]);
            });
        };

        stomp.activate();

        setStompClient(stomp);

        return () => {
            if (stomp.active) {
                stomp.deactivate();
            }
        };
    }, [roomId]);



    const enviarMensaje = () => {
        /* if (stompClient) {
            stompClient.publish({
                destination: `/chat/${roomId}`,
                body: JSON.stringify({ nombre: 'Usuario', contenido: mensaje })
            });
            setMensaje("");
        } */
        stompClient!.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify({ user: 'Usuario', message: mensaje })
        });
    };

    return (
        <div>
            <div>
                {messageHistory.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.nombre}:</strong> {msg.contenido}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje..."
            />
            <button onClick={enviarMensaje}>Enviar</button>

            <button onClick={() => removeCookieParam("valor")}>Quitar cookie</button>
        </div>
    );
};

export default ChatApplication;