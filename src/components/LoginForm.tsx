"use client";

import UsuarioCredenciales from "@/interfaces/requestbody/UsuarioCredenciales";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginForm: React.FC = () => {
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const router = useRouter();

    const login = async () => {
        try {
            const response = await axios.post("/api/login", {
                correo,
                contrasena
            });

            alert(response.data);



            router.push("/middlewareside");
        } catch (error) {
            const err = error as AxiosError;
            alert(err.message)
        }



        /* const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append(csrfData!.headerName, csrfData!.token);
        
        const response = await axios.post("/api/login", {
            correo,
            contrasena
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": csrfData!.token
            }
        });

        if (response.status === 200) {
            // Guardar token
            const bearerToken = response.headers["Authorization"]!!;

            const duracion = 60 * 60 * 1000;

            document.cookie = `token=${bearerToken.replace("Bearer ", "")}`;
            router.push("/middlewareside");
        } */
    }

    return (
        <div>
            <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <button type="button" onClick={login}>Ingresar</button>
        </div>
    )
};

export default LoginForm;