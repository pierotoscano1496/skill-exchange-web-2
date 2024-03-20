"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import Categoria from "@/interfaces/models/Categoria";
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
    const [comentarioDesempeno, setComentarioDesempeno] = useState<string>("");
    const [categoriaSelected, setCategoriaSelected] = useState<Categoria>();
    const [subCategoriaSelected, setSubCategoriaSelected] = useState<SubCategoria>();

    const indexOfSkill=1;

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        const response = await axios.get("api/categorias");
        setCategorias(response.data as Categoria[]);
    }

    const obtenerSubcategorias = async (idCategoria: string) => {
        if (idCategoria) {
            const response = await axios.get("/api/subcategorias/");
            setSubCategorias(response.data as SubCategoria[]);
        } else {
            setSubCategorias([]);
        }
    }

    const addSkillToUsuario=()=>{
        const skill:RegistroSkill={
            id:indexOfSkill,
            desempeno: comentarioDesempeno,
            habilidad: 
        }
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
                    <select onChange={(e) => setSubCategoriaSelected(subCategorias.find(s => s.id === e.target.value))}>
                        <option>--Seleccione--</option>
                        {subCategorias.map(s =>
                            <option value={s.id}>{s.nombre}</option>
                        )}
                    </select>
                </label>
            </div>
            <div>
                <label>Comenta cómo te desempeñas:
                    <textarea value={comentarioDesempeno} onChange={(e) => setComentarioDesempeno(e.target.value)} />
                </label>
            </div>
            <button onClick={()=>addSkill({
                id:
            })}>Agregar</button>
            <div>
                <label></label>
            </div>
        </div>
    )
}