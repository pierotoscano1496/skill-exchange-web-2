"use client";

import Categoria from "@/interfaces/models/Categoria";
import axios, { AxiosInstance } from "axios"
import { useEffect, useState } from "react";

const axiosBackend: AxiosInstance = axios.create({
    baseURL: "/backend/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const CategoriaItem = ({ categoria }: { categoria: Categoria }) => {
    return (
        <div>
            <h3>{categoria.id}</h3>
            <p>{categoria.nombre}</p>
        </div>
    )
}

export default () => {
    const [listCategorias, setListCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        getListCategorias();
    }, []);

    const getListCategorias = async () => {
        const response = await axiosBackend.get("categoria");
        setListCategorias(response.data as Categoria[]);
    }

    return (
        <div>
            <h1>Lista de categorías</h1>
            <br />
            {listCategorias.map(c => <CategoriaItem key={c.id} categoria={c} />)}
        </div>
    )
}