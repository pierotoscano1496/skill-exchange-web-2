"use client";

import SEButton from "@/components/skill-exchange/SEButton";
import { useRouter } from "next/navigation";

const RegistroUsuario = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-8 grid-rows-2">
      <h2 className="text-primary-600 font-medium text-4xl text-center col-start-2 col-end-6">
        Únete a nuestra plataforma para buscar servicios a tus necesidades o a
        empezar a ganar con tu habilidades
      </h2>

      <SEButton
        className="col-start-4 col-end-7 row-start-1"
        onClick={() => router.push("/registro/usuario/datos")}
        label="Empezar"
      />
    </div>
  );
};

export default RegistroUsuario;
