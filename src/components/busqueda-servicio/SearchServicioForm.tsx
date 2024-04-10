"use client";

import Categoria from "@/interfaces/models/Categoria";
import Skill from "@/interfaces/models/Skill";
import SubCategoria from "@/interfaces/models/SubCategoria";
import { backendInstance } from "@/utils/constants.backend";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default () => {
    const [keyWord, setKeyWord] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [idSubCategoria, setIdSubCategoria] = useState("");
    const [idSkill, setIdSkill] = useState("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const router = useRouter();

    useEffect(() => {
        obtenerCategorias();
    }, [])

    const obtenerCategorias = async () => {
        const response = await backendInstance.get("categoria");
        setCategorias(response.data as Categoria[]);
    }

    const obtenerSubCategorias = async (idCategoria: string) => {
        if (idCategoria) {
            const response = await backendInstance.get(`sub-categoria/categoria/${idCategoria}`);
            if (response.data) {
                setSubCategorias(response.data as SubCategoria[]);
            }
        } else {
            setSubCategorias([]);
        }
    }

    const obtenerSkills = async (idSubCategoria: string) => {
        if (idSubCategoria) {
            const response = await backendInstance.get(`skill/sub-categoria/${idSubCategoria}`);
            if (response.data) {
                setSkills(response.data as Skill[]);
            }
        } else {
            setSkills([]);
        }
    }

    const buscarServicios = () => {
        const parameters = [];

        if (keyWord) {
            parameters.push(`keyWord=${keyWord}`);
        }
        if (idCategoria) {
            parameters.push(`idCategoria=${idCategoria}`);
        }
        if (idSubCategoria) {
            parameters.push(`idSubCategoria=${idSubCategoria}`);
        }
        if (idSkill) {
            parameters.push(`idSkill=${idSkill}`);
        }

        const searchParams = parameters.reduce((prevParam, param) => `${param}&${prevParam}`);

        router.push(`/servicio${searchParams.length > 0 ? `?${searchParams}` : ''}`);
    }

    return (
        <div className="formInline">
            <div className="form-control">
                <input name="keyWord" type="text" value={keyWord} onChange={(e) => setKeyWord(e.target.value)} placeholder="Palabra clave" />
            </div>
            <div className="form-control">
                <label htmlFor="idCategoriaSelected">Categoría:</label>
                <select name="idCategoriaSelected" value={idCategoria} onChange={(e) => {
                    setIdCategoria(e.target.value);
                    obtenerSubCategorias(e.target.value);
                }}>
                    <option>--Seleccione--</option>
                    {categorias.map(c =>
                        <option value={c.id}>{c.nombre}</option>
                    )}
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="idSubcategoriaSelected">Sub categoría</label>
                <select name="idSubcategoriaSelected" value={idSubCategoria} onChange={(e) => {
                    setIdSubCategoria(e.target.value);
                    obtenerSkills(e.target.value);
                }}>
                    <option>--Seleccione--</option>
                    {subCategorias.map(s =>
                        <option value={s.id}>{s.nombre}</option>
                    )}
                </select>
            </div>
            <div className="form-control">
                <label htmlFor="idSkillSelected">Habilidad</label>
                <select name="idSkillSelected" value={idSkill} onChange={(e) => {
                    setIdSkill(e.target.value);
                }}>
                    <option>--Seleccione--</option>
                    {skills.map(s =>
                        <option value={s.id}>{s.descripcion}</option>
                    )}
                </select>
            </div>

            <button onClick={buscarServicios}>Buscar</button>
        </div>
    )
}