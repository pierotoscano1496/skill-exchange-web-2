"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const router = useRouter();

    const login = async () => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo,
                contrasena
            })
        });

        if (response.status === 200) {
            // Guardar token
            const bearerToken = response.headers.get("Authorization")!!;

            const duracion = 60 * 60 * 1000;

            document.cookie = `token="${bearerToken.replace("Bearer ", "")}`;
            /* cookiesStorage.set("token", bearerToken.replace("Bearer ", ""), {
                expires: duracion
            }); */
            //localStorage.setItem("token", bearerToken.replace("Bearer ", ""));
            router.push("/middlewareside");
        }
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