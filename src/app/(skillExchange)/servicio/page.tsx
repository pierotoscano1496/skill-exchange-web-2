import { searchServicioWithParams } from "@/actions/servicio.actions";
import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import ServicioItem from "@/components/busqueda-servicio/ServicioItem";
import Categoria from "@/interfaces/models/Categoria";
import SearchServiciosParametersBody from "@/interfaces/requestbody/servicio/SearchServiciosParametersBody";
import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";

/* type SearchParamsType = {
    keyWord: string;
    idCategoria: string;
    idSubCategoria: string;
    idSkill: string;
}

const obtenerServicios = async (searchParams: SearchParamsType): Promise<ServicioBusquedaResponse[]> => {
    const serviciosPreview = await searchServicioWithParams(searchParams).post("servicio/busqueda", searchParams || {
        keyWord: "",
        idCategoria: "",
        idSkill: "",
        idSubCategoria: ""
    });
    return (response.data as ServicioBusquedaResponse[]).slice(0, 50);
} */

type Props = {
    searchParams: SearchServiciosParametersBody
}

export default async ({ searchParams }: Props) => {
    const servicios: ServicioBusquedaResponse[] = await searchServicioWithParams(searchParams as SearchServiciosParametersBody);

    return (
        <div>
            <SearchServicioForm />

            {servicios ? servicios.map(s =>
                <ServicioItem key={s.id} servicio={s} />
            ) : <p className="text-no-avalable">Sin resultados</p>}
        </div>
    )
}