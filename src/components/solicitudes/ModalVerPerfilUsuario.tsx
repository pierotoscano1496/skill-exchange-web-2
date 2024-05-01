"use client";

import modalStyles from "@/app/styles/modal.module.scss";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import Image from "next/image";
import { useState } from "react";

type Params = {
    isOpen: boolean;
    cliente: UsuarioResponse;
    onClose: () => void;
}

export default ({ isOpen, cliente, onClose }: Params) => {
    return (
        <>
            {(isOpen && !!cliente) &&
                <div className={modalStyles.modalContainer}>
                    <div className={modalStyles.modal}>
                        <header className={modalStyles.modalHeader}>
                            <h2>Datos del solicitante</h2>
                            <button className={modalStyles.close} onClick={onClose} >
                                <Image src={Close} alt="close" />
                            </button>
                        </header>

                        <main className={modalStyles.modalContent}>
                            <section>
                                <p><strong>Nombres:</strong> {cliente.nombres}</p>
                                <p><strong>Apellidos:</strong> {cliente.apellidos}</p>
                            </section>
                            <hr />
                            <section>
                                <h3>Redes:</h3>
                                {cliente.perfilFacebook &&
                                    <p><strong>Facebook:</strong> <a href={cliente.perfilFacebook}>{cliente.perfilFacebook}</a></p>}
                                {cliente.perfilInstagram &&
                                    <p><strong>Instagram:</strong> <a href={cliente.perfilInstagram}>{cliente.perfilInstagram}</a></p>}
                                {cliente.perfilLinkedin &&
                                    <p><strong>Linkedin:</strong> <a href={cliente.perfilLinkedin}>{cliente.perfilLinkedin}</a></p>}
                                {cliente.perfilTiktok &&
                                    <p><strong>Tik Tok:</strong> <a href={cliente.perfilTiktok}>{cliente.perfilTiktok}</a></p>}
                            </section>
                        </main>

                        <footer className={modalStyles.modalFooter}>
                            <button className="btn-secondary" onClick={onClose}>Cerrar</button>
                        </footer>
                    </div>
                </div>
            }
        </>
    )
}