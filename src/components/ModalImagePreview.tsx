"use client";

import modalStyles from "@/app/styles/modal.module.scss";

type Props = {
    onClose: () => void;
    source: string;
    decripcion?: string;
}

export default ({ source, onClose, decripcion }: Props) => {
    return (
        <div className={`${modalStyles.modalContainer} ${modalStyles.super}`}>
            <div className={modalStyles.modal}>
                <main className={modalStyles.modalContent}>
                    <img src={source} alt="" className={modalStyles.imagePreview} />
                    {decripcion && <p>{decripcion}</p>}
                </main>

                <footer className={modalStyles.modalFooter}>
                    <button className="btn-secondary" onClick={onClose}>Cerrar</button>
                </footer>
            </div>
        </div>
    )
}