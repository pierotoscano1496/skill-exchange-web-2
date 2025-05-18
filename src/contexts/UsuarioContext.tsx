import React, { createContext, useContext, useEffect, useState } from "react";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";

interface UsuarioContextType {
  usuario: UsuarioRegisteredResponse | null;
  loading: boolean;
  refreshUsuario: () => Promise<void>;
}

const UsuarioContext = createContext<UsuarioContextType>({
  usuario: null,
  loading: true,
  refreshUsuario: async () => {},
});

export const useUsuario = () => useContext(UsuarioContext);

export const UsuarioProvider: React.FC<{
  children: React.ReactNode;
  initialUsuario?: UsuarioRegisteredResponse;
}> = ({ children, initialUsuario = null }) => {
  const [usuario, setUsuario] = useState<UsuarioRegisteredResponse | null>(
    initialUsuario
  );
  const [loading, setLoading] = useState(true);

  const fetchUsuario = async () => {
    setLoading(true);
    try {
      const data = await obtenerUsuarioLogged();
      setUsuario(data);
    } catch {
      setUsuario(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuario, loading, refreshUsuario: fetchUsuario }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
