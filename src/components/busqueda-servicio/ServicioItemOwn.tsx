import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";

type ItemParams = {
  servicio: ServicioResponse;
};

const ServicioItemOwn = ({ servicio }: ItemParams) => {
  return (
    <div>
      <div>
        <h2>{servicio.titulo}</h2>
        <p>{servicio.descripcion.substring(0, 100)}...</p>
        <br />
        <span>S/. {servicio.precio}</span>
      </div>
      <div>
        {/* <img src={servicio.previewImageSource} /> */}

        <a href={`/servicio/details/${servicio.id}`}>Ver más</a>
      </div>
    </div>
  );
};

ServicioItemOwn.displayName = "ServicioItemOwn";

export default ServicioItemOwn;
