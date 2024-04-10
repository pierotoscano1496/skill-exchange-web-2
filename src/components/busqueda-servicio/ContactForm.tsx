"use client";

import { getServerInstanceAuthorized } from "@/utils/constants.server";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
    children: React.ReactNode
    idUsuario: string;
}

type ModalProps = {
    idDestinatario: string;
    open: boolean;
}

const ModalContact = ({ idDestinatario, open }: ModalProps) => {
    const [mensaje, setMensaje] = useState("");

    const sendMessage = async () => {
        /**
         * Remplazar con websockets
         */
        const response = await getServerInstanceAuthorized().post(`/message/send/${idDestinatario}`);
        if (response.data) {
            alert("Enviado");
        }
    }

    return (
        <div className="modal">
            <h3>Contáctate</h3>
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
            <button className="btn-primary" onClick={sendMessage}>Enviar</button>
        </div>
    )
}

export default ({ children, idUsuario }: Props) => {
    const router = useRouter();
    const [openContactForm, setOpenContactForm] = useState(false);

    const goToContactForm = () => {
        //router.push(`/contacto/enviar-mensaje/${idUsuario}`);
        setOpenContactForm(true);
    }

    return (
        <>
            <button className="btn-primary" onClick={goToContactForm}>{children}</button>
            <ModalContact idDestinatario={idUsuario} open={openContactForm} />
        </>

    )
}