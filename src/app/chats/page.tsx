"use client";

import { useRouter } from "next/navigation"
import React from "react";
import ChatApplication from "../../components/ChatApplication";

const Chats = () => {
    return (
        <div>
            <h1>Mis mensajes</h1>
            <ChatApplication roomId="123" />
        </div >
    )

};

export default Chats;