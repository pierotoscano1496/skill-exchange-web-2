"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Clock, Loader2 } from "lucide-react";
import { apiService } from "@/lib/services/api-service";
import { toast } from "sonner";

interface DisponibilidadSlot {
  dia: string;
  horaInicio: string;
  horaFin: string;
}

const DIAS_SEMANA = [
  { value: "lunes", label: "Lunes" },
  { value: "martes", label: "Martes" },
  { value: "miercoles", label: "Miércoles" },
  { value: "jueves", label: "Jueves" },
  { value: "viernes", label: "Viernes" },
  { value: "sabado", label: "Sábado" },
  { value: "domingo", label: "Domingo" },
];

export function DisponibilidadHorariaForm() {
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadSlot[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const agregarSlot = (dia: string) => {
    const nuevoSlot: DisponibilidadSlot = {
      dia,
      horaInicio: "09:00",
      horaFin: "17:00",
    };
    setDisponibilidad([...disponibilidad, nuevoSlot]);
  };

  const eliminarSlot = (index: number) => {
    const nuevaDisponibilidad = disponibilidad.filter((_, i) => i !== index);
    setDisponibilidad(nuevaDisponibilidad);
  };

  const actualizarSlot = (
    index: number,
    campo: keyof DisponibilidadSlot,
    valor: string
  ) => {
    const nuevaDisponibilidad = [...disponibilidad];
    nuevaDisponibilidad[index][campo] = valor;
    setDisponibilidad(nuevaDisponibilidad);
  };

  const validarSlots = (): string | null => {
    const slotsPorDia = disponibilidad.reduce((acc, slot) => {
      if (!acc[slot.dia]) acc[slot.dia] = [];
      acc[slot.dia].push(slot);
      return acc;
    }, {} as Record<string, DisponibilidadSlot[]>);

    for (const dia in slotsPorDia) {
      const slots = slotsPorDia[dia];
      let totalHoras = 0;

      for (const slot of slots) {
        const inicio = new Date(`2000-01-01T${slot.horaInicio}:00`);
        const fin = new Date(`2000-01-01T${slot.horaFin}:00`);

        if (fin <= inicio) {
          return `En ${dia}, la hora de fin debe ser posterior a la hora de inicio`;
        }

        const horas = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60);
        totalHoras += horas;

        // Verificar solapamientos
        for (const otroSlot of slots) {
          if (slot === otroSlot) continue;
          const otroInicio = new Date(`2000-01-01T${otroSlot.horaInicio}:00`);
          const otroFin = new Date(`2000-01-01T${otroSlot.horaFin}:00`);

          if (inicio < otroFin && fin > otroInicio) {
            return `En ${dia}, los horarios se solapan`;
          }
        }
      }

      if (totalHoras > 8) {
        return `En ${dia}, no puedes tener más de 8 horas de disponibilidad`;
      }

      if (slots.length > 7) {
        return `No puedes tener más de 7 slots por semana`;
      }
    }

    return null;
  };

  const guardarDisponibilidad = async () => {
    const error = validarSlots();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);
      const data = disponibilidad.map((slot) => ({
        dia: slot.dia,
        horaInicio: `${slot.horaInicio}:00`,
        horaFin: `${slot.horaFin}:00`,
      }));

      const response = await apiService.setDisponibilidad(data);

      if (response.success) {
        toast.success("Disponibilidad guardada exitosamente");
      } else {
        if (response.statusCode === 400) {
          toast.error("Revisa los horarios e intenta nuevamente");
        } else if (response.statusCode === 401) {
          toast.error("Sesión expirada. Inicia sesión nuevamente");
        } else if (response.statusCode === 500) {
          toast.error("Error al guardar disponibilidad. Intenta más tarde");
        } else {
          toast.error(response.message || "Error al guardar disponibilidad");
        }
      }
    } catch (error) {
      console.error("Error al guardar disponibilidad:", error);
      toast.error("Error al guardar disponibilidad");
    } finally {
      setLoading(false);
    }
  };

  const slotsPorDia = disponibilidad.reduce((acc, slot, index) => {
    if (!acc[slot.dia]) acc[slot.dia] = [];
    acc[slot.dia].push({ ...slot, index });
    return acc;
  }, {} as Record<string, (DisponibilidadSlot & { index: number })[]>);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Configura tu disponibilidad semanal
        </h3>
        <p className="text-sm text-muted-foreground">
          Selecciona los días y horarios en los que estás disponible para
          servicios
        </p>
      </div>

      <div className="grid gap-4">
        {DIAS_SEMANA.map((dia) => (
          <Card key={dia.value}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">{dia.label}</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => agregarSlot(dia.value)}
                  disabled={loading}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar horario
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {slotsPorDia[dia.value]?.map((slot) => (
                <div
                  key={slot.index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2 flex-1">
                    <Label htmlFor={`inicio-${slot.index}`} className="text-sm">
                      Desde:
                    </Label>
                    <Input
                      id={`inicio-${slot.index}`}
                      type="time"
                      value={slot.horaInicio}
                      onChange={(e) =>
                        actualizarSlot(slot.index, "horaInicio", e.target.value)
                      }
                      className="w-32"
                      disabled={loading}
                    />
                    <Label htmlFor={`fin-${slot.index}`} className="text-sm">
                      Hasta:
                    </Label>
                    <Input
                      id={`fin-${slot.index}`}
                      type="time"
                      value={slot.horaFin}
                      onChange={(e) =>
                        actualizarSlot(slot.index, "horaFin", e.target.value)
                      }
                      className="w-32"
                      disabled={loading}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => eliminarSlot(slot.index)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {(!slotsPorDia[dia.value] ||
                slotsPorDia[dia.value].length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay horarios configurados para este día
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={guardarDisponibilidad} disabled={loading} size="lg">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Guardar Disponibilidad
            </>
          )}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        <p>• Máximo 8 horas por día</p>
        <p>• Mínimo 1 hora por slot</p>
        <p>• No más de 7 slots por semana</p>
        <p>• Los horarios no pueden solaparse</p>
      </div>
    </div>
  );
}
