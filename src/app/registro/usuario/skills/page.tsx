"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import Categoria from "@/interfaces/models/Categoria";
import Skill from "@/interfaces/models/Skill";
import SubCategoria from "@/interfaces/models/SubCategoria";
import { backendInstance } from "@/utils/constants.backend";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import skillItem from "../../../styles/skillItem.module.scss";

const RegistroUsuarioSkills = () => {
    const {
        usuarioDatos,
        addSkill,
        removeSkill,
        registrarUsuarioAndSkills,
        validateRegistroDatosContacto
    } = useRegistroUsuarioContext();

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [comentarioDesempeno, setComentarioDesempeno] = useState<string>("");
    const [categoriaSelected, setCategoriaSelected] = useState<Categoria>();
    const [subCategoriaSelected, setSubCategoriaSelected] = useState<SubCategoria>();
    const [skillSelected, setSkillSelected] = useState<Skill>();
    const [nivelConocimiento, setNivelConocimiento] = useState<number>(0);
    const router = useRouter();

    const indexOfSkill = 1;

    useEffect(() => {
        if (!validateRegistroDatosContacto()) {
            router.push("/registro/usuario/redes");
        } else {
            obtenerCategorias();
        }
    }, []);

    const obtenerCategorias = async () => {
        const response = await backendInstance.get("categoria");
        setCategorias(response.data as Categoria[]);
    }

    const obtenerSubcategorias = async (idCategoria: string) => {
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

    const addSkillToUsuario = () => {
        addSkill({
            id: skillSelected!.id,
            descripcion: skillSelected!.descripcion,
            desempeno: comentarioDesempeno,
            nivelConocimiento
        })
    }

    const finalizarRegistro = async () => {
        const data = await registrarUsuarioAndSkills();
        if (data) {
            alert("éxito al registrarse")
        }
    }

    const goBack = () => {
        router.back();
    }

    return (
        <div>
            <h2>Registro de habilidades</h2>
            <div>
                <label>Categoría:
                    <select onChange={(e) => obtenerSubcategorias(e.target.value)}>
                        <option>--Seleccione--</option>
                        {categorias.map(c =>
                            <option key={c.id} value={c.id}>{c.nombre}</option>
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
                            <option key={s.id} value={s.id}>{s.nombre}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                <label>Habilidad:
                    <select onChange={(e) => setSkillSelected(skills.find(s => s.id === e.target.value))}>
                        <option>--Seleccione--</option>
                        {skills.map(s =>
                            <option key={s.id} value={s.id}>{s.descripcion}</option>
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
                <div className={skillItem.skillContent}>
                    {
                        usuarioDatos.skills.map(s => (
                            <div key={s.id} className={skillItem.skillCard}>
                                <span className={skillItem.texto}>{s.descripcion}</span>
                                <button onClick={() => removeSkill(s.id)} className={skillItem.delete}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button onClick={finalizarRegistro} className="btn-primary">Finalizar</button>
            <button onClick={goBack} className="btn-secondary">Atrás</button>
            <button onClick={() => console.log(usuarioDatos)} className="btn-secondary">Confirmar</button>
        </div>
    )
};

export default RegistroUsuarioSkills;