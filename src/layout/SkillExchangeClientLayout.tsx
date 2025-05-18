"use client";

import { UsuarioProvider } from "@/contexts/UsuarioContext";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";

export default function SkillExchangeClientLayout({
  usuario,
  children,
}: {
  usuario: UsuarioRegisteredResponse;
  children: React.ReactNode;
}) {
  return (
    <UsuarioProvider initialUsuario={usuario}>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </UsuarioProvider>
  );
}
