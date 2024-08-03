"use client";

import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SEInput from "@/components/skill-exchange/form/SEInput";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import { useEffect, useState } from "react";

export default () => {
  const [usuario, setUsuario] = useState<UsuarioRegisteredResponse>();

  useEffect(() => {
    const setup = async () => {
      const usuarioLogged = await obtenerUsuarioLogged();
      setUsuario(usuarioLogged);
    };

    setup();
  }, []);

  return (
    <div>
      {usuario && (
        <SEInput
          onChange={(e) => console.log(e.target.value)}
          value={usuario?.nombres}
        />
      )}
    </div>
  );
};
