export type Message = {
  id: string;
  sentBy: string;
  fecha: string;
  mensaje: string;
  resourceUrl?: string;
};

export type ChatListener = (message: Message) => void;

export interface IChatMessagingService {
  subscribe(conversationId: string, listener: ChatListener): () => void;
  sendMessage(
    conversationId: string,
    messageBody: Omit<Message, "id" | "fecha">
  ): void;
  activate?(): void;
  deactivate?(): void;
}
