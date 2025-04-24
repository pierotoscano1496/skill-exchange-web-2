import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SENavbar from "@/components/skill-exchange/SENavbar";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const SkillExchangeLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  try {
    let usuario = await obtenerUsuarioLogged();
    return <SENavbar usuario={usuario}>{children}</SENavbar>;
  } catch {
    console.error("Error al traer usuario");
    redirect("/session-out");
  }
};

SkillExchangeLayout.displayName = "SkillExchangeLayout";

export default SkillExchangeLayout;
