import SearchServicioForm from "@/components/busqueda-servicio/SearchServicioForm";
import ServicioItem from "@/components/busqueda-servicio/ServicioItem";
import Categoria from "@/interfaces/models/Categoria";
import ServicioBusquedaResponse from "@/interfaces/responsebody/servicio/ServicioBusquedaResponse";
import { getServerInstance, getServerInstanceAuthorized } from "@/utils/constants.server";

type SearchParamsType = {
    keyWord: string;
    idCategoria: string;
    idSubCategoria: string;
    idSkill: string;
}

const obtenerServicios = async (searchParams: SearchParamsType): Promise<ServicioBusquedaResponse[]> => {
    const response = await getServerInstanceAuthorized().post("servicio/busqueda", searchParams);
    return (response.data as ServicioBusquedaResponse[]).slice(0, 50);
}

const obtenerCategorias = async (): Promise<Categoria[]> => {
    const response = await getServerInstance().get("categoria");
    return response.data as Categoria[];
}

export default async ({ searchParams }: {
    searchParams: {
        [key: string]: string
    }
}) => {
    let keyWord = "";
    let idCategoria = "";
    let idSubCategoria = "";
    let idSkill = "";

    if (searchParams) {
        keyWord = searchParams.keyWord;
        idCategoria = searchParams.idCategoria;
        idSubCategoria = searchParams.idSubCategoria;
        idSkill = searchParams.idSkill;
    }

    const categorias = await obtenerCategorias();
    const servicios: ServicioBusquedaResponse[] = await obtenerServicios(searchParams as SearchParamsType);

    return (
        <div>
            <SearchServicioForm />

            {servicios.map(s =>
                <ServicioItem key={s.id} servicio={s} />
            )}
        </div>
    )
}