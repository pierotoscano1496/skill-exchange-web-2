import MensajeChat from "@/interfaces/models/MensajeChat";
import { Client, IMessage, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class ChatWsService {
    private client: Client;

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_MAIN_URL_BACKEND}message-broker`),
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

    public connectAndSubscribe(callback: (message: IMessage) => void) {
        this.client.onConnect = (frame) => {
            this.client.subscribe(`/chatting/save`, callback);
            console.log('Connected to WebSocket, frame ' + frame);
        }
    }

    public activate() {
        this.client.activate();
    }

    public sendMessage(mensaje: MensajeChat) {
        this.client.publish({
            destination: `/app-broker/chat/enviar`,
            body: JSON.stringify(mensaje)
        });
    }
};

export default new ChatWsService();