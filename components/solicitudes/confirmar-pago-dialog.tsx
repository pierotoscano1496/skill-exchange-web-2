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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { dataService } from "@/lib/services/data-service";
import type { SolicitudRecibida } from "@/lib/types/api-responses";
import type { ConfirmacionPago } from "@/lib/types/solicitud-updates";

interface ConfirmarPagoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  solicitud: SolicitudRecibida;
  onSuccess: () => void;
}

const metodosPago = [
  { value: "yape", label: "Yape" },
  { value: "transferencia", label: "Transferencia bancaria" },
  { value: "efectivo", label: "Efectivo" },
  { value: "tarjeta", label: "Tarjeta de crédito/débito" },
];

export function ConfirmarPagoDialog({
  open,
  onOpenChange,
  solicitud,
  onSuccess,
}: ConfirmarPagoDialogProps) {
  const [loading, setLoading] = useState(false);
  const [confirmacionInfo, setConfirmacionInfo] =
    useState<ConfirmacionPago | null>(null);
  const [metodoPago, setMetodoPago] = useState<string>("");
  const [montoRecibido, setMontoRecibido] = useState<string>(
    solicitud.costo.toString()
  );
  const [comprobante, setComprobante] = useState("");
  const [notas, setNotas] = useState("");
  const [verificacionesConfirmadas, setVerificacionesConfirmadas] = useState<
    boolean[]
  >([]);
  const [aceptaResponsabilidad, setAceptaResponsabilidad] = useState(false);

  useEffect(() => {
    if (open) {
      loadConfirmacionInfo();
    }
  }, [open]);

  const loadConfirmacionInfo = async () => {
    try {
      const info = await dataService.getConfirmacionPago();
      setConfirmacionInfo(info);
      setVerificacionesConfirmadas(
        new Array(info.verificaciones.length).fill(false)
      );
    } catch (error) {
      console.error("Error al cargar información de confirmación:", error);
    }
  };

  const handleVerificacionChange = (index: number, checked: boolean) => {
    const newVerificaciones = [...verificacionesConfirmadas];
    newVerificaciones[index] = checked;
    setVerificacionesConfirmadas(newVerificaciones);
  };

  const handleConfirmar = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      const response = await dataService.confirmarPago({
        idSolicitud: solicitud.id,
        metodoPagoRecibido: metodoPago as any,
        montoRecibido: Number.parseFloat(montoRecibido),
        comprobantePago: comprobante || undefined,
        notasProveedor: notas || undefined,
      });

      if (response.success) {
        onSuccess();
        onOpenChange(false);
        // Reset form
        resetForm();
      } else {
        console.error("Error al confirmar pago:", response.message);
      }
    } catch (error) {
      console.error("Error al confirmar pago:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setMetodoPago("");
    setMontoRecibido(solicitud.costo.toString());
    setComprobante("");
    setNotas("");
    setVerificacionesConfirmadas([]);
    setAceptaResponsabilidad(false);
  };

  const todasVerificacionesConfirmadas = verificacionesConfirmadas.every(
    (v) => v
  );
  const isFormValid =
    metodoPago &&
    montoRecibido &&
    todasVerificacionesConfirmadas &&
    aceptaResponsabilidad;

  if (!confirmacionInfo) {
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Confirmar Pago Recibido
          </DialogTitle>
          <DialogDescription>
            Confirma que has recibido el pago de{" "}
            <span className="font-medium">
              {solicitud.cliente.nombres} {solicitud.cliente.apellidos}
            </span>{" "}
            por S/ {solicitud.costo.toFixed(2)}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mensaje informativo */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">
                  Antes de continuar
                </h4>
                <p className="text-sm text-blue-800">
                  {confirmacionInfo.mensaje}
                </p>
              </div>
            </div>
          </div>

          {/* Verificaciones */}
          <div className="space-y-3">
            <h4 className="font-medium">Verificaciones requeridas:</h4>
            {confirmacionInfo.verificaciones.map((verificacion, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Checkbox
                  id={`verificacion-${index}`}
                  checked={verificacionesConfirmadas[index] || false}
                  onCheckedChange={(checked) =>
                    handleVerificacionChange(index, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`verificacion-${index}`}
                  className="text-sm leading-5"
                >
                  {verificacion}
                </Label>
              </div>
            ))}
          </div>

          {/* Detalles del pago */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="metodo-pago">Método de pago recibido *</Label>
              <Select value={metodoPago} onValueChange={setMetodoPago}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el método" />
                </SelectTrigger>
                <SelectContent>
                  {metodosPago.map((metodo) => (
                    <SelectItem key={metodo.value} value={metodo.value}>
                      {metodo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monto">Monto recibido (S/) *</Label>
              <Input
                id="monto"
                type="number"
                step="0.01"
                min="0"
                value={montoRecibido}
                onChange={(e) => setMontoRecibido(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comprobante">
              Número de comprobante/referencia (opcional)
            </Label>
            <Input
              id="comprobante"
              placeholder="Ej: Número de operación, código de transacción..."
              value={comprobante}
              onChange={(e) => setComprobante(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas">Notas adicionales (opcional)</Label>
            <Textarea
              id="notas"
              placeholder="Cualquier información adicional sobre el pago..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={2}
            />
          </div>

          {/* Advertencias */}
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2">
              Advertencias importantes:
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              {confirmacionInfo.advertencias.map((advertencia, index) => (
                <li key={index}>• {advertencia}</li>
              ))}
            </ul>
          </div>

          {/* Confirmación final */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="acepta-responsabilidad"
              checked={aceptaResponsabilidad}
              onCheckedChange={(checked) =>
                setAceptaResponsabilidad(checked as boolean)
              }
            />
            <Label
              htmlFor="acepta-responsabilidad"
              className="text-sm leading-5"
            >
              Confirmo que he recibido el pago completo y me comprometo a
              realizar el servicio acordado.
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
          <Button onClick={handleConfirmar} disabled={loading || !isFormValid}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Confirmando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar Pago
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
