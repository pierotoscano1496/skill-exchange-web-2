import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SENavbar from "@/components/skill-exchange/SENavbar";
import { redirect } from "next/navigation";

export default async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  let usuario = undefined;
  try {
    usuario = await obtenerUsuarioLogged();
  } catch {
    usuario = undefined;
    redirect("/session-out");
  }

  return <SENavbar usuario={usuario}>{children}</SENavbar>;
};
