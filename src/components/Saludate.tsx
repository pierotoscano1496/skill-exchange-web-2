"use client";

import Usuario from "@/interfaces/Usuario";
import axios, { AxiosError } from "axios";
import { useState } from "react";

const Saludate = () => {
    const [usuario, setUsuario] = useState<Usuario>();

    const saludate = async () => {
        try {
            const response = await axios.get("/api/usuario");
            const mensaje = response.data;
            alert(mensaje)
            /* const response = await axios.get("/api/usuario");
            const usuario: Usuario = response.data as Usuario;

            setUsuario(usuario); */
        } catch (error) {
            const err = error as AxiosError;
            alert(err.message)
        }
    }

    return (
        <div>
            <h2>Middleware side component</h2>
            <button onClick={saludate}>Salúdate</button>
            {
                usuario && <p>Hola {usuario.nombres}</p>
            }
        </div>
    )
};

export default Saludate;