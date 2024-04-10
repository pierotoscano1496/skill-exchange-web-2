import ContactForm from "@/components/busqueda-servicio/ContactForm";
import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import { checkUsuario } from "@/utils/apitools/SessionManager";
import { getServerInstance } from "@/utils/constants.server";
import { TipoModalidadPagoOption } from "@/utils/types";

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

const getServicioDetails = async (params: ParamsType) => {
    const response = await getServerInstance().get(`servicio/details/${params.id}`);
    return response.data as ServicioDetailsResponse;
}

const getServicioReview = async (params: ParamsType) => {
    const response = await getServerInstance().get(`servicio/review/${params.id}`)
}

export default async ({ params }: {
    params: {
        [key: string]: string
    }
}) => {
    const servicioDetails = await getServicioDetails(params as ParamsType);

    const servicioReview = await getServicioReview(params as ParamsType);

    const checkUsuarioIsLogged = await checkUsuario();

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
                {checkUsuarioIsLogged ? <ContactForm idUsuario={servicioDetails.usuario.id}>Enviar mensaje</ContactForm> :
                    <>
                        <p>
                            <a className="link-button btn-primary" href="/login">Inicia sesión</a>&nbsp;o
                            &nbsp;<a className="link-button btn-secondary" href="/registro/usuario">Regístrate</a>
                        </p>
                    </>
                }
            </div>

            {/**
             * Reseñas
             */}
            <div className="review"></div>
        </div>
    )
}