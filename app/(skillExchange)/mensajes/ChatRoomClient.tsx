// app/chat/[id]/ChatRoomClient.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Loader2, Send, ChevronLeft } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { chatMessagingService } from "@/lib/services/chat-messaging-service"; // <- tu wrapper
import type {
  ChatConversation,
  ChatMessage,
  ChatContact,
} from "@/lib/types/api-responses";

type Props = {
  conversationId: string;
  token: string;
  initialConversation: ChatConversation | null;
  initialError: string | null;
};

export default function ChatRoomClient({
  conversationId,
  token,
  initialConversation,
  initialError,
}: Props) {
  const router = useRouter();
  const { user } = useUser();

  const [conversation, setConversation] = useState<ChatConversation | null>(
    initialConversation
  );
  const [loading, setLoading] = useState<boolean>(
    !initialConversation && !initialError
  );
  const [error, setError] = useState<string | null>(initialError);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ID del usuario actual (ajusta si tu hook lo expone distinto)
  const myId = useMemo(() => user?.id ?? "", [user?.id]);

  // Scroll al final cuando cambian los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages?.length]);

  useEffect(() => {
    const unsubscribe = chatMessagingService.subscribe(
      conversationId,
      (msg, meta) => {
        setConversation((prev) => {
          if (!prev) return prev;

          if (meta?.replaceClientId) {
            const idx = prev.messages.findIndex(
              (m) => m.clientId === meta.replaceClientId
            );
            if (idx !== -1) {
              const updated = [...prev.messages];
              updated[idx] = { ...msg };
              return { ...prev, messages: updated };
            }
          }

          if (msg.sentBy === myId) {
            return prev;
          }

          return { ...prev, messages: [...prev.messages, msg] };
        });
      }
    );

    return () => unsubscribe();
  }, [conversationId, myId]);

  const getOtherParticipant = (): ChatContact | undefined =>
    conversation?.otherContact;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !conversation || !myId) return;

    const clientId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

    const optimist: ChatMessage = {
      clientId, // <- clave
      sentBy: myId,
      fecha: new Date().toISOString(),
      mensaje: newMessage.trim(),
      resourceUrl: null,
    };

    // pinta optimista
    setConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, optimist] } : prev
    );
    setNewMessage("");

    // envía con clientId (el servicio lo registra como pendiente)
    chatMessagingService.sendMessage(conversationId, {
      clientId,
      sentBy: myId,
      mensaje: optimist.mensaje,
      resourceUrl: null,
    } as any);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-2 text-lg">Cargando conversación...</p>
      </div>
    );
  }

  if (error && !conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500">
        <p className="text-lg">Error: {error}</p>
        <Button onClick={() => router.back()} className="mt-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p className="text-lg">No se encontró la conversación.</p>
        <Button onClick={() => router.back()} className="mt-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
      </div>
    );
  }

  const otherParticipant = getOtherParticipant();

  return (
    <div className="flex flex-col h-full max-h-screen">
      <Card className="flex-shrink-0 rounded-none border-b">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={otherParticipant?.avatarUrl || "/placeholder-user.jpg"}
              />
              <AvatarFallback>
                {otherParticipant?.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {otherParticipant?.fullName || "Usuario Desconocido"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {otherParticipant?.email}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {conversation.messages.map((message, index) => {
          const isSentByCurrentUser = message.sentBy === myId;
          const sender = isSentByCurrentUser
            ? { fullName: "Tú", avatarUrl: "/placeholder-user.jpg" }
            : otherParticipant;

          return (
            <div
              key={index}
              className={`flex ${
                isSentByCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-end gap-2 ${
                  isSentByCurrentUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={sender?.avatarUrl || "/placeholder-user.jpg"}
                  />
                  <AvatarFallback>{sender?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 max-w-[70%] ${
                    isSentByCurrentUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border"
                  }`}
                >
                  <p className="text-sm">{message.mensaje}</p>
                  {message.resourceUrl && (
                    <a
                      href={message.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline mt-1 block"
                    >
                      Ver archivo
                    </a>
                  )}
                  <span
                    className={`block text-xs mt-1 ${
                      isSentByCurrentUser
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {new Date(message.fecha).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex-shrink-0 p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
