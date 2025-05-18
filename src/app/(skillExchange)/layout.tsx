import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import SENavbar from "@/components/skill-exchange/SENavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UsuarioProvider } from "@/contexts/UsuarioContext";
import SkillExchangeClientLayout from "@/layout/SkillExchangeClientLayout";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SkillExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    let usuario = await obtenerUsuarioLogged();
    return (
      <SkillExchangeClientLayout usuario={usuario}>
        {children}
      </SkillExchangeClientLayout>
    );
  } catch {
    console.error("Error al traer usuario");
    redirect("/session-out");
  }
}
