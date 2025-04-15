import { searchServicioWithParams } from "@/actions/servicio.actions";
import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import SEServicio from "@/components/servicios/SEServicio";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";
import SEForm from "@/components/skill-exchange/form/SEForm";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SELabel from "@/components/skill-exchange/text/SELabel";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import { useEffect, useState } from "react";

type Props = {
  searchParams: SearchServiciosParametersBody;
};

export default async ({ searchParams }: Props) => {
  const servicios = await searchServicioWithParams(
    searchParams as SearchServiciosParametersBody
  );

  return (
    <SEContainer direction="column" size="medium">
      <SearchServicioForm redirect="principal" />
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
