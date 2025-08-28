"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle, AlertCircle, Loader2, MessageSquare } from "lucide-react";
import { registrarMatch } from "@/lib/actions/data";
import type { ServicioDetalle } from "@/lib/types/api-responses";

interface ContactServiceFormProps {
  servicio: ServicioDetalle;
  onSuccess?: () => void;
}

export function ContactServiceForm({
  servicio,
  onSuccess,
}: ContactServiceFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [mensaje, setMensaje] = useState("");
  const [presupuesto, setPresupuesto] = useState("");

  const resetForm = () => {
    setMensaje("");
    setPresupuesto("");
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const registrarMatchHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!mensaje.trim()) {
      setError("El mensaje es requerido");
      return;
    }

    setLoading(true);
    setError(null);

    let finalMessage = mensaje.trim();
    if (presupuesto) {
      finalMessage += ` Mi presupuesto es de S/.${presupuesto}`;
    }

    try {
      const matchResponse = await registrarMatch({
        idServicio: servicio.id,
        mensaje: finalMessage,
      });

      if (matchResponse.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          if (onSuccess) {
            onSuccess();
          } else {
            router.push("/explorar");
          }
        }, 2000);
      } else {
        setError(matchResponse.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al enviar la solicitud"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Solicitar servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contactar proveedor</DialogTitle>
          <DialogDescription>
            Envía un mensaje a {servicio.proveedor.nombres}{" "}
            {servicio.proveedor.apellidos} para solicitar el servicio "
            {servicio.titulo}"
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                ¡Solicitud enviada con éxito! El proveedor se pondrá en contacto
                contigo pronto. Serás redirigido en unos segundos...
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={registrarMatchHandler} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje *</Label>
              <Textarea
                id="mensaje"
                placeholder="Describe tu necesidad, cuándo necesitas el servicio, detalles específicos, etc."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="min-h-[100px]"
                disabled={loading}
              />
              <div className="text-xs text-muted-foreground text-right">
                {mensaje.length}/500 caracteres
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="presupuesto">Presupuesto estimado (S/)</Label>
              <Input
                id="presupuesto"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                disabled={loading}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar solicitud"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
