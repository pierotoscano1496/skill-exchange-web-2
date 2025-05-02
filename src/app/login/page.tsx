"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SEButton from "@/components/skill-exchange/SEButton";
import SECard from "@/components/skill-exchange/SECard";
import SEForm from "@/components/skill-exchange/form/SEForm";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import { loginUsuario } from "@/actions/auth.actions.client";
import SELinkButton from "@/components/skill-exchange/SELinkButton";

const LoginPage = () => {
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

  const goToRegistrar = () => {
    router.push("/registro/usuario/datos");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-fondo-principal p-6">
      <SECard className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h1>
        <SEForm size="full">
          <SEInput
            label="Correo"
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
            value={correo}
            placeholder="Ingresa tu correo"
          />
          <SEInput
            label="Contraseña"
            onChange={(e) => setContrasena(e.target.value)}
            type="password"
            value={contrasena}
            placeholder="Ingresa tu contraseña"
            className="mt-4"
          />
          <SEButton
            className="w-full mt-6"
            type="submit"
            disabled={loading}
            onClick={login}
            variant="primary"
          >
            Ingresar
          </SEButton>
          {loading && (
            <SEParragraph className="text-center mt-4" theme="neutral">
              Cargando...
            </SEParragraph>
          )}
          {attempSubmit && error && (
            <SEParragraph className="text-center mt-4" theme="error">
              {error}
            </SEParragraph>
          )}
        </SEForm>
        <div className="flex justify-center mt-6">
          <SELinkButton
            className="text-sm"
            variant="secondary"
            link="/registro/usuario"
          >
            ¿No tienes cuenta? Regístrate
          </SELinkButton>
        </div>
      </SECard>
    </main>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
