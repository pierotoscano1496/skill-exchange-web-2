import UsuarioBasicInfo from "./UsuarioBasicInfo";

export default interface ContactModule {
    lastMessageSent: boolean;
    active: boolean;
    contactInfo: UsuarioBasicInfo;
}