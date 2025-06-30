import { v4 as uuidv4 } from "uuid";
import { STATIC_CHAT_CONVERSATIONS } from "../data/static-data";
import type {
  IChatMessagingService,
  Message,
  ChatListener,
} from "../types/chat-messaging-interface";

class ChatWebSocketServiceStatic implements IChatMessagingService {
  private listeners: { [conversationId: string]: ChatListener[] } = {};

  subscribe(conversationId: string, listener: ChatListener) {
    if (!this.listeners[conversationId]) {
      this.listeners[conversationId] = [];
    }
    this.listeners[conversationId].push(listener);

    // Envía los mensajes hardcodeados al suscribirse
    const conversation = STATIC_CHAT_CONVERSATIONS.find(
      (c) => c.id === conversationId
    );
    if (conversation) {
      conversation.messages.forEach((msg) => listener(msg));
    }

    // Retorna función para desuscribirse
    return () => {
      this.listeners[conversationId] = this.listeners[conversationId].filter(
        (l) => l !== listener
      );
    };
  }

  sendMessage(
    conversationId: string,
    messageBody: Omit<Message, "id" | "fecha">
  ) {
    const message: Message = {
      ...messageBody,
      id: uuidv4(),
      fecha: new Date().toISOString(),
    };
    if (this.listeners[conversationId]) {
      this.listeners[conversationId].forEach((listener) => listener(message));
    }
    const conversation = STATIC_CHAT_CONVERSATIONS.find(
      (c) => c.id === conversationId
    );
    if (conversation) {
      conversation.messages.push(message);
    }
  }
}

export const chatWebSocketServiceStatic = new ChatWebSocketServiceStatic();
