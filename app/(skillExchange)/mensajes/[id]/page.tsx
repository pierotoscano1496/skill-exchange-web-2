import ChatRoomClient from "./ChatRoomClient";
import {
  getChatConversation,
  getOwnChatConversations,
} from "@/lib/actions/data";
import { getToken } from "@/app/(auth)/actions";

export async function generateStaticParams() {
  try {
    const resp = await getOwnChatConversations();
    return resp.data.map((conv) => ({ id: conv.conversationId }));
  } catch (e) {
    console.error("Error al buscar obtener datos de conversación:", e);
    return [] as { id: string }[];
  }
}

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id: conversationId } = params;
  const token = await getToken();

  const response = await getChatConversation(conversationId);
  const initialConversation = response?.success ? response.data : null;
  const initialError = response?.success
    ? null
    : response?.message ?? "No se pudo cargar la conversación.";

  return (
    <ChatRoomClient
      conversationId={conversationId}
      token={token}
      initialConversation={initialConversation}
      initialError={initialError}
    />
  );
}
