import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse"

type ItemParams = {
    servicio: ServicioBusquedaResponse;
}

export default async ({ servicio }: ItemParams) => {
    return (
        <div>
            <div>
                <h2>{servicio.titulo}</h2>
                <p>{servicio.descripcion.substring(0, 100)}...</p>
                <br />
                <span>Por <a href={`/profile/${servicio.idUsuario}`}>{`${servicio.nombresUsuario} ${servicio.apellidosUsuario}`}</a></span>
                <span>S/. {servicio.precio}</span>
            </div>
            <div>
                <img src={servicio.previewImageSource} />

                <a href={`/servicio/details/${servicio.id}`}>Ver más</a>
            </div>

        </div>
    )
}