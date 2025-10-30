"use client";

import { SidebarIcon, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SearchForm } from "./search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/(auth)/actions";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const { user, loading } = useUser();

  const handleLogout = async () => {
    const logoutSuccess = await logoutAction();
    if (logoutSuccess.ok) redirect("/login");
  };

  if (loading) {
    return (
      <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background">
        <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
          <Button
            className="h-8 w-8"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <SidebarIcon />
          </Button>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="text-primary font-bold text-lg hidden md:block">
            Chambita
          </div>
          <SearchForm className="w-full sm:ml-auto sm:w-auto" />
          <Button variant="ghost" size="icon" className="ml-2">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="ml-4 flex items-center">
            <div className="h-8 w-8 rounded-lg bg-muted animate-pulse" />
            <div className="hidden md:inline-block h-4 w-20 rounded-md bg-muted animate-pulse ml-2" />
          </div>
        </div>
      </header>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="text-primary font-bold text-lg hidden md:block">
          Chambita
        </div>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="ml-2">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Add user dropdown to header */}
        <div className="ml-4 flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.nombres} />
                  <AvatarFallback className="rounded-lg">
                    {user.nombres?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block font-medium">
                  {user.nombres}
                </span>
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt={user.nombres}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.nombres?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.nombres}
                    </span>
                    <span className="truncate text-xs">{user.correo}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/perfil">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Mi perfil
                  </DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem>
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Verificar cuenta
                </DropdownMenuItem> */}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
