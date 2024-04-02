"use client";

import { useEffect, useState } from "react";

const BuscarServicio = () => {
    const [texto, setTexto] = useState<string>("");
    const [categoria,setCategoria]=useState<string>();
    const [subCategoria,setSubCategoria]=useState<string>();
    /* const [categoriasOptions,setCategoriasOptions]=useState<>([]);
    const [subCategoriaOptions,setSubCategoriaOptions]=useState<>([]); */

    useEffect(()=>{
        
    },[]);

    return (
        <div>
            <div className="search-options">
                <div>
                <input type="text"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Busca por palabra clave o skill" />
                    <label htmlFor=""></label>
                </div>
                <div>
                    <label>Categoría:
                        <select value={categoria}>
                            <option>--Seleccione--</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Subcategoría:
                        <select value={subCategoria}>
                            <option>--Seleccione--</option>

                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
}