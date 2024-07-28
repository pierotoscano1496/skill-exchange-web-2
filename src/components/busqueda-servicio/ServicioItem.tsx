import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import SELinkButton from "../skill-exchange/SELinkButton";
import SECard from "../skill-exchange/SECard";

type ItemParams = {
  servicio: ServicioBusquedaResponse;
};

export default async ({ servicio }: ItemParams) => {
  return (
    <SECard
      title={servicio.titulo}
      description={`${servicio.descripcion.substring(0, 100)}...`}
    >
      <div className="flex flex-col items-start">
        <a
          className="font-semibold"
          href={`/profile/${servicio.idUsuario}`}
        >{`${servicio.nombresUsuario} ${servicio.apellidosUsuario}`}</a>

        <SELinkButton
          label="Ver más"
          variant="secondary"
          link={`/servicio/details/${servicio.id}`}
        />
      </div>
    </SECard>
  );
};
