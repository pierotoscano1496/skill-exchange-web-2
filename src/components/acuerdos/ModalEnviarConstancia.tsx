"use client";

import modalStyles from "@/app/styles/modal.module.scss";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { enviarMensajeByForm, getChatsNoMessages, saveChatFile } from "@/actions/chatting.actions";
import MensajeChat from "@/interfaces/models/chats/MensajeChat";
import ModalAlert from "../ModalAlert";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import MatchServicioProveedorDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioProveedorDetailsResponse";

type Props = {
    onClose: () => void;
    onMessageSent: (sentStatus: boolean) => void;
    cliente: UsuarioRegisteredResponse;
    proveedor: UsuarioResponse;
}

export default ({ onClose, onMessageSent, proveedor, cliente }: Props) => {
    const [newFile, setNewFile] = useState<File | null>(null);
    const [mensaje, setMensaje] = useState<string>("");
    const [attemptedSending, setAttemptedSending] = useState<boolean>(false);
    const [conversation, setConversation] = useState<MensajeChat>();
    const [mensajeEnviado, setMensajeEnviado] = useState<boolean>(false);

    useEffect(() => {
        // Buscar la conversación con el proveedor (sin mensajes)
        const getConversationWithProveedor = async () => {
            const chat = await getChatsNoMessages(proveedor.id);
            setConversation(chat);
        }

        getConversationWithProveedor();

        return (() => {
            setNewFile(null);
            setMensaje("");
            setAttemptedSending(false);
            setConversation(undefined);
            setMensajeEnviado(false);
        });
    }, [proveedor])

    const handleLoadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setNewFile(file);
        }
    }

    const enviarMensajeContancia = async () => {
        if (newFile && mensaje) {
            // Enviar archivo de solicitud
            let savedFileUrl: string | undefined = undefined;

            const formData = new FormData();
            formData.append("file", newFile);

            savedFileUrl = await saveChatFile(formData);
            if (savedFileUrl) {
                const messageSent = await enviarMensajeByForm(conversation!.id, {
                    sentBy: cliente.id,
                    mensaje,
                    resourceUrl: savedFileUrl
                });

                if (messageSent) {
                    onMessageSent(true);
                }
            }
        } else {
            setAttemptedSending(true);
        }
    }

    return (
        <div className={modalStyles.modalContainer}>
            <div className={modalStyles.modal}>
                <header className={modalStyles.modalHeader}>
                    <h2>Mensaje</h2>
                    <button className={modalStyles.close} onClick={onClose}>
                        <Image src={Close} alt="close" />
                    </button>
                </header>

                <main className={modalStyles.modalContent}>
                    <div className="container column">
                        <div className="form-control">
                            <input type="text" name="mensaje" id="mensaje"
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                            />
                            {(attemptedSending && !mensaje) && <p>Escriba un mensaje</p>}
                        </div>
                        <div className="form-control">
                            <input type="file" name="" id="file-message"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleLoadImage} />
                            {(attemptedSending && !newFile) && <p>Adjunte el archivo de la constancia</p>}
                        </div>
                    </div>
                    {newFile &&
                        <div className="form-control">
                            <img className="form-img-previsualizer" src={URL.createObjectURL(newFile)} alt="Preview"
                                style={{ maxHeight: "50%", maxWidth: "50%" }} />
                        </div>
                    }
                </main>

                <footer className={modalStyles.modalFooter}>
                    <button className="btn-primary" onClick={enviarMensajeContancia}>Enviar</button>
                    <button className="btn-secondary" onClick={onClose}>Cancelar</button>
                </footer>
            </div>
        </div>
    )
}