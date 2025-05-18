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
  Handshake,
  Pencil,
  Folder,
  Receipt,
  ReceiptText,
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
import { icon } from "@fortawesome/fontawesome-svg-core";
import { url } from "inspector";
import { useUsuario } from "@/contexts/UsuarioContext";

const data = {
  user: {
    name: "María López",
    email: "maria@ejemplo.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Mis Chambitas",
      url: "/mis-chambitas",
      icon: Hammer,
      isActive: true,
      items: [
        {
          title: "Publicadas",
          url: "/mis-chambitas/publicadas",
          icon: Map,
        },
        {
          title: "Borradores",
          url: "/mis-chambitas/borradores",
          icon: Pencil,
        },
        {
          title: "Archivadas",
          url: "/mis-chambitas/archivadas",
          icon: Folder,
        },
        {
          title: "Contratadas",
          url: "/mis-chambitas/contratadas",
          icon: Handshake,
        },
      ],
    },
    /* {
      title: "Solicitudes",
      url: "/solicitudes",
      icon: ClipboardList,
      items: [
        {
          title: "Recibidas",
          url: "/solicitudes/recibidas",
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
    }, */
    {
      title: "Explorar",
      url: "/explorar",
      icon: ShoppingBag,
      items: [
        {
          title: "Cerca de mí",
          url: "/explorar/cerca",
        },
        {
          title: "Categorías",
          url: "/explorar/categorias",
        },
        {
          title: "Populares",
          url: "/explorar/populares",
        },
      ],
    },
    {
      title: "Mensajes",
      url: "/mensajes",
      icon: MessageSquare,
      items: [
        {
          title: "Bandeja de entrada",
          url: "/mensajes/recibidos",
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
  ],
  navSecondary: [
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
  ],
  projects: [
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { usuario, loading } = useUsuario();
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
        <div className="flex items-center gap-3 mt-4 px-2">
          <img
            src={"/avatars/default.jpg"}
            alt={usuario?.nombres || "Usuario"}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {loading ? "Cargando..." : usuario?.nombres || "Usuario"}
            </span>
            <span className="text-xs text-muted-foreground">
              {usuario?.correo || ""}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{/* NavUser removed from here */}</SidebarFooter>
    </Sidebar>
  );
}
