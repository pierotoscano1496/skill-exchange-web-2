"use client";

import PanelNavigation from "@/app/components/PanelNavigation";
import Usuario from "@/interfaces/Usuario";
import { getCookieParam } from "@/utils/cookieManager";
import axios from "axios";
import { useState } from "react";

export default function Middleware() {
    const [usuario, setUsuario] = useState<Usuario>();

    const saludate = async () => {
        const token = getCookieParam("token");

        const response = await axios.post(`/api/usuario`, {
            token
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        /* const usuario = await response.data as Usuario;
        setUsuario(usuario); */
        console.log(response.data);
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
}