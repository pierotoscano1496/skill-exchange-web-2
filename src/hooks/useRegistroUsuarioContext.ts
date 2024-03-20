import { RegistroUsuarioContext } from "@/contexts/RegistroUsuarioContext";
import { useContext } from "react";

export const useRegistroUsuarioContext = () => {
    return useContext(RegistroUsuarioContext);
}