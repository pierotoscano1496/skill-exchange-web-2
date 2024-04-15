import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import ServicioItem from "@/components/busqueda-servicio/ServicioItem";
import Categoria from "@/interfaces/models/Categoria";
import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import { getServerInstanceAuthorized } from "@/utils/constants.server";

type SearchParamsType = {
    keyWord: string;
    idCategoria: string;
    idSubCategoria: string;
    idSkill: string;
}

const obtenerServicios = async (searchParams: SearchParamsType): Promise<ServicioBusquedaResponse[]> => {
    const response = await getServerInstanceAuthorized().post("servicio/busqueda", searchParams || {
        keyWord: "",
        idCategoria: "",
        idSkill: "",
        idSubCategoria: ""
    });
    return (response.data as ServicioBusquedaResponse[]).slice(0, 50);
}

export default async ({ searchParams }: {
    searchParams: {
        [key: string]: string
    }
}) => {
    const servicios: ServicioBusquedaResponse[] = await obtenerServicios(searchParams as SearchParamsType);

    return (
        <div>
            <SearchServicioForm />

            {servicios ? servicios.map(s =>
                <ServicioItem key={s.id} servicio={s} />
            ) : <p className="text-no-avalable">Sin resultados</p>}
        </div>
    )
}