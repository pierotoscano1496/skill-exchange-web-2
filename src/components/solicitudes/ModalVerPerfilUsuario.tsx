"use client";

import modalStyles from "@/app/styles/modal.module.scss";
import profileStyles from "@/app/styles/profile.module.scss";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import Image from "next/image";
import { useState } from "react";

type Params = {
    cliente: UsuarioResponse;
    onClose: () => void;
}

export default ({ cliente, onClose }: Params) => {
    return (
        <div className={modalStyles.modalContainer}>
            <div className={modalStyles.modal}>
                <header className={modalStyles.modalHeader}>
                    <h2>Datos del solicitante</h2>
                    <button className={modalStyles.close} onClick={onClose} >
                        <Image src={Close} alt="close" />
                    </button>
                </header>

                <main className={modalStyles.modalContent}>
                    <p><strong>Nombres:</strong> {cliente.nombres}</p>
                    <p><strong>Apellidos:</strong> {cliente.apellidos}</p>
                    <p><strong>Redes:</strong></p>
                    <div className={`container ${profileStyles.socialMedia}`}>
                        {cliente.perfilFacebook &&
                            <a href={cliente.perfilFacebook} target="_blank"><i className={`fa-brands fa-facebook ${profileStyles["icon-fa-color-primary"]}`}></i></a>}
                        {cliente.perfilInstagram &&
                            <a href={cliente.perfilInstagram} target="_blank"><i className={`fa-brands fa-instagram ${profileStyles["icon-fa-color-info"]}`}></i></a>}
                        {cliente.perfilLinkedin &&
                            <a href={cliente.perfilLinkedin} target="_blank"><i className={`fa-brands fa-linkedin ${profileStyles["icon-fa-color-primary"]}`}></i></a>}
                        {cliente.perfilTiktok &&
                            <a href={cliente.perfilTiktok} target="_blank"><i className={`fa-brands fa-tiktok ${profileStyles["icon-fa-color-black"]}`}></i></a>}
                    </div>
                </main>

                <footer className={modalStyles.modalFooter}>
                    <button className="btn-secondary" onClick={onClose}>Cerrar</button>
                </footer>
            </div>
        </div>
    )
}