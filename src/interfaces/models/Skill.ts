import SubCategoria from "./SubCategoria";

export default interface Skill {
    id: string;
    descripcion: string;
    subCategoria: SubCategoria;
}