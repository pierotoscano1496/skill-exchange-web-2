"use client";

import { useRouter } from "next/navigation";

const RegistroUsuario = () => {
    const router = useRouter();
    return (
        <div>
            <h2>Únete a nuestra plataforma para buscar servicios a tus necesidades o a empezar a ganar con tu habilidades</h2>
            <button onClick={() => router.push("/registro/usuario/datos")}>Empezar</button>
        </div>
    )
};

export default RegistroUsuario;