import MensajeChat from "@/interfaces/models/chats/MensajeChat";
import MessageBody from "@/interfaces/requestbody/messaging/MessageBody";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class ChatMessagingService {
    private client: Client;

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS("https://skill-exchange-backend-b36ba056d3f1.herokuapp.com/api/messaging-socket"),
            debug: (str) => console.log(str),
            onWebSocketError: (error) => {
                console.error("Error con websocket", error);
            },
            onStompError(frame) {
                console.error("Error de broker: " + frame.headers.message);
                console.error("Detalles adicionales: " + frame.body);
            }
        });
    }

    public deactivate() {
        this.client.deactivate();
    }

    public connectAndSubscribe(idConversation: string, callback: (message: IMessage) => void) {
        this.client.onConnect = (frame) => {
            this.client.subscribe(`/chatting/${idConversation}`, callback);
            console.log('Connected to WebSocket, frame ' + frame);
        }
    }

    public activate() {
        this.client.activate();
    }

    public sendMessage(idConversation: string, message: MessageBody) {
        this.client.publish({
            destination: `/app/chat/${idConversation}/send`,
            body: JSON.stringify(message)
        });
    }
};

export default new ChatMessagingService();