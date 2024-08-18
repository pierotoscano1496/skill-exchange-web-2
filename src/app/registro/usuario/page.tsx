"use client";

import SEButton from "@/components/skill-exchange/SEButton";
import { useRouter } from "next/navigation";

const RegistroUsuario = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-50 h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Conéctate con Profesionales
        </h1>
        <p className="text-lg text-gray-600">
          Explora y ofrece servicios con los mejores estándares de calidad.
        </p>
        <SEButton
          label="Comienza Ahora"
          onClick={() => router.push("/registro/usuario/datos")}
          size="large"
          className="hover:bg-blue-700"
        />
      </div>
    </div>
  );
};

export default RegistroUsuario;
