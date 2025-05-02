"use client";

import SEButton from "@/components/skill-exchange/SEButton";
import { useRouter } from "next/navigation";

const RegistroUsuario = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-50 h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800">
          Conéctate con Profesionales
        </h1>
        <p className="text-lg text-gray-600">
          Explora y ofrece servicios con los mejores estándares de calidad.
        </p>
        <SEButton
          variant="primary"
          size="large"
          onClick={() => router.push("/registro/usuario/datos")}
          className="w-full"
        >
          Comienza Ahora
        </SEButton>
      </div>
    </div>
  );
};

export default RegistroUsuario;
