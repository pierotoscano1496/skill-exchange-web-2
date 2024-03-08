"use client";

import { useRouter } from "next/navigation"
import React from "react";
import ChatApplication from "../components/ChatApplication";
import PanelNavigation from "@/app/components/PanelNavigation";

const Chats = () => {
    return (
        <div>
            <PanelNavigation>
                <h1>Mis mensajes</h1>
                <ChatApplication roomId="123" />
            </PanelNavigation>
        </div>
    )

};

export default Chats;