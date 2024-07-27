"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/app/styles/login/login.module.scss";
import SEInput from "@/components/skill-exchange/form/SEInput";
import Button from "@/components/skill-exchange/SEButton";
import { loginUsuario } from "@/actions/auth.actions.client";

export default () => {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async () => {
    try {
      setLoading(true);
      const tokenSaved = await loginUsuario(correo, contrasena);
      if (tokenSaved) {
        // Guardar en cookie
        /* let fecha = new Date();
        const fechaExpiracion = fecha.setTime(
          fecha.getTime() + parseInt(process.env.BEARER_TOKEN_MAX_AGE!)
        );
        setCookie(process.env.BEARER_TOKEN_NAME!, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires: new Date(fechaExpiracion),
          sameSite: "strict",
          path: "/",
        }); */
        router.push("/servicio");
      }
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
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async () => {
    const response = await axios.get("/api/token");
    console.log(response);
  };

  const goToRegistrar = () => {
    router.push("/registro/usuario/datos");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="w-1/3" id="inicio">
        <div className="w-full">
          <div className="flex flex-col">
            <SEInput
              label="Correo"
              onChange={(e) => setCorreo(e.target.value)}
              type="email"
              value={correo}
            />
            <SEInput
              label="Contraseña"
              onChange={(e) => setContrasena(e.target.value)}
              type="password"
              value={contrasena}
            />
            <Button
              className="self-center"
              label="Ingresar"
              disabled={loading}
              onClick={login}
              variant="primary"
            />
            {loading && <img className={styles.waiting} />}
            {attempSubmit && error && <p className="text-danger">{error}</p>}
          </div>
        </div>
      </section>
    </main>
  );
};
