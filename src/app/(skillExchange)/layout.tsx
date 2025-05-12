import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import SENavbar from "@/components/skill-exchange/SENavbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const SkillExchangeLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  try {
    let usuario = await obtenerUsuarioLogged();
    return (
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              {/* Aquí se renderizarán las diferentes páginas protegidas */}
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    );
  } catch {
    console.error("Error al traer usuario");
    redirect("/session-out");
  }
};

SkillExchangeLayout.displayName = "SkillExchangeLayout";

export default SkillExchangeLayout;
