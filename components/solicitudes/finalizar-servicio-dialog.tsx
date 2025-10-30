"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Square,
  Clock,
  FileText,
  Star,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { getProcesoFinalizacion, finalizarServicio } from "@/lib/actions/data";
import type { SolicitudRecibida } from "@/lib/types/api-responses";
import type { ProcesoFinalizacion } from "@/lib/types/solicitud-updates";

interface FinalizarServicioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  solicitud: SolicitudRecibida;
  onSuccess: () => void;
}

export function FinalizarServicioDialog({
  open,
  onOpenChange,
  solicitud,
  onSuccess,
}: FinalizarServicioDialogProps) {
  const [loading, setLoading] = useState(false);
  const [procesoInfo, setProcesoInfo] = useState<ProcesoFinalizacion | null>(
    null
  );
  const [resumenTrabajo, setResumenTrabajo] = useState("");
  const [tiempoEmpleado, setTiempoEmpleado] = useState("");
  const [materiales, setMateriales] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [solicitarCalificacion, setSolicitarCalificacion] = useState(true);
  const [requisitosConfirmados, setRequisitosConfirmados] = useState<boolean[]>(
    []
  );
  const [aceptaConsecuencias, setAceptaConsecuencias] = useState(false);

  useEffect(() => {
    if (open) {
      loadProcesoInfo();
    }
  }, [open]);

  const loadProcesoInfo = async () => {
    try {
      const info = await getProcesoFinalizacion();
      setProcesoInfo(info);
      setRequisitosConfirmados(new Array(info.requisitos.length).fill(false));
    } catch (error) {
      console.error("Error al cargar información del proceso:", error);
    }
  };

  const handleRequisitoChange = (index: number, checked: boolean) => {
    const newRequisitos = [...requisitosConfirmados];
    newRequisitos[index] = checked;
    setRequisitosConfirmados(newRequisitos);
  };

  const handleFinalizar = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      const response = await finalizarServicio({
        idSolicitud: solicitud.id,
        resumenTrabajo,
        tiempoEmpleado: tiempoEmpleado
          ? Number.parseFloat(tiempoEmpleado)
          : undefined,
        materialesUtilizados: materiales || undefined,
        recomendacionesCliente: recomendaciones || undefined,
        solicitudCalificacion: solicitarCalificacion,
      });

      if (response.success) {
        onSuccess();
        onOpenChange(false);
        resetForm();
      } else {
        console.error("Error al finalizar servicio:", response.message);
      }
    } catch (error) {
      console.error("Error al finalizar servicio:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResumenTrabajo("");
    setTiempoEmpleado("");
    setMateriales("");
    setRecomendaciones("");
    setSolicitarCalificacion(true);
    setRequisitosConfirmados([]);
    setAceptaConsecuencias(false);
  };

  const todosRequisitosConfirmados = requisitosConfirmados.every((r) => r);
  const isFormValid =
    resumenTrabajo.trim() && todosRequisitosConfirmados && aceptaConsecuencias;

  if (!procesoInfo) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="flex justify-center items-center p-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Square className="w-5 h-5 text-green-600" />
            Finalizar Servicio
          </DialogTitle>
          <DialogDescription>
            Vas a finalizar el servicio "{solicitud.servicio.titulo}" para{" "}
            <span className="font-medium">
              {solicitud.cliente.nombres} {solicitud.cliente.apellidos}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Proceso de finalización */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Proceso de Finalización
            </h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Tiempo estimado:</strong> {procesoInfo.tiempoEstimado}
              </p>
              <div>
                <strong>Pasos a seguir:</strong>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  {procesoInfo.pasos.map((paso, index) => (
                    <li key={index}>{paso}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Verificación de requisitos */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Confirma que se cumplen los requisitos:
            </h4>
            {procesoInfo.requisitos.map((requisito, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={`requisito-${index}`}
                  checked={requisitosConfirmados[index] || false}
                  onCheckedChange={(checked) =>
                    handleRequisitoChange(index, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`requisito-${index}`}
                  className="text-sm leading-5"
                >
                  {requisito}
                </Label>
              </div>
            ))}
          </div>

          {/* Detalles del trabajo */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resumen" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Resumen del trabajo realizado *
              </Label>
              <Textarea
                id="resumen"
                placeholder="Describe detalladamente el trabajo que realizaste, los problemas resueltos, etc..."
                value={resumenTrabajo}
                onChange={(e) => setResumenTrabajo(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tiempo" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Tiempo empleado (horas)
                </Label>
                <Input
                  id="tiempo"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="Ej: 2.5"
                  value={tiempoEmpleado}
                  onChange={(e) => setTiempoEmpleado(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="materiales">Materiales utilizados</Label>
                <Input
                  id="materiales"
                  placeholder="Ej: Cables, tornillos, pintura..."
                  value={materiales}
                  onChange={(e) => setMateriales(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recomendaciones">
                Recomendaciones para el cliente
              </Label>
              <Textarea
                id="recomendaciones"
                placeholder="Consejos de mantenimiento, cuidados especiales, próximas revisiones..."
                value={recomendaciones}
                onChange={(e) => setRecomendaciones(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="solicitar-calificacion"
                checked={solicitarCalificacion}
                onCheckedChange={(checked) =>
                  setSolicitarCalificacion(checked as boolean)
                }
              />
              <Label
                htmlFor="solicitar-calificacion"
                className="flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                Solicitar calificación al cliente
              </Label>
            </div>
          </div>

          {/* Consecuencias */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2">
              Consecuencias de finalizar:
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              {procesoInfo.consecuencias.map((consecuencia, index) => (
                <li key={index}>• {consecuencia}</li>
              ))}
            </ul>
          </div>

          {/* Confirmación final */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="acepta-consecuencias"
              checked={aceptaConsecuencias}
              onCheckedChange={(checked) =>
                setAceptaConsecuencias(checked as boolean)
              }
            />
            <Label htmlFor="acepta-consecuencias" className="text-sm leading-5">
              He leído y acepto las consecuencias de finalizar este servicio.
              Confirmo que el trabajo está completamente terminado.
            </Label>
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
          <Button onClick={handleFinalizar} disabled={loading || !isFormValid}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Finalizando...
              </>
            ) : (
              <>
                <Square className="w-4 h-4 mr-2" />
                Finalizar Servicio
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
