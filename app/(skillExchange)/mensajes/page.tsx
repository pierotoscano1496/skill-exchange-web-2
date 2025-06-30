"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Search, Send } from "lucide-react";

import { STATIC_CHAT_CONVERSATIONS } from "@/lib/data/static-data";
import { getCurrentUserId } from "@/lib/config/environment";
import { chatMessagingService } from "@/lib/services/chat-messaging-service";
import { Message } from "@/lib/types/chat-messaging-interface";

const currentUserId = getCurrentUserId(); // Usa el usuario actual desde config

function getOtherContact(contacts: any[]) {
  return contacts.find((c) => c.idContact !== currentUserId);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function MensajesBandejaPage() {
  const conversaciones = useMemo(() => STATIC_CHAT_CONVERSATIONS, []);
  const [chatActivo, setChatActivo] = useState(conversaciones[0]);
  const [mensajes, setMensajes] = useState<Message[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // Suscribirse a los mensajes del chat activo usando el servicio
  useEffect(() => {
    if (!chatActivo) return;
    setMensajes([]); // Limpia mensajes al cambiar de chat
    const unsubscribe = chatMessagingService.subscribe(chatActivo.id, (msg) => {
      setMensajes((prev) => [...prev, msg]);
    });
    return unsubscribe;
  }, [chatActivo]);

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !chatActivo) return;
    chatMessagingService.sendMessage(chatActivo.id, {
      sentBy: currentUserId,
      mensaje: nuevoMensaje,
    });
    setNuevoMensaje("");
  };

  return (
    <div className="flex flex-1 gap-4 p-4 h-[80vh]">
      {/* Lista de conversaciones */}
      <div className="w-80 flex-shrink-0 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar conversaciones..." className="pl-8" />
          </div>
          <Button variant="outline">Filtrar</Button>
        </div>
        <div className="space-y-2">
          {conversaciones.map((chat) => {
            const other = getOtherContact(chat.contacts);
            const lastMsg = chat.messages[chat.messages.length - 1];
            return (
              <Card
                key={chat.id}
                className={`cursor-pointer ${
                  chatActivo?.id === chat.id ? "bg-muted" : ""
                }`}
                onClick={() => setChatActivo(chat)}
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(other?.fullName || "U")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{other?.fullName}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {lastMsg?.mensaje}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Ventana de chat */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {chatActivo ? (
            <>
              <div className="border-b px-4 py-3 flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(
                      getOtherContact(chatActivo.contacts)?.fullName || "U"
                    )}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  {getOtherContact(chatActivo.contacts)?.fullName}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-muted/30">
                {mensajes.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sentBy === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-3 py-2 max-w-xs text-sm ${
                        msg.sentBy === currentUserId
                          ? "bg-primary text-primary-foreground"
                          : "bg-white border"
                      }`}
                    >
                      {msg.mensaje}
                      <span className="block text-xs text-muted-foreground mt-1 text-right">
                        {new Date(msg.fecha).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <form
                className="flex gap-2 border-t p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  enviarMensaje();
                }}
              >
                <Input
                  placeholder="Escribe un mensaje..."
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  autoComplete="off"
                />
                <Button type="submit" disabled={!nuevoMensaje.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Selecciona un chat para comenzar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
