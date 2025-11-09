"use client";

import React, { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import { ENV_CONFIG } from "@/lib/config/environment";
import { AUTH_COOKIE } from "@/lib/constants/auth";

interface ChatProps {
  roomId: string;
}

interface Mensaje {
  nombre: string;
  contenido: string;
}

// Lee una cookie desde el navegador (compatible con exportación estática)
function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
  return raw ? decodeURIComponent(raw) : undefined;
}

// Construye la URL WS a partir de NEXT_PUBLIC_API_BASE_URL
// http://localhost:9081/api  -> ws://localhost:9081/api/websockets
function buildWebSocketUrl(): string {
  const base = (ENV_CONFIG.API.BASE_URL || "").replace(/\/$/, "");
  const wsBase = base.replace(/^http/i, "ws");
  return `${wsBase}/websockets`;
}

const ChatApplication: React.FC<ChatProps> = ({ roomId }) => {
  const [mensaje, setMensaje] = useState("");
  const [messageHistory, setMessageHistory] = useState<Mensaje[]>([]);
  const [connected, setConnected] = useState<boolean>(false);

  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const wsUrl = buildWebSocketUrl();
    const token = readCookie(AUTH_COOKIE);

    // Incluye el token como query param si existe
    const brokerURL = token
      ? `${wsUrl}?token=${encodeURIComponent(token)}`
      : wsUrl;

    const client = new Client({
      brokerURL,
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: () => {
        // silenciar en producción si quieres
        // console.log(msg)
      },
    });

    client.onConnect = () => {
      setConnected(true);

      // Suscribirse al tópico de la sala
      client.subscribe(`/topic/mensajes/${roomId}`, (frame: IMessage) => {
        try {
          const data = JSON.parse(frame.body) as Mensaje;
          setMessageHistory((prev) => [...prev, data]);
        } catch {
          // si no es JSON válido, ignorar
        }
      });
    };

    client.onWebSocketError = (error) => {
      console.error("Error con websocket", error);
    };

    client.onStompError = (frame) => {
      console.error("Error de broker:", frame.headers["message"]);
      console.error("Detalles adicionales:", frame.body);
    };

    clientRef.current = client;
    client.activate();

    return () => {
      try {
        client.deactivate();
      } catch {
        // noop
      }
      clientRef.current = null;
      setConnected(false);
    };
  }, [roomId]);

  const enviarMensaje = () => {
    const c = clientRef.current;
    if (!c || !connected || !mensaje.trim()) return;

    const body: Mensaje = {
      nombre: "Usuario",
      contenido: mensaje.trim(),
    };

    // Enviar al endpoint de la app
    c.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(body),
    });

    // Pintar optimista
    setMessageHistory((prev) => [...prev, body]);
    setMensaje("");
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <strong>Estado:</strong> {connected ? "Conectado" : "Desconectado"}
      </div>

      <div style={{ marginBottom: 12 }}>
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
        style={{ marginRight: 8 }}
      />
      <button onClick={enviarMensaje} disabled={!connected || !mensaje.trim()}>
        Enviar
      </button>
    </div>
  );
};

export default ChatApplication;