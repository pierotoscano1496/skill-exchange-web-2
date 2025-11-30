"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  User,
  Play,
  Square,
  MessageSquare,
  Video,
} from "lucide-react";
import type { SolicitudRecibida } from "@/lib/types/api-responses";
import { getServiciosCliente } from "@/lib/actions/data";
import { getEstadoBadge } from "../page";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { RealizarPagoDialog } from "@/components/solicitudes/realizar-pago-dialog";
import { AgendarReunionDialog } from "@/components/solicitudes/agendar-reunion-dialog";
import { useRouter } from "next/navigation";

export default function SolicitudesEnviadasPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudRecibida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagoDialogState, setPagoDialogState] = useState<{
    open: boolean;
    solicitud: SolicitudRecibida | null;
  }>({ open: false, solicitud: null });
  const [dialogoAgendarReunion, setDialogoAgendarReunion] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] =
    useState<SolicitudRecibida | null>(null);
  const router = useRouter();

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getServiciosCliente();
      if (response.data) {
        setSolicitudes(response.data);
      } else {
        setError(
          response.message || "No se pudieron cargar las solicitudes enviadas."
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearPrecio = (precio: number) => {
    return `S/ ${precio.toFixed(2)}`;
  };

  const contarPorEstado = (estado: string) => {
    return solicitudes.filter((s) => s.estado === estado).length;
  };

  const handleContactarProveedor = (solicitud: SolicitudRecibida) => {
    router.push(`/skillExchange/mensajes`);
  };

  const handleOperacionExitosa = () => {
    cargarSolicitudes(); // Recargar las solicitudes
  };

  const renderSolicitudCard = (solicitud: SolicitudRecibida) => (
    <Card key={solicitud.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {solicitud.servicio.titulo}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <User className="w-4 h-4" />
              <span>
                {solicitud.servicio.proveedor.nombres}{" "}
                {solicitud.servicio.proveedor.apellidos}
              </span>
            </div>
          </div>
          {getEstadoBadge(solicitud.estado)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Mensaje del cliente:</p>
            <p className="text-sm">{solicitud.mensaje}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatearFecha(solicitud.fecha)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{solicitud.servicio.ubicacion}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium text-foreground">
                {formatearPrecio(solicitud.costo)}
              </span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Proveedor: {solicitud.servicio.proveedor.correo}</p>
            <p>Modalidad: {solicitud.servicio.modalidad}</p>
            {solicitud.estado === "finalizado" && solicitud.puntuacion > 0 && (
              <p>Calificación: {solicitud.puntuacion}/5 ⭐</p>
            )}
          </div>

          {renderAcciones(solicitud)}
        </div>
      </CardContent>
    </Card>
  );

  const filtrarPorEstado = (estado: string) => {
    if (estado === "todas") return solicitudes;
    return solicitudes.filter((s) => s.estado === estado);
  };

  const renderAcciones = (solicitud: SolicitudRecibida) => {
    switch (solicitud.estado) {
      case "solicitado":
        return (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" disabled>
              <XCircle className="w-4 h-4 mr-1" />
              Cancelar
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleContactarProveedor(solicitud)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Contactar Proveedor
            </Button>
          </div>
        );
      case "pendiente_pago":
        return (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setPagoDialogState({ open: true, solicitud })}
            >
              <Play className="w-4 h-4 mr-1" />
              Realizar Pago
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleContactarProveedor(solicitud)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Contactar Proveedor
            </Button>
          </div>
        );
      case "ejecucion":
        return (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setSolicitudSeleccionada(solicitud);
                setDialogoAgendarReunion(true);
              }}
            >
              <Video className="w-4 h-4 mr-1" />
              Agendar Reunión
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleContactarProveedor(solicitud)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Enviar mensaje
            </Button>
            <Button size="sm" variant="ghost">
              Ver Progreso
            </Button>
          </div>
        );
      case "finalizado":
        return (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline">
              Calificar Servicio
            </Button>
            <Button size="sm" variant="ghost">
              Ver Calificación
            </Button>
          </div>
        );
      case "rechazado":
        return (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline">
              Ver Detalles
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center p-4">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 justify-center items-center p-4">
        <div className="text-center text-red-500">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>{error}</p>
          <Button onClick={cargarSolicitudes} className="mt-4">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Solicitudes enviadas</h1>
        </div>
        <p className="text-muted-foreground">
          Aquí puedes ver todas las solicitudes que has enviado a los
          proveedores.
        </p>
        <Tabs defaultValue="todas" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="todas">
              Todas ({solicitudes.length})
            </TabsTrigger>
            <TabsTrigger value="solicitado">
              Solicitadas ({contarPorEstado("solicitado")})
            </TabsTrigger>
            <TabsTrigger value="pendiente_pago">
              Pendiente Pago ({contarPorEstado("pendiente_pago")})
            </TabsTrigger>
            <TabsTrigger value="ejecucion">
              En Ejecución ({contarPorEstado("ejecucion")})
            </TabsTrigger>
            <TabsTrigger value="finalizado">
              Finalizadas ({contarPorEstado("finalizado")})
            </TabsTrigger>
            <TabsTrigger value="rechazado">
              Rechazadas ({contarPorEstado("rechazado")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todas">
            <div className="space-y-4">
              {solicitudes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No has enviado ninguna solicitud.
                  </p>
                </div>
              ) : (
                solicitudes.map(renderSolicitudCard)
              )}
            </div>
          </TabsContent>

          <TabsContent value="solicitado">
            <div className="space-y-4">
              {filtrarPorEstado("solicitado").length > 0 ? (
                filtrarPorEstado("solicitado").map(renderSolicitudCard)
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No hay solicitudes en este estado.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pendiente_pago">
            <div className="space-y-4">
              {filtrarPorEstado("pendiente_pago").length > 0 ? (
                filtrarPorEstado("pendiente_pago").map(renderSolicitudCard)
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No hay solicitudes en este estado.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ejecucion">
            <div className="space-y-4">
              {filtrarPorEstado("ejecucion").length > 0 ? (
                filtrarPorEstado("ejecucion").map(renderSolicitudCard)
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No hay solicitudes en este estado.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="finalizado">
            <div className="space-y-4">
              {filtrarPorEstado("finalizado").length > 0 ? (
                filtrarPorEstado("finalizado").map(renderSolicitudCard)
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No hay solicitudes en este estado.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rechazado">
            <div className="space-y-4">
              {filtrarPorEstado("rechazado").length > 0 ? (
                filtrarPorEstado("rechazado").map(renderSolicitudCard)
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No hay solicitudes en este estado.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <RealizarPagoDialog
        open={pagoDialogState.open}
        onOpenChange={(open) =>
          setPagoDialogState({ ...pagoDialogState, open })
        }
        solicitud={pagoDialogState.solicitud}
      />
      {solicitudSeleccionada && (
        <AgendarReunionDialog
          open={dialogoAgendarReunion}
          onOpenChange={setDialogoAgendarReunion}
          solicitud={solicitudSeleccionada}
          onSuccess={handleOperacionExitosa}
        />
      )}
    </>
  );
}

// Utilidades para mostrar el estado
function getEstadoLabel(estado: string) {
  switch (estado) {
    case "pendiente":
      return (
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" /> Pendiente
        </span>
      );
    case "aceptada":
      return (
        <span className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-green-500" /> Aceptada
        </span>
      );
    case "rechazada":
      return (
        <span className="flex items-center gap-1">
          <XCircle className="w-4 h-4 text-red-500" /> Rechazada
        </span>
      );
    default:
      return estado;
  }
}

function getBadgeVariant(estado: string) {
  switch (estado) {
    case "pendiente":
      return "secondary";
    case "aceptada":
      return "success";
    case "rechazada":
      return "destructive";
    default:
      return "outline";
  }
}
