"use client";

import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import modalStyles from "@/app/styles/modal.module.scss";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import Image from "next/image";

type FlexProps = {
  flexAlignItems?:
    | "stretch"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "first baseline"
    | "last baseline"
    | "start"
    | "end"
    | "self-start"
    | "self-end";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "start"
    | "end"
    | "left"
    | "right";
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  flexWrap?: "wrap";
};

type Params = {
  title: string;
  flexProps?: FlexProps;
  children: React.ReactNode;
  onClose: () => void;
};

const ModalInfo = ({ title, flexProps, children, onClose }: Params) => {
  return (
    <div className={`${modalStyles.modalContainer} ${modalStyles.super}`}>
      <div className={modalStyles.modal}>
        <header className={modalStyles.modalHeader}>
          <h2>{title}</h2>
          <button className={modalStyles.close} onClick={onClose}>
            <Image src={Close} alt="close" />
          </button>
        </header>

        <main
          className={`${modalStyles.modalContent} container ${flexProps?.flexAlignItems} ${flexProps?.flexDirection} ${flexProps?.justifyContent && `content-${flexProps.justifyContent}`} ${flexProps?.flexWrap}`}
        >
          {children}
        </main>

        <footer className={modalStyles.modalFooter}>
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  );
};

ModalInfo.displayName = "ModalInfo";

export default ModalInfo;
