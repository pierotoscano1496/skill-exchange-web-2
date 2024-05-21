"use client";

import axios, { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push("/servicio");
        }
    }, []);

    const login = async () => {
        try {
            const response = await axios.post("/api/login", {
                email: correo,
                password: contrasena
            });

            router.push("/servicio");
        } catch (error) {
            let mensaje: string;
            if (error instanceof AxiosError) {
                const err = error as AxiosError;
                mensaje = err.response?.data as string;
            } else {
                mensaje = "Error occurred";
            }
            setAttempSubmit(true);
            setError(mensaje);
        }
    }

    const verifyToken = async () => {
        const response = await axios.get("/api/token");
        console.log(response)
    }

    const goToRegistrar = () => {
        router.push("/registro/usuario/datos");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="hero" id="inicio">
                <div className="hero-content">
                    <div className="container column center">
                        <div className="form main">
                            <div className="form-control">
                                <label htmlFor="email">Correo:</label>
                                <input name="email" type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email">Contraseña:</label>
                                <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                            </div>
                            <button className="btn-primary" type="button" onClick={login}>Ingresar</button>
                            {attempSubmit && error && <p className="text-danger">{error}</p>}
                            <button className="btn-secondary" onClick={() => signIn("google")}>Inicia sesión con google</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
};