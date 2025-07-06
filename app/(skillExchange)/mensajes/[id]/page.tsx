"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Loader2, Send, ChevronLeft } from "lucide-react";
import { dataService } from "@/lib/services/data-service";
import { getCurrentUserId } from "@/lib/config/environment";
import type {
  ChatConversation,
  ChatMessage,
  ChatContact,
} from "@/lib/types/api-responses";

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id: conversationId } = params;
  const [conversation, setConversation] = useState<ChatConversation | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        const response = await dataService.getChatConversation(conversationId);
        if (response.success) {
          setConversation(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar la conversación."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !conversation) return;

    const recipientId = conversation.otherContact.idContact;

    if (!recipientId) {
      setError("No se encontró el destinatario del chat.");
      return;
    }

    try {
      // Optimistic update
      const tempMessage: ChatMessage = {
        sentBy: currentUserId,
        fecha: new Date().toISOString(),
        mensaje: newMessage.trim(),
      };

      setConversation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, tempMessage],
        };
      });
      setNewMessage("");

      const response = await dataService.sendChatMessage({
        idReceptor: recipientId,
        mensaje: newMessage.trim(),
      });

      if (!response.success) {
        setError(response.message || "Error al enviar el mensaje.");
        // Revert optimistic update if send fails (optional, for simplicity not implemented here)
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar el mensaje."
      );
    }
  };

  const getOtherParticipant = (): ChatContact | undefined => {
    return conversation?.otherContact;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-2 text-lg">Cargando conversación...</p>
      </div>
    );
  }

  if (error) {
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
          const isSentByCurrentUser = message.sentBy === currentUserId;
          // Determine sender for avatar and fallback. If sent by current user, use a generic representation or a placeholder for self.
          // Otherwise, use the other participant's info.
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Enviar</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
