import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import SECard from "../skill-exchange/SECard";
import SETitle from "../skill-exchange/text/SETitle";
import SEParragraph from "../skill-exchange/text/SEParragraph";
import SEImage from "../skill-exchange/multimedia/SEImage";
import SELink from "../skill-exchange/SELink";
import SEContainer from "../skill-exchange/containers/SEContainer";
import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";

interface ServicioProps {
  servicio: ServicioResponse;
  forPublic?: boolean;
}

const SEServicio = ({ servicio, forPublic = false }: ServicioProps) => {
  return (
    <SEContainer
      style="container"
      wrap={true}
      direction="row"
      size="full"
      justify="evenly"
      align="start"
    >
      <SEContainer
        direction="column"
        align="start"
        justify="start"
        className="w-[75%]"
      >
        <SETitle label={servicio.titulo} />
        <SEParragraph>{servicio.descripcion.substring(0, 100)}...</SEParragraph>
        <SEParragraph weight="semibold">S/. {servicio.precio}</SEParragraph>
        {forPublic && (
          <SEParragraph variant="secondary">
            Creado por:{" "}
            {`${servicio.usuario.nombres} ${servicio.usuario.apellidos}`}
          </SEParragraph>
        )}
        <SELink
          link={`/servicio/details/${servicio.id}`}
          label="Ver más"
          weight="bold"
        />
      </SEContainer>
      <SEImage src={servicio.urlImagePreview} className="w-[25%]" />
    </SEContainer>
  );
};

export default SEServicio;
