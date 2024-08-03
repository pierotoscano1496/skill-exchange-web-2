import { searchServicioWithParams } from "@/actions/servicio.actions";
import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import ServicioItem from "@/components/busqueda-servicio/ServicioItem";
import ServiciosFallBack from "@/components/busqueda-servicio/ServiciosFallBack";
import Categoria from "@/interfaces/models/Categoria";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";
import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  searchParams: SearchServiciosParametersBody;
};

export default async ({ searchParams }: Props) => {
  const servicios: ServicioBusquedaResponse[] = await searchServicioWithParams(
    searchParams as SearchServiciosParametersBody
  );

  return (
    <div>
      <SearchServicioForm />
      <div className="bg-fondo-tarjetas p-6 rounded-lg shadow-sm border border-bordes grid">
        {servicios ? (
          servicios.map((s) => <ServicioItem key={s.id} servicio={s} />)
        ) : (
          <p className="text-no-avalable">Sin resultados</p>
        )}
      </div>
    </div>
  );
};
