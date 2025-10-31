export type Message = {
  id: string;
  clientId?: string;
  sentBy: string;
  fecha: string;
  mensaje: string;
  resourceUrl?: string;
};

export type ChatListener = (
  message: Message,
  meta?: { replaceClientId?: string }
) => void;

export interface IChatMessagingService {
  setToken(token?: string): void;
  subscribe(conversationId: string, listener: ChatListener): () => void;
  sendMessage(
    conversationId: string,
    messageBody: Omit<Message, "id" | "fecha">
  ): void;
  activate?(): void;
  deactivate?(): void;
}
