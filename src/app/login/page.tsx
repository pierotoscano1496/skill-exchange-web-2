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
import SEContainer from "@/components/skill-exchange/containers/SEContainer";

const LoginPage = () => {
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
      if (error instanceof Error) {
        setError(error.message);
      }
      setAttempSubmit(true);
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-md:p-12">
      <section id="inicio" className="w-5/12 max-md:w-full">
        <SEContainer size="full">
          <SEForm size="full">
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
              type="submit"
              disabled={loading}
              onClick={login}
              variant="primary"
            />
            {loading && <img className={styles.waiting} />}
            {attempSubmit && error && (
              <SEParragraph variant="error">{error}</SEParragraph>
            )}
          </SEForm>
        </SEContainer>
      </section>
    </main>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
