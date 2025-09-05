// src/services/chat-websocket-service-api.ts
"use client";

import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type {
  IChatMessagingService,
  Message,
  ChatListener,
} from "../types/chat-messaging-interface";
import { ENV_CONFIG } from "../config/environment";

function buildSockUrl(): string {
  const base = (ENV_CONFIG.API.BASE_URL || "").replace(/\/$/, "");
  return `${base}/messaging-socket`;
}

type SubRecord = {
  subscription: StompSubscription | null;
  listeners: Set<ChatListener>;
};

export class ChatWebSocketServiceApi implements IChatMessagingService {
  private client: Client;
  private token: string | undefined;
  private active = false;
  private connected = false;
  private subs: Map<string, SubRecord> = new Map();
  private pendingClientIds: Map<string, Set<string>> = new Map();

  constructor() {
    const sockUrl = buildSockUrl();
    this.client = new Client({
      webSocketFactory: () => new SockJS(sockUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: () => {}, // silenciar logs en prod
      onConnect: () => this.handleConnect(),
      onDisconnect: () => this.handleDisconnect(),
      onWebSocketError: (error) => console.error("[WS] Error", error),
      onStompError: (frame) => {
        console.error(
          "[STOMP] Broker error:",
          frame.headers.message,
          frame.body
        );
      },
    });
  }

  setToken(token?: string) {
    const changed = this.token !== token;
    this.token = token;
    if (changed && this.active) {
      this.deactivate();
      this.activate();
    }
  }

  activate() {
    if (this.active) return;
    this.client.connectHeaders = this.token
      ? { Authorization: `Bearer ${this.token}` }
      : {};
    this.active = true;
    this.client.activate();
  }

  deactivate() {
    if (!this.active) return;
    for (const rec of this.subs.values()) {
      try {
        rec.subscription?.unsubscribe();
      } catch {}
      rec.subscription = null;
    }
    this.client.deactivate();
    this.connected = false;
    this.active = false;
  }

  subscribe(conversationId: string, listener: ChatListener) {
    if (!this.subs.has(conversationId)) {
      this.subs.set(conversationId, {
        subscription: null,
        listeners: new Set(),
      });
    }
    this.subs.get(conversationId)!.listeners.add(listener);

    if (this.connected) {
      this.ensureSubscription(conversationId);
    } else {
      this.activate();
    }

    return () => {
      const rec = this.subs.get(conversationId);
      if (!rec) return;
      rec.listeners.delete(listener);
      if (rec.listeners.size === 0) {
        try {
          rec.subscription?.unsubscribe();
        } catch {}
        this.subs.delete(conversationId);
        this.pendingClientIds.delete(conversationId);
      }
    };
  }

  sendMessage(
    conversationId: string,
    messageBody: Omit<Message, "id" | "fecha">
  ) {
    if (messageBody.clientId) {
      if (!this.pendingClientIds.has(conversationId)) {
        this.pendingClientIds.set(conversationId, new Set());
      }
      this.pendingClientIds.get(conversationId)!.add(messageBody.clientId);
    }

    if (!this.connected) this.activate();

    this.client.publish({
      destination: `/app/chat/${conversationId}/send`,
      body: JSON.stringify(messageBody),
    });
  }

  // ================== Internos ==================

  private handleConnect() {
    this.connected = true;
    for (const convId of this.subs.keys()) {
      this.ensureSubscription(convId);
    }
  }

  private handleDisconnect() {
    this.connected = false;
    for (const rec of this.subs.values()) {
      rec.subscription = null;
    }
  }

  private ensureSubscription(conversationId: string) {
    const rec = this.subs.get(conversationId);
    if (!rec) return;
    if (rec.subscription) return;

    rec.subscription = this.client.subscribe(
      `/chatting/${conversationId}`,
      (msg: IMessage) => {
        try {
          const body = JSON.parse(msg.body);

          const mapped: Message = {
            id: body.id,
            clientId: body.clientId,
            sentBy: body.sentBy,
            fecha: body.fecha,
            mensaje: body.mensaje,
            resourceUrl: body.resourceUrl,
          };

          const pend = this.pendingClientIds.get(conversationId);
          const isAck = !!(mapped.clientId && pend?.has(mapped.clientId));

          if (isAck) {
            pend!.delete(mapped.clientId!);
            rec.listeners.forEach((l) =>
              l(mapped, { replaceClientId: mapped.clientId })
            );
          } else {
            rec.listeners.forEach((l) => l(mapped));
          }
        } catch (e) {
          console.error("No se pudo parsear el mensaje entrante:", e);
        }
      }
    );
  }
}

export const chatWebSocketServiceApi = new ChatWebSocketServiceApi();
