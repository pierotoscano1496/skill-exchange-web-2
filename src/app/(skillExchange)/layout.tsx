import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SENavbar from "@/components/skill-exchange/SENavbar";

export default async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  let usuario = undefined;
  try {
    usuario = await obtenerUsuarioLogged();
  } catch {
    usuario = undefined;
  }

  return <SENavbar usuario={usuario}>{children}</SENavbar>;
};
