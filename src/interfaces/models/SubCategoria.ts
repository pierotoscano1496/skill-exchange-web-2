import Categoria from "./Categoria";

export default interface SubCategoria {
    id: string;
    nombre: string;
    categoria: Categoria;
}