"use client";

import modalStyles from "@/app/styles/modal.module.scss";
import profileStyles from "@/app/styles/profile.module.scss";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import Image from "next/image";
import { useState } from "react";
import SEModal from "../skill-exchange/messaging/SEModal";
import SEContainer from "../skill-exchange/containers/SEContainer";
import SEParragraph from "../skill-exchange/text/SEParragraph";
import SELabel from "../skill-exchange/text/SELabel";
import { SEFormControl } from "../skill-exchange/form/SEForm";
import SESpan from "../skill-exchange/text/SESpan";
import SESocialMedia from "../skill-exchange/custom/SESocialMedia";
import SEButton from "../skill-exchange/SEButton";

type Params = {
  cliente: UsuarioResponse;
  onClose: () => void;
};

const ModalVerPerfilUsuario = ({ cliente, onClose }: Params) => {
  return (
    <SEModal title="Datos del solicitante" onClose={onClose}>
      <SEFormControl>
        <SELabel text="Nombres:" />
        <SESpan>{cliente.nombres}</SESpan>
      </SEFormControl>
      <SEFormControl>
        <SELabel text="Apellidos:" />
        <SESpan>{cliente.apellidos}</SESpan>
      </SEFormControl>
      <SEFormControl>
        <SELabel text="Redes" />
      </SEFormControl>
      <SEContainer>
        <SEParragraph>
          <strong>Nombre: </strong>
          {cliente.nombres}
        </SEParragraph>
        <SEParragraph>
          <strong>Apellidos: </strong>
          {cliente.apellidos}
        </SEParragraph>
        <SEContainer>
          {cliente.perfilFacebook && (
            <SESocialMedia socialMedia="facebook" type="link" />
          )}
          {cliente.perfilInstagram && (
            <SESocialMedia socialMedia="instagram" type="link" />
          )}
          {cliente.perfilLinkedin && (
            <SESocialMedia socialMedia="linkedin" type="link" />
          )}
          {cliente.perfilTiktok && (
            <SESocialMedia socialMedia="tiktok" type="link" />
          )}
        </SEContainer>
      </SEContainer>
    </SEModal>
  );
};

ModalVerPerfilUsuario.displayName = "ModalVerPerfilUsuario";

export default ModalVerPerfilUsuario;
