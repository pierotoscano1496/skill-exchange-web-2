import { Message } from "postcss";
import Contact from "./Contact";

export default interface MensajeChat {
    id: string;
    contacts: Contact[];
    messages: Message[];
}