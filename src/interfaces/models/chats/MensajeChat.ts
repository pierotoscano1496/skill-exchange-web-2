import Contact from "./Contact";
import Message from "./Message";

export default interface MensajeChat {
    id: string;
    contacts: Contact[];
    messages: Message[];
}