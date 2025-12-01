"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, Loader2 } from "lucide-react";
import { apiService } from "@/lib/services/api-service";
import { toast } from "sonner";
import type { ReunionFutura } from "@/lib/types/api-responses";

interface ReunionesFuturasProps {
  idMatch: string;
}

export function ReunionesFuturas({ idMatch }: ReunionesFuturasProps) {
  const [reuniones, setReuniones] = useState<ReunionFutura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReuniones = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getReunionesFuturas(idMatch);

        if (response.success && response.data) {
          setReuniones(response.data);
        } else {
          setError(response.message || "Error al cargar reuniones");
          toast.error(response.message || "Error al cargar reuniones");
        }
      } catch (err) {
        const errorMessage = "Error al conectar con el servidor";
        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Error fetching reuniones futuras:", err);
      } finally {
        setLoading(false);
      }
    };

    if (idMatch) {
      fetchReuniones();
    }
  }, [idMatch]);

  const formatFechaHora = (fechaHora: string) => {
    const fecha = new Date(fechaHora);
    return {
      fecha: fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      hora: fecha.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Cargando reuniones futuras...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p>{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (reuniones.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Reuniones Futuras</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No hay reuniones futuras programadas
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Reuniones Futuras</h3>
      <div className="grid gap-4">
        {reuniones.map((reunion) => {
          const { fecha, hora } = formatFechaHora(reunion.fechaHora);
          return (
            <Card key={reunion.id} className="w-full">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {fecha}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {hora}
                    </div>
                  </div>
                  <Badge variant="secondary">{reunion.plataforma}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">{reunion.descripcion}</p>
                {reunion.linkReunion && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(reunion.linkReunion, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Unirse a la reunión
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
