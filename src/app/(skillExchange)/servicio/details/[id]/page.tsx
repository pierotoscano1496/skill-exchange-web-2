import ContactForm from "@/components/busqueda-servicio/ContactForm";
import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import { checkUsuario, getUsuario } from "@/utils/apitools/SessionManager";
import { TipoModalidadPagoOption } from "@/utils/types";
import commentStyles from "./comment.module.scss";
import reviewStyles from "@/app/styles/review/review-servicio.module.scss";
import ServicioReviewResponse from "@/interfaces/responsebody/review/ServicioReviewResponse";
import FormReviewServicio from "@/components/review-servicio/FormReviewServicio";
import { getServicioDetails, getServicioReview } from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";

type ParamsType = {
    id: string;
}

type ModalidadOption = TipoModalidadPagoOption & {
    brandClassName: string
}

const tipoModalidadOptions: ModalidadOption[] = [
    {
        nombre: "Tarjeta de débito/crédito",
        valor: "tarjeta",
        brandClassName: "credit-card"
    }, {
        nombre: "Yape",
        valor: "yape",
        brandClassName: "yape"
    }
];


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
        <div>
            <h2>{servicioDetails.titulo}</h2>
            <p>{servicioDetails.descripcion}</p>
            <p>Precio: <span className="text-secondary">S/. {servicioDetails.precio}</span></p>
            <p>Pagar con:</p>
            <div className="container">
                {servicioDetails.modalidadesPago.map(m =>
                    <div className="item">
                        <img className={`brand ${tipoModalidadOptions.find(mod => mod.valor === m.tipo)?.brandClassName}`} />

                        <span>{tipoModalidadOptions.find(mod => mod.valor === m.tipo)?.nombre}</span>
                    </div>
                )}
            </div>
            <div>
                {usuarioLogged ?
                    <ContactForm cliente={usuarioLogged} servicio={servicioDetails}>Enviar mensaje</ContactForm> :
                    <p>
                        <a className="link-button btn-primary" href="/login">Inicia sesión</a>&nbsp;o
                        &nbsp;<a className="link-button btn-secondary" href="/registro/usuario">Regístrate</a>
                    </p>
                }
            </div>


            {/**
             * Reseñas
             */}
            <hr />
            <div className="review">
                {usuarioLogged &&
                    <>
                        <h3>Emite tu opinión</h3>
                        <FormReviewServicio idServicio={servicioDetails.id} comentarista={{
                            id: usuarioLogged.id,
                            nombres: usuarioLogged.nombres,
                            apellidos: usuarioLogged.apellidos
                        }} />
                    </>}
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
        </div >
    )
}