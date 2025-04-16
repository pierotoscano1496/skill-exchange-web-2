import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import SELinkButton from "../skill-exchange/SELinkButton";
import SECard from "../skill-exchange/SECard";
import { getFirstWords } from "@/utils/auxiliares";
import SETitle from "../skill-exchange/text/SETitle";
import SEParragraph from "../skill-exchange/text/SEParragraph";

type ItemParams = {
  servicio: ServicioBusquedaResponse;
};

const ServicioItem = async ({ servicio }: ItemParams) => {
  return (
    <SECard>
      <SETitle label={servicio.titulo} />
      <div className="flex flex-col items-start">
        <a
          className="font-semibold"
          href={`/profile/${servicio.idUsuario}`}
        >{`${servicio.nombresUsuario} ${servicio.apellidosUsuario}`}</a>

        <SEParragraph>{getFirstWords(servicio.descripcion)}</SEParragraph>

        <SELinkButton
          label="Ver más"
          variant="secondary"
          link={`/servicio/details/${servicio.id}`}
        />
      </div>
    </SECard>
  );
};

ServicioItem.displayName = "ServicioItem";

export default ServicioItem;
