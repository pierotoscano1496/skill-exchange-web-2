import modalStyles from "@/app/styles/modal.module.scss";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import Image from "next/image";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    proveedor: UsuarioResponse;
}

export default ({ onClose }: Props) => {
    

    return (
        <div className={modalStyles.modalContainer}>
            <div className={modalStyles.modal}>
                <header className={modalStyles.modalHeader}>
                    <h2>Mensaje</h2>
                    <button className={modalStyles.close} onClick={closeModal}>
                        <Image src={Close} alt="close" />
                    </button>
                </header>

                <main className={modalStyles.modalContent}>
                    <div className="form">
                        <div className="form-control">
                            <input type="text" name="mensaje" id="mensaje"
                                value={mensaje}
                                onChange={(e) => setMensaje(e.target.value)}
                            />
                            {(attemptedSending && !mensaje) && <p>Escriba un mensaje</p>}
                        </div>
                        <div className="form-control">
                            <input type="file" name="" id="file-message"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleLoadImage} />
                            {(attemptedSending && !newFile) && <p>Adjunte el archivo de la constancia</p>}
                        </div>
                    </div>
                    {newFile &&
                        <div className="form-control">
                            <img className="form-img-previsualizer" src={URL.createObjectURL(newFile)} alt="Preview" />
                        </div>
                    }
                </main>

                <footer className={modalStyles.modalFooter}>
                    <button className="btn-primary" onClick={enviarMensajeContancia}>Enviar</button>
                    <button className="btn-secondary" onClick={closeModal}>Cancelar</button>
                </footer>
            </div>
        </div>
    )
}