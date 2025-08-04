"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ServicioFormData } from "../page";
import {
  CreditCard,
  Smartphone,
  Globe,
  Banknote,
  Plus,
  Trash2,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalidadPagoTipo } from "@/lib/constants/enums";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepModalidadesPagoProps {
  formData: ServicioFormData;
  updateFormData: (data: Partial<ServicioFormData>) => void;
  errors: Record<string, string>;
}

interface ModalidadPago {
  tipo: ModalidadPagoTipo;
  cuentaBancaria?: string;
  numeroCelular?: string;
  url?: string;
  imagen?: File | string;
}

const tiposPago = [
  {
    id: ModalidadPagoTipo.YAPE,
    nombre: "Yape",
    descripcion: "Pago móvil con Yape",
    icono: Smartphone,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: ModalidadPagoTipo.TARJETA,
    nombre: "Tarjeta",
    descripcion: "Transferencia bancaria",
    icono: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: ModalidadPagoTipo.LINEA,
    nombre: "Pago en línea",
    descripcion: "PayPal, Stripe, etc.",
    icono: Globe,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: ModalidadPagoTipo.EFECTIVO,
    nombre: "Efectivo",
    descripcion: "Pago en persona",
    icono: Banknote,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
];

export function StepModalidadesPago({
  formData,
  updateFormData,
  errors,
}: StepModalidadesPagoProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nuevaModalidad, setNuevaModalidad] = useState<ModalidadPago>({
    tipo: ModalidadPagoTipo.YAPE,
  });
  const [erroresModalidad, setErroresModalidad] = useState<
    Record<string, string>
  >({});

  const validarNuevaModalidad = (): boolean => {
    const errores: Record<string, string> = {};
    const yaExiste = formData.modalidadesPago.some(
      (m) => m.tipo === nuevaModalidad.tipo
    );
    if (yaExiste) {
      errores.tipo = "Ya has agregado esta modalidad de pago.";
    }

    if (nuevaModalidad.tipo === ModalidadPagoTipo.YAPE) {
      if (!nuevaModalidad.numeroCelular) {
        errores.numeroCelular = "El número de celular es requerido.";
      } else if (!/^9\d{8}$/.test(nuevaModalidad.numeroCelular)) {
        errores.numeroCelular =
          "Ingresa un número de celular válido (9 dígitos, empezando con 9).";
      }
    } else if (nuevaModalidad.tipo === ModalidadPagoTipo.TARJETA) {
      if (!nuevaModalidad.cuentaBancaria) {
        errores.cuentaBancaria = "La cuenta bancaria es requerida.";
      } else if (nuevaModalidad.cuentaBancaria.length < 10) {
        errores.cuentaBancaria =
          "La cuenta bancaria debe tener al menos 10 caracteres.";
      }
    } else if (nuevaModalidad.tipo === ModalidadPagoTipo.LINEA) {
      if (!nuevaModalidad.url) {
        errores.url = "La URL del proveedor es requerida.";
      } else if (!/^https?:\/\/.+/.test(nuevaModalidad.url)) {
        errores.url =
          "Ingresa una URL válida (debe empezar con http:// o https://).";
      }
    }

    setErroresModalidad(errores);
    return Object.keys(errores).length === 0;
  };

  const agregarModalidad = () => {
    if (validarNuevaModalidad()) {
      updateFormData({
        modalidadesPago: [...formData.modalidadesPago, nuevaModalidad],
      });
      setNuevaModalidad({ tipo: ModalidadPagoTipo.YAPE });
      setErroresModalidad({});
      setIsDialogOpen(false);
    }
  };

  const eliminarModalidad = (index: number) => {
    updateFormData({
      modalidadesPago: formData.modalidadesPago.filter((_, i) => i !== index),
    });
  };

  const obtenerConfigTipo = (tipo: string) =>
    tiposPago.find((t) => t.id === tipo) || tiposPago[0];

  const formatearInfoModalidad = (modalidad: ModalidadPago) => {
    switch (modalidad.tipo) {
      case ModalidadPagoTipo.YAPE:
        return `Celular: ${modalidad.numeroCelular}`;
      case ModalidadPagoTipo.TARJETA:
        return `Cuenta: ***${modalidad.cuentaBancaria?.slice(-4)}`;
      case ModalidadPagoTipo.LINEA:
        return `URL: ${modalidad.url}`;
      case ModalidadPagoTipo.EFECTIVO:
        return "Pago al momento del servicio";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Modalidades de pago</CardTitle>
              <CardDescription>
                Configura las formas de pago que aceptas para tu servicio.
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar modalidad de pago</DialogTitle>
                  <DialogDescription>
                    Configura una nueva forma de pago para tu servicio.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-pago">Tipo de pago</Label>
                    <Select
                      value={nuevaModalidad.tipo}
                      onValueChange={(value: ModalidadPagoTipo) =>
                        setNuevaModalidad({ tipo: value })
                      }
                    >
                      <SelectTrigger
                        id="tipo-pago"
                        className={
                          erroresModalidad.tipo ? "border-red-500" : ""
                        }
                      >
                        <SelectValue placeholder="Selecciona un tipo de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposPago.map((tipo) => (
                          <SelectItem key={tipo.id} value={tipo.id}>
                            <div className="flex items-center gap-2">
                              <tipo.icono className={`h-4 w-4 ${tipo.color}`} />
                              <span>{tipo.nombre}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {erroresModalidad.tipo && (
                      <p className="text-sm text-red-500">
                        {erroresModalidad.tipo}
                      </p>
                    )}
                  </div>

                  {nuevaModalidad.tipo === ModalidadPagoTipo.YAPE && (
                    <div className="space-y-2">
                      <Label htmlFor="numero-celular">Número de celular</Label>
                      <Input
                        id="numero-celular"
                        placeholder="987654321"
                        value={nuevaModalidad.numeroCelular || ""}
                        onChange={(e) =>
                          setNuevaModalidad({
                            ...nuevaModalidad,
                            numeroCelular: e.target.value,
                          })
                        }
                        className={
                          erroresModalidad.numeroCelular ? "border-red-500" : ""
                        }
                      />
                      {erroresModalidad.numeroCelular && (
                        <p className="text-sm text-red-500">
                          {erroresModalidad.numeroCelular}
                        </p>
                      )}
                    </div>
                  )}

                  {nuevaModalidad.tipo === ModalidadPagoTipo.TARJETA && (
                    <div className="space-y-2">
                      <Label htmlFor="cuenta-bancaria">Cuenta bancaria</Label>
                      <Input
                        id="cuenta-bancaria"
                        placeholder="1234567890123456"
                        value={nuevaModalidad.cuentaBancaria || ""}
                        onChange={(e) =>
                          setNuevaModalidad({
                            ...nuevaModalidad,
                            cuentaBancaria: e.target.value,
                          })
                        }
                        className={
                          erroresModalidad.cuentaBancaria
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {erroresModalidad.cuentaBancaria && (
                        <p className="text-sm text-red-500">
                          {erroresModalidad.cuentaBancaria}
                        </p>
                      )}
                    </div>
                  )}

                  {nuevaModalidad.tipo === ModalidadPagoTipo.LINEA && (
                    <div className="space-y-2">
                      <Label htmlFor="url-proveedor">URL del proveedor</Label>
                      <Input
                        id="url-proveedor"
                        placeholder="https://paypal.me/tuusuario"
                        value={nuevaModalidad.url || ""}
                        onChange={(e) =>
                          setNuevaModalidad({
                            ...nuevaModalidad,
                            url: e.target.value,
                          })
                        }
                        className={erroresModalidad.url ? "border-red-500" : ""}
                      />
                      {erroresModalidad.url && (
                        <p className="text-sm text-red-500">
                          {erroresModalidad.url}
                        </p>
                      )}
                    </div>
                  )}

                  {nuevaModalidad.tipo === ModalidadPagoTipo.EFECTIVO && (
                    <div className="p-4 bg-muted/50 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        El pago en efectivo se realizará al momento de prestar
                        el servicio. No se requieren datos adicionales.
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={agregarModalidad}>Agregar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {errors.modalidadesPago && (
            <p className="text-sm text-red-500 mt-2">
              {errors.modalidadesPago}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {formData.modalidadesPago.length > 0 ? (
            <div className="space-y-4">
              {formData.modalidadesPago.map((modalidad, index) => {
                const config = obtenerConfigTipo(modalidad.tipo);
                return (
                  <Card key={index} className="bg-muted/30">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${config.bgColor}`}>
                          <config.icono className={`h-6 w-6 ${config.color}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{config.nombre}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatearInfoModalidad(modalidad)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => eliminarModalidad(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar modalidad</span>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-6 border-2 border-dashed rounded-lg">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">
                No has agregado modalidades de pago
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega al menos una forma de pago para que los clientes puedan
                contratarte.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Chambita cobra una comisión del 10% por cada transacción completada a
          través de la plataforma. Los pagos se procesarán de forma segura.
        </AlertDescription>
      </Alert>
    </div>
  );
}
