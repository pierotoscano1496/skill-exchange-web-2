import Usuario from "../Usuario";
import Skill from "./Skill";

export default interface SkillUsuario {
    usuario: Usuario;
    skill: Skill;
    nivelConocimiento: number;
    descripcion: string;
}