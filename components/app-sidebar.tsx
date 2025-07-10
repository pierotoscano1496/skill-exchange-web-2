"use client";

import type * as React from "react";
import {
  Command,
  LifeBuoy,
  Map,
  Send,
  Hammer,
  ClipboardList,
  ShoppingBag,
  MessageSquare,
  Star,
  Heart,
  Home,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSecondary } from "./nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";

const navMain = [
  {
    title: "Explorar",
    url: "/explorar", // Ahora Explorar es la página principal
    icon: ShoppingBag,
    isActive: true,
  },
  {
    title: "Inicio",
    url: "/inicio",
    icon: Home,
  },
  {
    title: "Mis Chambitas",
    url: "#", // Sin ruta, solo para desplegar
    icon: Hammer,
    items: [
      {
        title: "Publicadas",
        url: "/mis-chambitas", // Esta toma la ruta que antes tenía el padre
      },
      {
        title: "Borradores",
        url: "/mis-chambitas/borradores",
      },
      {
        title: "Archivadas",
        url: "/mis-chambitas/archivadas",
      },
    ],
  },
  {
    title: "Solicitudes",
    url: "#", // Sin ruta, solo para desplegar
    icon: ClipboardList,
    items: [
      {
        title: "Recibidas",
        url: "/solicitudes", // Esta toma la ruta que antes tenía el padre
      },
      {
        title: "Enviadas",
        url: "/solicitudes/enviadas",
      },
      {
        title: "Historial",
        url: "/solicitudes/historial",
      },
    ],
  },
  {
    title: "Mensajes",
    url: "#", // Sin ruta, solo para desplegar
    icon: MessageSquare,
    items: [
      {
        title: "Bandeja de entrada",
        url: "/mensajes", // Esta toma la ruta que antes tenía el padre
      },
      {
        title: "Enviados",
        url: "/mensajes/enviados",
      },
      {
        title: "Archivados",
        url: "/mensajes/archivados",
      },
    ],
  },
];
const navSecondary = [
  {
    title: "Ayuda",
    url: "/ayuda",
    icon: LifeBuoy,
  },
  {
    title: "Sugerencias",
    url: "/sugerencias",
    icon: Send,
  },
];
const projects = [
  {
    name: "Favoritos",
    url: "/favoritos",
    icon: Heart,
  },
  {
    name: "Mis reseñas",
    url: "/resenas",
    icon: Star,
  },
  {
    name: "Guardados",
    url: "/guardados",
    icon: Map,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useUser();

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Chambita</span>
                  <span className="truncate text-xs">Servicios informales</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{/* NavUser removed from here */}</SidebarFooter>
    </Sidebar>
  );
}
