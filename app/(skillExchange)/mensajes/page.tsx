"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MessageCircle,
  CheckCheck,
  Clock,
  Phone,
  Video,
} from "lucide-react";
import { STATIC_CHAT_OWN_LAST_MESSAGE } from "@/lib/data/static-data";
import { getCurrentUserId, isStaticMode } from "@/lib/config/environment";
import { dataService } from "@/lib/services/data-service";

interface ConversacionPreview {
  id: string;
  conversationId: string;
  nombre: string;
  email: string;
  avatar: string;
  ultimoMensaje: string;
  fecha: string;
  enviadoPorMi: boolean;
  estado: "activa" | "leida";
}

export default function MensajesBandejaPage() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [conversaciones, setConversaciones] = useState<ConversacionPreview[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarConversaciones() {
      setLoading(true);
      let chats: any[] = [];
      try {
        const resp = await dataService.getOwnChatConversations();
        chats = resp.data || [];
      } catch (e) {
        chats = [];
      }

      const currentUserId = getCurrentUserId();

      const mapped: ConversacionPreview[] = chats.map((conv, idx) => {
        const contact = conv.contact;
        const lastMsg = conv.lastMessage;
        const enviadoPorMi = lastMsg?.sentBy === currentUserId;
        return {
          id: contact?.idContact || `conv-${idx}`,
          conversationId: conv.conversationId || `conv-${idx}`,
          nombre: contact?.fullName || "Sin nombre",
          email: contact?.email || "",
          avatar: "/placeholder.svg?height=40&width=40",
          ultimoMensaje: lastMsg?.mensaje || "Sin mensajes",
          fecha: formatearFechaRelativa(
            lastMsg?.fecha || new Date().toISOString()
          ),
          enviadoPorMi,
          estado: enviadoPorMi ? "leida" : "activa",
        };
      });

      setConversaciones(mapped);
      setLoading(false);
    }
    cargarConversaciones();
  }, []);

  function formatearFechaRelativa(fecha: string): string {
    const date = new Date(fecha);
    const ahora = new Date();
    const diferencia = ahora.getTime() - date.getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 60) return `${minutos}m`;
    if (horas < 24) return `${horas}h`;
    if (dias === 1) return "Ayer";
    if (dias < 7) return `${dias} días`;

    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  }

  const conversacionesFiltradas = conversaciones.filter(
    (conv) =>
      conv.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      conv.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      conv.ultimoMensaje.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalNoLeidos = conversaciones.filter((c) => !c.enviadoPorMi).length;

  const abrirChat = (chatId: string) => {
    router.push(`/mensajes/${chatId}`);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Mensajes</h1>
          {totalNoLeidos > 0 && (
            <p className="text-sm text-muted-foreground">
              {totalNoLeidos} mensaje{totalNoLeidos !== 1 ? "s" : ""} sin leer
            </p>
          )}
        </div>
        <Button onClick={() => router.push("/mensajes/nuevo")}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Nuevo mensaje
        </Button>
      </div>

      <p className="text-muted-foreground">
        Gestiona tus conversaciones con clientes y proveedores.
      </p>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversaciones..."
            className="pl-8"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <Button variant="outline">Filtrar</Button>
      </div>

      <div className="grid gap-3">
        {loading ? (
          <div className="text-center text-muted-foreground py-12">
            Cargando...
          </div>
        ) : (
          conversacionesFiltradas.map((conversacion) => (
            <Card
              key={conversacion.id}
              className={`cursor-pointer transition-all hover:bg-muted/50 hover:shadow-md ${
                !conversacion.enviadoPorMi
                  ? "border-primary/50 bg-primary/5"
                  : ""
              }`}
              onClick={() => abrirChat(conversacion.conversationId)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {conversacion.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="text-sm font-medium leading-none truncate">
                          {conversacion.nombre}
                        </p>
                        {!conversacion.enviadoPorMi && (
                          <Badge
                            variant="default"
                            className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs shrink-0"
                          >
                            <Clock className="h-3 w-3" />
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                        <span>{conversacion.fecha}</span>
                        {conversacion.enviadoPorMi && (
                          <CheckCheck className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversacion.email}
                    </p>
                    <p
                      className={`text-sm truncate ${
                        !conversacion.enviadoPorMi
                          ? "font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {conversacion.ultimoMensaje}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {conversacionesFiltradas.length === 0 && !loading && busqueda && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              No se encontraron conversaciones
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              No hay conversaciones que coincidan con "{busqueda}"
            </p>
            <Button variant="outline" onClick={() => setBusqueda("")}>
              Limpiar búsqueda
            </Button>
          </CardContent>
        </Card>
      )}

      {conversaciones.length === 0 && !loading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No tienes mensajes</h3>
            <p className="text-muted-foreground text-center mb-4">
              Cuando recibas mensajes de clientes interesados en tus servicios,
              aparecerán aquí.
            </p>
            <Button onClick={() => router.push("/explorar")}>
              Explorar servicios
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
