"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import Categoria from "@/interfaces/models/Categoria";
import Skill from "@/interfaces/models/Skill";
import SubCategoria from "@/interfaces/models/SubCategoria";
import { RegistroSkill } from "@/interfaces/registro-usuario/RegistroSkill";
import axios from "axios";
import { useEffect, useState } from "react";

const RegistroUsuarioSkills = () => {
    const {
        usuarioDatos,
        addSkill,
        removeSkill,
    } = useRegistroUsuarioContext();

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [comentarioDesempeno, setComentarioDesempeno] = useState<string>("");
    const [categoriaSelected, setCategoriaSelected] = useState<Categoria>();
    const [subCategoriaSelected, setSubCategoriaSelected] = useState<SubCategoria>();
    const [skillSelected, setSkillSelected] = useState<Skill>();
    const [nivelConocimiento, setNivelConocimiento] = useState<number>(0);

    const indexOfSkill = 1;

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        const response = await axios.get("api/categorias");
        setCategorias(response.data as Categoria[]);
    }

    const obtenerSubcategorias = async (idCategoria: string) => {
        if (idCategoria) {
            const response = await axios.get(`/api/subcategorias/${idCategoria}`);
            if (response.data) {
                setSubCategorias(response.data as SubCategoria[]);
            }
        } else {
            setSubCategorias([]);
        }
    }

    const obtenerSkills = async (idSubCategoria: string) => {
        if (idSubCategoria) {
            const response = await axios.get(`api/skills/${idSubCategoria}`);
            if (response.data) {
                setSkills(response.data as Skill[]);
            }
        } else {
            setSkills([]);
        }
    }

    const addSkillToUsuario = () => {
        addSkill({
            id: skillSelected!.id,
            descripcion: skillSelected!.descripcion,
            desempeno: comentarioDesempeno,
            nivelConocimiento
        })
    }

    return (
        <div>
            <h2>Registro de habilidades</h2>
            <div>
                <label>Categoría:
                    <select onChange={(e) => obtenerSubcategorias(e.target.value)}>
                        <option>--Seleccione--</option>
                        {categorias.map(c =>
                            <option value={c.id}>{c.nombre}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                <label>Subcategoría:
                    <select onChange={(e) => {
                        setSubCategoriaSelected(subCategorias.find(s => s.id === e.target.value));
                        obtenerSkills(e.target.value)
                    }}>
                        <option>--Seleccione--</option>
                        {subCategorias.map(s =>
                            <option value={s.id}>{s.nombre}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                <label>Habilidad:
                    <select onChange={(e) => setSkillSelected(skills.find(s => s.id === e.target.value))}>
                        <option>--Seleccione--</option>
                        {skills.map(s =>
                            <option value={s.id}>{s.descripcion}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                <label>Nivel de conocimiento:
                    <input type="number" value={nivelConocimiento} onChange={(e) => setNivelConocimiento(parseInt(e.target.value))} min={1} max={10} />
                </label>
            </div>
            <div>
                <label>Comenta cómo te desempeñas:
                    <textarea value={comentarioDesempeno} onChange={(e) => setComentarioDesempeno(e.target.value)} />
                </label>
            </div>
            <button onClick={addSkillToUsuario} disabled={!skillSelected}>Agregar</button>
            <div>
                <h3>Habilidades</h3>
                <div className="skills-content">
                    {
                        usuarioDatos.skills.map(s => (
                            <div className="skill-card">
                                <p>{s.descripcion}</p>
                                <button onClick={() => removeSkill(s.id)}>X</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}