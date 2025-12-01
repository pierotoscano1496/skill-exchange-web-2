"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, FileText, Loader2, Video } from "lucide-react";
import { apiService } from "@/lib/services/api-service";
import type { SolicitudRecibida } from "@/lib/types/api-responses";
import { toast } from "sonner";

function toLocalISODateTime(d: Date) {
  // Convierte a YYYY-MM-DDTHH:MM en zona horaria local
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export function AgendarReunionDialog({
  open,
  onOpenChange,
  solicitud,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  solicitud: SolicitudRecibida;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [fechaHora, setFechaHora] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [plataforma, setPlataforma] = useState("zoom");

  // ✅ mínimo = ahora + 1 hora
  const minDateTime = useMemo(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return toLocalISODateTime(now);
  }, []);

  const handleAgendar = async () => {
    try {
      setLoading(true);

      // Validación
      if (!fechaHora || !descripcion.trim()) {
        toast.error("Completa todos los campos requeridos");
        setLoading(false);
        return;
      }

      const picked = new Date(fechaHora);
      const min = new Date(minDateTime);
      if (picked < min) {
        toast.error("La fecha y hora deben ser al menos 1 hora en el futuro");
        setLoading(false);
        return;
      }

      const response = await apiService.agendarReunion({
        idMatchServicio: solicitud.id,
        plataforma,
        fechaHora: picked.toISOString(),
        descripcion: descripcion.trim(),
      });

      if (response.success) {
        toast.success("Reunión agendada exitosamente");
        onSuccess();
        onOpenChange(false);
        setFechaHora("");
        setDescripcion("");
        setPlataforma("zoom");
      } else {
        if (response.statusCode === 400) {
          // Mostrar mensaje específico del backend, especialmente para disponibilidad
          toast.error(
            response.message ||
              "La reunión no puede ser agendada en este horario. Verifica la disponibilidad del proveedor."
          );
        } else if (response.statusCode === 401) {
          toast.error("Sesión expirada. Inicia sesión nuevamente");
        } else if (response.statusCode === 500) {
          toast.error(
            "Hubo un problema al agendar la reunión. Intenta más tarde"
          );
        } else {
          toast.error(response.message || "Error al agendar reunión");
        }
      }
    } catch (error) {
      console.error("Error al agendar reunión:", error);
      toast.error("Error al agendar reunión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-600" />
            Agendar Reunión Virtual
          </DialogTitle>
          <DialogDescription>
            Programa una reunión virtual con{" "}
            <span className="font-medium">
              {solicitud.cliente.nombres} {solicitud.cliente.apellidos}
            </span>{" "}
            para el servicio "{solicitud.servicio.titulo}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fecha-hora" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha y Hora
            </Label>
            <Input
              id="fecha-hora"
              type="datetime-local"
              value={fechaHora}
              onChange={(e) => setFechaHora(e.target.value)}
              min={minDateTime}
            />
            <p className="text-xs text-muted-foreground">
              La reunión debe ser programada al menos 1 hora en el futuro.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="plataforma">Plataforma</Label>
            <Select value={plataforma} onValueChange={setPlataforma}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zoom">Zoom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Descripción
            </Label>
            <Textarea
              id="descripcion"
              placeholder="Describe el propósito de la reunión..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Nota:</strong> El enlace de la reunión se generará
              automáticamente y se compartirá con ambas partes.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleAgendar} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Agendando...
              </>
            ) : (
              <>
                <Video className="w-4 h-4 mr-2" />
                Agendar Reunión
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
