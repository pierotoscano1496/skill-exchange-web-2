import ContactForm from "@/components/busqueda-servicio/ContactForm";
import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import { TipoModalidadPagoOption } from "@/utils/types";
import commentStyles from "./comment.module.scss";
import reviewStyles from "@/app/styles/review/review-servicio.module.scss";
import ServicioReviewResponse from "@/interfaces/responsebody/review/ServicioReviewResponse";
import FormReviewServicio from "@/components/review-servicio/FormReviewServicio";
import { getServicioDetails, getServicioReview } from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import YapeModule from "@/components/busqueda-servicio/YapeModule";

type ModalidadOption = TipoModalidadPagoOption & {
    brandClassName: string
}

export default async ({ params }: {
    params: {
        [key: string]: string
    }
}) => {
    const servicioDetails: ServicioDetailsResponse = await getServicioDetails(params.id);

    const servicioReview: ServicioReviewResponse = await getServicioReview(params.id);

    let usuarioLogged: UsuarioRegisteredResponse | undefined = undefined;

    try {
        usuarioLogged = await obtenerUsuarioLogged();
    } catch {
        usuarioLogged = undefined;
    }

    return (
        <div className="container column">
            <h2 className="text-primary">{servicioDetails.titulo}</h2>
            <p>{servicioDetails.descripcion}</p>
            <p>Precio: <span className="text-secondary">S/. {servicioDetails.precio}</span></p>
            <p>Pagar con:</p>
            <div className="container content-space-evenly">
                {servicioDetails.modalidadesPago.map(m =>
                    <div className="container column">
                        {m.tipo === "yape" && <>
                            <span>Yape</span>
                            <YapeModule numCelular={m.numeroCelular} source={m.url} />
                        </>}
                        {m.tipo === "tarjeta" && <>
                            <span>Tarjeta de débito/crédito</span>
                            <img className="brand credit-card" />
                        </>}
                    </div>
                )}
            </div>
            <div>
                {usuarioLogged && servicioDetails.prestamista.id !== usuarioLogged.id &&
                    <ContactForm cliente={usuarioLogged} servicio={servicioDetails}>Enviar mensaje</ContactForm>}
                {!usuarioLogged && <p>
                    <a className="link-button btn-primary" href="/login">Inicia sesión</a>&nbsp;o
                    &nbsp;<a className="link-button btn-secondary" href="/registro/usuario">Regístrate</a>
                </p>}
            </div>


            {/**
             * Reseñas
             */}
            <hr />
            <div className="review">
                {usuarioLogged && servicioDetails.prestamista.id !== usuarioLogged.id &&
                    <>
                        <h3>Emite tu opinión</h3>
                        <FormReviewServicio idServicio={servicioDetails.id} comentarista={{
                            id: usuarioLogged.id,
                            nombres: usuarioLogged.nombres,
                            apellidos: usuarioLogged.apellidos
                        }} />
                    </>}
                {!usuarioLogged && <p>Inicia sesión para que puedas emitir tu opinión</p>}
                <hr />
                {servicioReview.comentarios.map(c =>
                    <div className={commentStyles.comentario}>
                        <span className={commentStyles.usuarioNombres}>{`${c.nombresComentarista} ${c.apellidosComentarista}`}</span>
                        <div className={reviewStyles.rating}>
                            <span data-puntaje={c.puntaje}></span>
                            <span className={reviewStyles.puntaje}>{c.puntaje}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}