"use client";

import modalStyles from "@/app/styles/modal.module.scss";
import Image from "next/image";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";

type Props = {
  children: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  onCancel: () => void;
};

const ModalConfirm = ({ children, onConfirm, onClose, onCancel }: Props) => {
  return (
    <div className={modalStyles.modalContainer}>
      <div className={modalStyles.modal}>
        <header className={modalStyles.modalHeader}>
          <h2>Confirmación</h2>
          <button className={modalStyles.close} onClick={onClose}>
            <Image src={Close} alt="close" />
          </button>
        </header>

        <main className={modalStyles.modalContent}>{children}</main>

        <footer className={modalStyles.modalFooter}>
          <button className="btn-primary" onClick={onConfirm}>
            Aceptar
          </button>
          <button className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

ModalConfirm.displayName = "ModalConfirm";

export default ModalConfirm;
