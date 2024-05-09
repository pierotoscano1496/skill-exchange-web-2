"use client";

import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import modalStyles from "@/app/styles/modal.module.scss";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import { useEffect, useState } from "react";
import Image from "next/image";

type Params = {
    children: React.ReactNode;
    onClose: () => void;
}

export default ({ children, onClose }: Params) => {
    return (
        <div className={`${modalStyles.modalContainer} ${modalStyles.super}`}>
            <div className={modalStyles.modal}>
                <header className={modalStyles.modalHeader}>
                    <h2>Mensaje</h2>
                    <button className={modalStyles.close} onClick={onClose} >
                        <Image src={Close} alt="close" />
                    </button>
                </header>

                <main className={modalStyles.modalContent}>
                    {children}
                </main>

                <footer className={modalStyles.modalFooter}>
                    <button className="btn-secondary" onClick={onClose}>Cerrar</button>
                </footer>
            </div>
        </div>
    )
}