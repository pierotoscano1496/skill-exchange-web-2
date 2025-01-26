import { searchServicioWithParams } from "@/actions/servicio.actions";
import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import SEServicio from "@/components/servicios/SEServicio";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";

type Props = {
  searchParams: SearchServiciosParametersBody;
};

export default async ({ searchParams }: Props) => {
  const servicios = await searchServicioWithParams(
    searchParams as SearchServiciosParametersBody
  );

  return (
    <SEContainer direction="column" size="medium">
      <SearchServicioForm />
      <SEGridContainer columns={2}>
        {servicios.length > 0 ? (
          servicios.map((s) => (
            <SEServicio key={s.id} servicio={s} forPublic={true} />
          ))
        ) : (
          <SEParragraph variant="secondary">Sin resultados</SEParragraph>
        )}
      </SEGridContainer>
    </SEContainer>
  );
};
