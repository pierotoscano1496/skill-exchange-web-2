"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginForm: React.FC = () => {
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const [csrfToken, setCsrfToken] = useState<string>();
    const router = useRouter();

    useEffect(() => {
        getCsrfToken();
    }, []);

    const getCsrfToken = async () => {
        const res = await axios.get("/api/csrf");
        setCsrfToken(res.data);
    }

    const login = async () => {
        const response = await axios.post("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "XSRF-TOKEN": csrfToken
            },
            body: JSON.stringify({
                correo,
                contrasena,
                csrfToken
            })
        });

        if (response.status === 200) {
            // Guardar token
            const bearerToken = response.headers["Authorization"]!!;

            const duracion = 60 * 60 * 1000;

            document.cookie = `token=${bearerToken.replace("Bearer ", "")}`;
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