import { searchServicioWithParams } from "@/actions/servicio.actions";
import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import SEServicio from "@/components/servicios/SEServicio";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";

type Props = {
  searchParams: Promise<SearchServiciosParametersBody>;
};

const ServicioPage = async ({ searchParams }: Props) => {
  const servicios = await searchServicioWithParams(await searchParams);

  return (
    
    <SEContainer direction="column" size="large">
      <SearchServicioForm />
      <SEGridContainer columns={2} size="full">
        {servicios.length > 0 ? (
          servicios.map((s) => (
            <SEServicio key={s.id} servicio={s} forPublic={true} />
          ))
        ) : (
          <SEParragraph theme="secondary">Sin resultados</SEParragraph>
        )}
      </SEGridContainer>
    </SEContainer>
  );
};

ServicioPage.displayName = "ServicioPage";

export default ServicioPage;
