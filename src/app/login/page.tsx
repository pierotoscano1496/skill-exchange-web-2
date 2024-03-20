"use client";

import LoginForm from "@/components/LoginForm";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const router = useRouter();

    const login = async () => {
        try {
            const response = await axios.post("/api/login", {
                email: correo,
                password: contrasena
            });

            alert(response.data.mensaje);

            router.push("/middlewareside");
        } catch (error) {
            let mensaje: string;
            if (error instanceof AxiosError) {
                const err = error as AxiosError;
                mensaje = err.response?.data as string;
            } else {
                mensaje = "Error occurred";
            }

            alert(mensaje);
        }
    }

    const verifyToken = async () => {
        const response = await axios.get("/api/token");
        console.log(response)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div>
                    <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                    <button type="button" onClick={login}>Ingresar</button>
                    <button type="button" onClick={verifyToken}>Verificar</button>
                </div>
            </div>
        </main>
    )
}