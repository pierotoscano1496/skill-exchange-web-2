"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import type { SolicitudEnviada } from "@/lib/types/api-responses";
import { getSolicitudesEnviadasEstaticas } from "@/lib/data/static-data";
import { getEstadoBadge } from "../page";

export default function SolicitudesEnviadasPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudEnviada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simula obtener el id del usuario actual
      const idCliente = "usuario-demo";
      const data = getSolicitudesEnviadasEstaticas(idCliente);
      setSolicitudes(data);
    } catch (e) {
      setError("No se pudieron cargar las solicitudes enviadas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Solicitudes enviadas</h1>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin mr-2" />
          Cargando...
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      ) : solicitudes.length === 0 ? (
        <div className="text-muted-foreground text-center py-12">
          No has enviado ninguna solicitud aún.
        </div>
      ) : (
        <div className="space-y-4">
          {solicitudes.map((solicitud) => (
            <Card key={solicitud.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {solicitud.servicio.titulo}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    Para: {solicitud.servicio.proveedor.nombres}
                  </div>
                </div>
                {getEstadoBadge(solicitud.estado)}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="font-medium">Fecha de envío:</span>{" "}
                    {new Date(solicitud.fecha).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Mensaje:</span>{" "}
                    {solicitud.mensaje || (
                      <span className="text-muted-foreground">Sin mensaje</span>
                    )}
                  </div>
                  {/* Puedes agregar más detalles aquí */}
                </div>
                {/* Ejemplo de acción: cancelar si está pendiente */}
                {solicitud.estado === "pendiente_pago" && (
                  <Button variant="outline" size="sm" className="mt-4">
                    Cancelar solicitud
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
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
