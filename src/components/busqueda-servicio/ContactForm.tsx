"use client";

import { useEffect, useState } from "react";
import modalStyles from "@/app/styles/modal.module.scss";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import { sendContactMessage } from "@/actions/chatting.actions";
import { registrarMatch } from "@/actions/match.actions";
import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SEContainer from "../skill-exchange/containers/SEContainer";
import SEButton from "../skill-exchange/SEButton";
import SEModal from "../skill-exchange/messaging/SEModal";
import SETextarea from "../skill-exchange/form/SETextarea";

type Props = {
  children: React.ReactNode;
  cliente: UsuarioRegisteredResponse;
  servicio: ServicioDetailsResponse;
};

const ContactForm = ({ children, servicio, cliente }: Props) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [openContactForm, setOpenContactForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setNewMessage("");
      setOpenContactForm(false);
    };
  }, []);

  const enviarMensaje = async () => {
    const mensajeEnviado = await sendContactMessage({
      idReceptor: servicio.prestamista.id,
      mensaje: newMessage,
      fecha: new Date(),
    });

    if (mensajeEnviado) {
      // Registrar match con estado solicitado
      const matchRegistrado = await registrarMatch({
        costo: servicio.precio,
        idCliente: cliente.id,
        idServicio: servicio.id,
      });

      if (matchRegistrado) {
        router.push("/servicio");
      }
    }
  };

  return (
    <>
      <SEButton
        className="btn-primary"
        onClick={() => setOpenContactForm(true)}
        label="Enviar mensaje"
      />
      {openContactForm && (
        <SEModal
          title="Contáctate"
          onClose={() => setOpenContactForm(false)}
          onAccept={enviarMensaje}
        >
          <SETextarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe aquí"
          />
        </SEModal>
      )}
    </>
  );
};

ContactForm.displayName = "ContactForm";

export default ContactForm;
