export interface Skill {
  id: string;
  descripcion: string;
}

export interface SubCategoria {
  id: string;
  nombre: string;
  skills: Skill[];
}

export default interface Categoria {
  id: string;
  nombre: string;
  subCategorias: SubCategoria[];
}
