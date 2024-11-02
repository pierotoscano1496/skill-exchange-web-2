"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/styles/login/login.module.scss";
import SEInput from "@/components/skill-exchange/form/SEInput";
import { loginUsuario } from "@/actions/auth.actions.client";
import SEButton from "@/components/skill-exchange/SEButton";
import SECard from "@/components/skill-exchange/SECard";
import SEForm from "@/components/skill-exchange/form/SEForm";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";

export default () => {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  /* useEffect(()=>{
    if()
  }) */

  const login = async () => {
    try {
      setLoading(true);
      const tokenSaved = await loginUsuario(correo, contrasena);
      if (tokenSaved) {
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
          <SEForm>
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
            <SEButton
              className="self-center"
              label="Ingresar"
              disabled={loading}
              onClick={login}
              variant="primary"
            />
            {loading && <img className={styles.waiting} />}
            {attempSubmit && error && (
              <SEParragraph variant="error">error</SEParragraph>
            )}
          </SEForm>
        </div>
      </section>
    </main>
  );
};
