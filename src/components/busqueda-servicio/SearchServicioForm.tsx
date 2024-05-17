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
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

export default () => {
    const [keyWord, setKeyWord] = useState("");
    const [categoriasOptions, setCategoriasOptions] = useState<SelectOptions[]>([]);
    const [subCategorias, setSubCategorias] = useState<SubCategoriaResponse[]>([]);
    const [skills, setSkills] = useState<SkillResponse[]>([]);
    const [idCategoriaSelected, setIdCategoriaSelected] = useState<string>();
    const [idSubcategoriaSelected, setIdSubCategoriaSelected] = useState<string>();
    const [idSkillSelected, setIdSkillSelected] = useState<string>();
    const router = useRouter();

    useEffect(() => {
        const setup = async () => {
            obtenerCategorias().then(data => {
                const dataToOptions = data.map(c => ({
                    label: c.nombre,
                    value: c.id
                }));
                setCategoriasOptions(dataToOptions);
            });
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
        if (idCategoriaSelected) {
            parameters.push(`idCategoria=${idCategoriaSelected}`);
        }
        if (idSubcategoriaSelected) {
            parameters.push(`idSubCategoria=${idSubcategoriaSelected}`);
        }
        if (idSkillSelected) {
            parameters.push(`idSkill=${idSkillSelected}`);
        }

        const searchParams = parameters.reduce((prevParam, param) => `${param}&${prevParam}`);

        router.push(`/servicio${searchParams.length > 0 ? `?${searchParams}` : ''}`);
    }

    const subCategoriasFiltered = subCategorias.filter(s => s.idCategoria === idCategoriaSelected);
    const skillsFiltered = skills.filter(s => s.idSubCategoria === idSubcategoriaSelected);

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
                <ReactSelect key={"categoria"} options={categoriasOptions}
                    onChange={option => {
                        setIdCategoriaSelected(option?.value);
                    }} />
            </div>
            <div className="form-control">
                <label htmlFor="id-sub-categoria">Sub categoría</label>
                <ReactSelect key={"subCategoria"} options={subCategoriasFiltered.map(s => ({
                    value: s.id,
                    label: s.nombre
                }))}
                    onChange={option => {
                        setIdSubCategoriaSelected(option?.value);
                    }} />
            </div>
            <div className="form-control">
                <label htmlFor="id-skill-selected">Habilidad</label>
                <ReactSelect key={"skill"} options={skillsFiltered.map(s => ({
                    value: s.id,
                    label: s.descripcion
                }))}
                    onChange={option => {
                        setIdSkillSelected(option?.value);
                    }} />
            </div>

            <button className="btn-primary" onClick={buscarServicios}>Buscar</button>
        </div>
    )
}