import { Client, IMessage, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {
  IChatMessagingService,
  Message,
  ChatListener,
} from "../types/chat-messaging-interface";
import { ENV_CONFIG } from "../config/environment";

class ChatWebSocketServiceApi implements IChatMessagingService {
  private client: Client;
  private subscriptions: { [conversationId: string]: () => void } = {};

  constructor() {
    this.client = new Client({
      webSocketFactory: () =>
        new SockJS(
          `${ENV_CONFIG.API.BASE_URL.replace("/api", "")}messaging-socket`
        ),
      debug: (str) => console.log(str),
      onWebSocketError: (error) => {
        console.error("Error con websocket", error);
      },
      onStompError(frame) {
        console.error("Error de broker: " + frame.headers.message);
        console.error("Detalles adicionales: " + frame.body);
      },
    });
  }

  activate() {
    this.client.activate();
  }

  deactivate() {
    this.client.deactivate();
  }

  subscribe(conversationId: string, listener: ChatListener) {
    let subscription: any;
    this.client.onConnect = () => {
      subscription = this.client.subscribe(
        `/chatting/${conversationId}`,
        (msg: IMessage) => {
          const body = JSON.parse(msg.body);
          listener({
            id: body.id,
            sentBy: body.sentBy,
            fecha: body.fecha,
            mensaje: body.mensaje,
            resourceUrl: body.resourceUrl,
          });
        }
      );
    };
    this.activate();

    // Retorna función para desuscribirse
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }

  sendMessage(
    conversationId: string,
    messageBody: Omit<Message, "id" | "fecha">
  ) {
    this.client.publish({
      destination: `/app/chat/${conversationId}/send`,
      body: JSON.stringify(messageBody),
    });
  }
}

export const chatWebSocketServiceApi = new ChatWebSocketServiceApi();
