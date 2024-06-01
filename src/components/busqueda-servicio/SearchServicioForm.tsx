"use client";

import { obtenerCategorias } from "@/actions/categoria.actions";
import { obtenerSkills, obtenerSkillsBySubCategoria } from "@/actions/skill.action";
import { obtenerSubCategorias, obtenerSubCategoriasByCategoria } from "@/actions/subcategoria.actions";
import Categoria from "@/interfaces/models/Categoria";
import Skill from "@/interfaces/models/Skill";
import SubCategoria from "@/interfaces/models/SubCategoria";
import SkillResponse from "@/interfaces/responsebody/skill/SkillResponse";
import SubCategoriaResponse from "@/interfaces/responsebody/subCategoria/SubCategoriaResponse";
import { SelectOptions } from "@/utils/types";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ReactSelect from "react-select";
import SearchServicioFallback from "./SearchServicioFallback";

export default () => {
    const [keyWord, setKeyWord] = useState("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [subCategorias, setSubCategorias] = useState<SubCategoriaResponse[]>([]);
    const [skills, setSkills] = useState<SkillResponse[]>([]);
    const [categoriaSelected, setCategoriaSelected] = useState<Categoria>();
    const [subcategoriaSelected, setSubCategoriaSelected] = useState<SubCategoriaResponse>();
    const [skillSelected, setSkillSelected] = useState<SkillResponse>();
    const router = useRouter();

    useEffect(() => {
        const setup = async () => {
            obtenerCategorias().then(data => setCategorias(data));
            obtenerSubCategorias().then(data => setSubCategorias(data));
            obtenerSkills().then(data => setSkills(data));
        }

        setup();
    }, []);

    const buscarServicios = () => {
        const parameters = [];

        if (keyWord) {
            parameters.push(`keyWord=${keyWord}`);
        }
        if (categoriaSelected) {
            parameters.push(`idCategoria=${categoriaSelected.id}`);
        }
        if (subcategoriaSelected) {
            parameters.push(`idSubCategoria=${subcategoriaSelected.id}`);
        }
        if (skillSelected) {
            parameters.push(`idSkill=${skillSelected.id}`);
        }

        const searchParams = parameters.reduce((prevParam, param) => `${param}&${prevParam}`);

        router.push(`/servicio${searchParams.length > 0 ? `?${searchParams}` : ''}`);
    }

    const subCategoriasFiltered = subCategorias.filter(s => s.idCategoria === categoriaSelected?.id);
    const skillsFiltered = skills.filter(s => s.idSubCategoria === subcategoriaSelected?.id);

    return (
        <div className="form-row">
            <div className="form-control">
                <input name="keyWord" type="text" value={keyWord}
                    onChange={(e) => setKeyWord(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            buscarServicios();
                        }
                    }}
                    placeholder="Palabra clave" />
            </div>
            <div className="form-control">
                <label htmlFor="id-categoria">Categoría:</label>
                <ReactSelect key={"categoria"}
                    options={categorias.map(categoria => ({
                        label: categoria.nombre,
                        value: categoria.id
                    } as SelectOptions))}
                    value={{
                        label: categoriaSelected?.nombre,
                        value: categoriaSelected?.id
                    }}
                    onChange={option => {
                        setCategoriaSelected(categorias.find(categoria => categoria.id === option?.value));
                        setSubCategoriaSelected(undefined);
                        setSkillSelected(undefined);
                    }} />
            </div>
            <div className="form-control">
                <label htmlFor="id-sub-categoria">Sub categoría</label>
                <ReactSelect key={"subCategoria"}
                    options={subCategoriasFiltered.map(subCategoria => ({
                        value: subCategoria.id,
                        label: subCategoria.nombre
                    } as SelectOptions))}
                    value={{
                        label: subcategoriaSelected?.nombre,
                        value: subcategoriaSelected?.id
                    }}
                    onChange={option => {
                        setSubCategoriaSelected(subCategoriasFiltered.find(subCategoria => subCategoria.id === option?.value));
                        setSkillSelected(undefined);
                    }} />
            </div>
            <div className="form-control">
                <label htmlFor="id-skill-selected">Habilidad</label>
                <ReactSelect key={"skill"}
                    options={skillsFiltered.map(skill => ({
                        value: skill.id,
                        label: skill.descripcion
                    } as SelectOptions))}
                    value={{
                        label: skillSelected?.descripcion,
                        value: skillSelected?.id
                    }}
                    onChange={option => {
                        setSkillSelected(skillsFiltered.find(skill => skill.id === option?.value));
                    }} />
            </div>

            <button className="btn-primary" onClick={buscarServicios}>Buscar</button>
        </div>
    )
}