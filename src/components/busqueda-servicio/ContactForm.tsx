"use client";

import { useEffect, useState } from "react";
import modalStyles from "@/styles/modal.module.scss";
import Close from "@/vectors/times-solid-svgrepo-com.svg";
import { sendContactMessage } from "@/actions/chatting.actions";
import { registrarMatch } from "@/actions/match.actions";
import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";

type Props = {
    children: React.ReactNode;
    cliente: UsuarioRegisteredResponse;
    servicio: ServicioDetailsResponse;
}

export default ({ children, servicio, cliente }: Props) => {
    const [newMessage, setNewMessage] = useState<string>("");
    const [openContactForm, setOpenContactForm] = useState(false);

    const enviarMensaje = async () => {
        const mensajeEnviado = await sendContactMessage({
            idReceptor: servicio.usuario.id,
            mensaje: newMessage,
            fecha: new Date()
        });

        if (mensajeEnviado) {
            // Registrar match con estado solicitado
            const matchRegistrado = await registrarMatch({
                costo: servicio.precio,
                idCliente: cliente.id,
                idServicio: servicio.id
            });

            if (matchRegistrado) {
                setNewMessage("");
                setOpenContactForm(false);
            }
        }
    }

    return (
        <>
            <button className="btn-primary" onClick={() => setOpenContactForm(true)}>{children}</button>
            {
                openContactForm &&
                <div className={modalStyles.modalContainer}>
                    <div className={modalStyles.modal}>
                        <header className={modalStyles.modalHeader}>
                            <h2>Contáctate</h2>
                            <button className={modalStyles.close} >
                                <img src={Close} alt="close" />
                            </button>
                        </header>

                        <main className={modalStyles.modalContent}>
                            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        </main>

                        <footer className={modalStyles.modalFooter}>
                            <button className="btn-primary" onClick={enviarMensaje}>Enviar</button>&nbsp;
                            <button className="btn-danger" onClick={() => setOpenContactForm(false)}>Cancelar</button>
                        </footer>
                    </div>
                </div>
            }
        </>

    )
}