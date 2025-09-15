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
import { CheckCircle, Calendar, FileText, Loader2 } from "lucide-react";
import { aceptarSolicitud } from "@/lib/actions/data";
import type { SolicitudRecibida } from "@/lib/types/api-responses";

function toLocalISODate(d: Date) {
  // Convierte a YYYY-MM-DD en zona horaria local (evita desfaces por UTC)
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function AceptarSolicitudDialog({
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
  const [fechaInicio, setFechaInicio] = useState("");
  const [notas, setNotas] = useState("");

  // ✅ mínimo = mañana (local)
  const minDateTomorrow = useMemo(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return toLocalISODate(t);
  }, []);

  const handleAceptar = async () => {
    try {
      setLoading(true);

      // ✅ Validación defensiva en el submit (por si el navegador no respeta "min" o el usuario fuerza el valor)
      if (fechaInicio) {
        const picked = new Date(`${fechaInicio}T00:00:00`);
        const min = new Date(`${minDateTomorrow}T00:00:00`);
        if (picked < min) {
          // muestra el tooltip nativo de validación
          const el = document.getElementById(
            "fecha-inicio"
          ) as HTMLInputElement | null;
          if (el) {
            el.setCustomValidity(
              `La fecha mínima permitida es ${minDateTomorrow}.`
            );
            el.reportValidity();
          }
          setLoading(false);
          return;
        }
      }

      const response = await aceptarSolicitud({
        idSolicitud: solicitud.id,
        fechaInicio: fechaInicio || undefined
      });

      if (response.success) {
        onSuccess();
        onOpenChange(false);
        setFechaInicio("");
        setNotas("");
      } else {
        console.error("Error al aceptar solicitud:", response.message);
      }
    } catch (error) {
      console.error("Error al aceptar solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Aceptar Solicitud
          </DialogTitle>
          <DialogDescription>
            Estás a punto de aceptar la solicitud de{" "}
            <span className="font-medium">
              {solicitud.cliente.nombres} {solicitud.cliente.apellidos}
            </span>{" "}
            para el servicio "{solicitud.servicio.titulo}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* ... tu bloque informativo ... */}

          <div className="space-y-2">
            <Label htmlFor="fecha-inicio" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha estimada de inicio (opcional)
            </Label>
            <Input
              id="fecha-inicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => {
                const v = e.target.value;
                setFechaInicio(v);
                // limpia mensaje custom para que el navegador revalide
                e.currentTarget.setCustomValidity("");
              }}
              onInvalid={(e) => {
                (e.currentTarget as HTMLInputElement).setCustomValidity(
                  `La fecha mínima permitida es ${minDateTomorrow}.`
                );
              }}
              min={minDateTomorrow} // ✅ aquí el cambio clave
            />
            <p className="text-xs text-muted-foreground">
              La fecha mínima permitida es {minDateTomorrow}.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notas adicionales para el cliente (opcional)
            </Label>
            <Textarea
              id="notas"
              placeholder="Ej: Necesito que tengas los materiales listos, confirma la dirección exacta..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Importante:</strong> Al aceptar te comprometes a realizar
              el servicio. Asegúrate de tener disponibilidad y los recursos
              necesarios.
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
          <Button onClick={handleAceptar} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Aceptando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Aceptar Solicitud
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
