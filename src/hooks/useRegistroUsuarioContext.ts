import { RegistroUsuarioContext } from "@/contexts/RegistroUsuarioContext";
import { useContext } from "react";

export const useRegistroUsuarioContext = () => {
    const context = useContext(RegistroUsuarioContext);

    if (!context) {
        throw new Error("useRegistroUsuarioContext debe usarse dentro de RegistroUsuarioProvider");
    }

    return context;
}