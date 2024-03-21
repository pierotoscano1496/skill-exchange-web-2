export default interface AsignacionSkillToUsuarioRequest {
    idSkill: string; // null para los nuevos skills
    nivelConocimiento: number;
    descripcion: string;
}