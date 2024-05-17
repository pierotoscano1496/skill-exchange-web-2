import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import cardStyles from "@/app/styles/cards/cardservicio.module.scss";

type ItemParams = {
    servicio: ServicioBusquedaResponse;
}

export default async ({ servicio }: ItemParams) => {
    return (
        <div className={`${cardStyles.cardServicio} container column`}>
            <div>
                <h2 className="cardStyles.title">{servicio.titulo}</h2>
                <p>{servicio.descripcion.substring(0, 100)}...</p>
                <br />
                <span>Por <a href={`/profile/${servicio.idUsuario}`}>{`${servicio.nombresUsuario} ${servicio.apellidosUsuario}`}</a></span>
                <span>S/. {servicio.precio}</span>
            </div>
            <div>
                {/* <img src={servicio.previewImageSource} /> */}

                <a href={`/servicio/details/${servicio.id}`}>Ver más</a>
            </div>

        </div>
    )
}