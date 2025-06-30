import { isStaticMode } from "../config/environment";
import { chatWebSocketServiceStatic } from "./chat-websocket-service-static";
import { chatWebSocketServiceApi } from "./chat-websocket-service-api";

export const chatMessagingService = isStaticMode()
  ? chatWebSocketServiceStatic
  : chatWebSocketServiceApi;
