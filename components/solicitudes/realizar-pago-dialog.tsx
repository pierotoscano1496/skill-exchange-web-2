"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { SolicitudRecibida } from "@/lib/types/api-responses";
import { useIsMobile } from "@/hooks/use-mobile";
import { Smartphone, Copy, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModalidadPagoTipo } from "@/lib/constants/enums";

interface RealizarPagoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  solicitud: SolicitudRecibida | null;
}

export function RealizarPagoDialog({
  open,
  onOpenChange,
  solicitud,
}: RealizarPagoDialogProps) {
  const isMobile = useIsMobile();
  const router = useRouter();

  if (!solicitud) return null;

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`${type} copiado al portapapeles`);
      },
      (err) => {
        toast.error("No se pudo copiar");
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleContactarProveedor = () => {
    router.push(`/mensajes`);
    onOpenChange(false);
  };

  const { servicio, costo } = solicitud;
  const { modalidadesPago } = servicio;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Realizar Pago</DialogTitle>
          <DialogDescription>
            Completa el pago de S/ {costo.toFixed(2)} para el servicio "
            {servicio.titulo}".
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <p className="text-sm text-muted-foreground">
            El proveedor ha habilitado los siguientes métodos de pago. Una vez
            realizado el pago, envía la constancia a través del chat.
          </p>

          {modalidadesPago?.map((metodo) => (
            <div key={metodo.id} className="p-4 border rounded-lg">
              <h4 className="font-semibold capitalize mb-3">{metodo.tipo}</h4>
              {metodo.tipo === ModalidadPagoTipo.YAPE &&
                metodo.numeroCelular && (
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-1 space-y-2">
                      <p className="text-sm">
                        Número de celular:{" "}
                        <span className="font-mono">
                          {metodo.numeroCelular}
                        </span>
                      </p>
                      {isMobile ? (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleCopyToClipboard(
                              metodo.numeroCelular!,
                              "Número"
                            )
                          }
                        >
                          <Smartphone className="w-4 h-4 mr-2" />
                          Copiar número y pagar en Yape
                        </Button>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Escanea el código QR desde tu app de Yape.
                        </p>
                      )}
                    </div>
                    {!isMobile && metodo.numeroCelular && (
                      <div className="p-2 border rounded-md bg-white">
                        <Image
                          src={metodo.url!}
                          alt="Yape QR Code"
                          width={120}
                          height={120}
                        />
                      </div>
                    )}
                  </div>
                )}

              {metodo.tipo === ModalidadPagoTipo.TARJETA &&
                metodo.cuentaBancaria && (
                  <div className="space-y-2">
                    <p className="text-sm">
                      Número de cuenta:{" "}
                      <span className="font-mono">{metodo.cuentaBancaria}</span>
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleCopyToClipboard(metodo.cuentaBancaria!, "Cuenta")
                      }
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar número de cuenta
                    </Button>
                  </div>
                )}

              {metodo.tipo !== ModalidadPagoTipo.YAPE &&
                metodo.tipo !== ModalidadPagoTipo.TARJETA && (
                  <div className="space-y-2">
                    <p className="text-sm">
                      Contacta al proveedor para coordinar el pago.
                    </p>
                  </div>
                )}
            </div>
          ))}
        </div>

        <DialogFooter className="sm:justify-between gap-2">
          <Button
            variant="outline"
            onClick={handleContactarProveedor}
            className="w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Enviar Constancia por Chat
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
