"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faBriefcase,
  faComment,
  faDoorOpen,
  faEnvelope,
  faFileContract,
  faGear,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import SEButton from "./SEButton";
import SELink from "./SELink";
import SENavbarItem from "./SENavbarItem";
import SESpan from "./text/SESpan";
import { logoutUsuario } from "@/actions/usuario.actions";
import Usuario from "@/interfaces/Usuario";
import { NavbarOptionType } from "@/enums/NavbarOptions";
import { ThemesType } from "@/enums/Themes";

interface NavbarProps {
  children: React.ReactNode;
  usuario: Usuario | undefined;
  variant?: ThemesType;
  selectedKey?: NavbarOptionType;
}

const SENavbar: React.FC<NavbarProps> = ({
  children,
  usuario,
  variant = "primary",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary to-primary-hover text-primary-content",
    secondary:
      "bg-gradient-to-r from-secondary to-secondary-hover text-secondary-content",
    accent: "bg-gradient-to-r from-accent to-accent-hover text-accent-content",
    neutral: "bg-neutral text-neutral-content",
    error: "bg-error text-error-content",
  } as Record<ThemesType, string>;

  useEffect(() => {
    const saveCollapsed = localStorage.getItem("sidebarCollapsed");
    if (saveCollapsed === "true") {
      setSidebarCollapsed(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const logout = async () => {
    await logoutUsuario();
    router.push("/login");
  };

  const collapsedClassMargin = classNames(
    "transition-all duration-300",
    sidebarCollapsed ? "ml-0" : "ml-64"
  );

  const selectedKey: NavbarOptionType = (() => {
    if (pathName.startsWith("/acuerdos")) return "acuerdos";
    if (pathName.startsWith("/contratos")) return "contratos";
    if (pathName.startsWith("/servicio")) return "servicios";
    if (pathName.startsWith("/solicitudes")) return "solicitudes";
    return "none";
  })();

  return (
    <>
      {/* Navbar */}
      <header className={collapsedClassMargin}>
        <nav
          className={classNames(
            variantClasses[variant],
            "p-4 shadow-md flex items-center justify-between border-b border-gray-200"
          )}
        >
          {/* Logo y botón de menú */}
          <div className="flex items-center space-x-4">
            <SEButton
              shape="noShape"
              className="!text-primary-content p-2"
              onClick={toggleSidebar}
              icon={<FontAwesomeIcon icon={faBars} />}
              aria-label="Toggle Sidebar"
            />
            <h1 className="text-lg font-bold hidden md:block">
              Skill Exchange
            </h1>
          </div>

          {/* Íconos y enlaces */}
          <ul className="flex items-center space-x-6">
            <li>
              <SESpan className="!text-primary-content hover:text-accent transition-colors">
                <FontAwesomeIcon icon={faBell} />
              </SESpan>
            </li>
            <li>
              <SELink
                theme={variant}
                link="/mensajes"
                className="!text-primary-content hover:text-accent transition-colors"
              >
                <FontAwesomeIcon icon={faComment} />
              </SELink>
            </li>
            <li>
              <SELink
                className="!text-primary-content hover:text-accent transition-colors"
                link="/servicio"
              >
                <span className="hidden md:inline">Buscar Servicios</span>
                <FontAwesomeIcon icon={faBriefcase} className="md:ml-1" />
              </SELink>
            </li>
            {usuario ? (
              <>
                <li>
                  <SELink
                    className="!text-primary-content hover:text-accent transition-colors"
                    link="/profile"
                  >
                    {usuario.nombres}
                  </SELink>
                </li>
                <li>
                  <SEButton
                    onClick={logout}
                    shape="noShape"
                    icon={<FontAwesomeIcon icon={faDoorOpen} />}
                    aria-label="Cerrar sesión"
                  />
                </li>
              </>
            ) : (
              <li>
                <SELink
                  className="!text-primary-content hover:text-accent transition-colors"
                  link="/login"
                >
                  Iniciar sesión
                </SELink>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Sidebar */}
      {usuario ? (
        <>
          <aside
            className={classNames(
              "bg-gradient-to-b from-gray-800 to-gray-900 text-primary-content p-4",
              "flex flex-col h-screen fixed top-0 left-0 justify-between w-64",
              "transition-transform duration-300 ease-in-out transform",
              sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
            )}
          >
            <div className="mb-6">
              <h2 className="text-primary-content text-lg font-bold">
                Skill Exchange
              </h2>
            </div>
            <nav>
              <ul className="space-y-2 w-48">
                <SENavbarItem
                  selected={selectedKey === "acuerdos"}
                  collapsed={sidebarCollapsed}
                  link="/acuerdos"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faThumbsUp} />}
                >
                  Acuerdos
                </SENavbarItem>
                <SENavbarItem
                  selected={selectedKey === "contratos"}
                  collapsed={sidebarCollapsed}
                  link="/contratos"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faFileContract} />}
                >
                  Contratos
                </SENavbarItem>
                <SENavbarItem
                  selected={selectedKey === "servicios"}
                  collapsed={sidebarCollapsed}
                  link="/servicio/own"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faGear} />}
                >
                  Servicios
                </SENavbarItem>
                <SENavbarItem
                  selected={selectedKey === "solicitudes"}
                  collapsed={sidebarCollapsed}
                  link="/solicitudes"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                >
                  Solicitudes
                </SENavbarItem>
              </ul>
            </nav>
          </aside>
          <main
            className={classNames(
              "bg-gray-100 min-h-screen p-6",
              collapsedClassMargin
            )}
          >
            {children}
          </main>
        </>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
};

export default SENavbar;
