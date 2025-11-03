import ChatRoomClient from "./ChatRoomClient";
import { getChatConversation } from "@/lib/actions/data";
import { getToken } from "@/app/(auth)/actions";
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
