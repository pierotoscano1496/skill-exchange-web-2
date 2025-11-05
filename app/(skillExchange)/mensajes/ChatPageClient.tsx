"use client";

import { useEffect, useState } from "react";
import ChatRoomClient from "./ChatRoomClient";
import { getChatConversation } from "@/lib/actions/data";
import { getToken } from "@/app/(auth)/actions";
import type { ChatConversation } from "@/lib/types/api-responses";

type Props = {
  conversationId: string;
};

export default function ChatPageClient({ conversationId }: Props) {
  const [token, setToken] = useState("");
  const [initialConversation, setInitialConversation] =
    useState<ChatConversation | null>(null);
  const [initialError, setInitialError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const t = await getToken();
      if (mounted) setToken(t || "");
      if (conversationId) {
        const resp = await getChatConversation(conversationId);
        if (mounted) {
          if (resp?.success) {
            setInitialConversation(resp.data);
            setInitialError(null);
          } else {
            setInitialConversation(null);
            setInitialError(
              resp?.message ?? "No se pudo cargar la conversación."
            );
          }
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [conversationId]);

  return (
    <ChatRoomClient
      conversationId={conversationId}
      token={token}
      initialConversation={initialConversation}
      initialError={initialError}
    />
  );
}