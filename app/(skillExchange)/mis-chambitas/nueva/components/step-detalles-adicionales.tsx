"use client";
import { Label } from "@/components/ui/label";
import type React from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import type { ServicioFormData } from "../page";
import { Camera, Image as ImageIcon, X } from "lucide-react";
import { useRef } from "react";
import { ServicioDia, ServicioModalidad } from "@/lib/constants/enums";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepDetallesAdicionalesProps {
  formData: ServicioFormData;
  updateFormData: (data: Partial<ServicioFormData>) => void;
  errors: Record<string, string>;
}

export function StepDetallesAdicionales({
  formData,
  updateFormData,
  errors,
}: StepDetallesAdicionalesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const diasSemana = [
    { id: ServicioDia.LUNES, label: "Lunes" },
    { id: ServicioDia.MARTES, label: "Martes" },
    { id: ServicioDia.MIERCOLES, label: "Miércoles" },
    { id: ServicioDia.JUEVES, label: "Jueves" },
    { id: ServicioDia.VIERNES, label: "Viernes" },
    { id: ServicioDia.SABADO, label: "Sábado" },
    { id: ServicioDia.DOMINGO, label: "Domingo" },
  ];

  // Manejar cambio en los días de disponibilidad
  const handleDiaChange = (dia: ServicioDia, checked: boolean) => {
    const newDias = checked
      ? [...formData.disponibilidad.dias, dia]
      : formData.disponibilidad.dias.filter((d) => d !== dia);

    updateFormData({
      disponibilidad: { ...formData.disponibilidad, dias: newDias },
    });
  };

  // Manejar cambio en las horas de disponibilidad
  const handleHoraChange = (tipo: "inicio" | "fin", value: string) => {
    updateFormData({
      disponibilidad: {
        ...formData.disponibilidad,
        [tipo === "inicio" ? "horaInicio" : "horaFin"]: value,
      },
    });
  };

  // Manejar selección de archivos
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(
        0,
        5 - formData.imagenes.length
      ); // Limitar a 5 imágenes
      updateFormData({
        imagenes: [...formData.imagenes, ...newImages],
      });
    }
  };

  // Abrir selector de archivos
  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  // Eliminar una imagen
  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.imagenes];
    newImages.splice(index, 1);
    updateFormData({
      imagenes: newImages,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Disponibilidad</CardTitle>
          <CardDescription>
            Define cuándo y a qué horas puedes realizar el servicio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">
              Días de la semana
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {diasSemana.map((dia) => (
                <div key={dia.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dia-${dia.id}`}
                    checked={formData.disponibilidad.dias.includes(dia.id)}
                    onCheckedChange={(checked) =>
                      handleDiaChange(dia.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`dia-${dia.id}`}
                    className="cursor-pointer font-normal"
                  >
                    {dia.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.dias && (
              <p className="text-sm text-red-500 mt-1">{errors.dias}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hora-inicio">Hora de inicio</Label>
              <Input
                id="hora-inicio"
                type="time"
                value={formData.disponibilidad.horaInicio}
                onChange={(e) => handleHoraChange("inicio", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hora-fin">Hora de fin</Label>
              <Input
                id="hora-fin"
                type="time"
                value={formData.disponibilidad.horaFin}
                onChange={(e) => handleHoraChange("fin", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación y Modalidad</CardTitle>
          <CardDescription>
            Especifica dónde y cómo se realizará el trabajo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Input
              id="ubicacion"
              placeholder="Ej. San Isidro, Lima"
              value={formData.ubicacion}
              onChange={(e) => updateFormData({ ubicacion: e.target.value })}
              className={errors.ubicacion ? "border-red-500" : ""}
            />
            {errors.ubicacion && (
              <p className="text-sm text-red-500">{errors.ubicacion}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Modalidad del servicio</Label>
            <RadioGroup
              value={formData.modalidad}
              onValueChange={(value: ServicioModalidad) =>
                updateFormData({ modalidad: value })
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Label htmlFor="modalidad-presencial" className="cursor-pointer">
                <Card
                  className={cn(
                    "p-4",
                    formData.modalidad === ServicioModalidad.PRESENCIAL &&
                      "border-primary"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={ServicioModalidad.PRESENCIAL}
                      id="modalidad-presencial"
                    />
                    <p className="font-semibold">Presencial</p>
                  </div>
                </Card>
              </Label>
              <Label htmlFor="modalidad-remoto" className="cursor-pointer">
                <Card
                  className={cn(
                    "p-4",
                    formData.modalidad === ServicioModalidad.REMOTO &&
                      "border-primary"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={ServicioModalidad.REMOTO}
                      id="modalidad-remoto"
                    />
                    <p className="font-semibold">Remoto</p>
                  </div>
                </Card>
              </Label>
              <Label htmlFor="modalidad-mixto" className="cursor-pointer">
                <Card
                  className={cn(
                    "p-4",
                    formData.modalidad === ServicioModalidad.MIXTO &&
                      "border-primary"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={ServicioModalidad.MIXTO}
                      id="modalidad-mixto"
                    />
                    <p className="font-semibold">Mixto</p>
                  </div>
                </Card>
              </Label>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imágenes del Servicio</CardTitle>
          <CardDescription>
            Sube hasta 5 imágenes que muestren tu trabajo. Una buena foto vende
            más.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {formData.imagenes.map((imagen, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={
                    imagen instanceof File
                      ? URL.createObjectURL(imagen)
                      : imagen
                  }
                  alt={`Imagen de servicio ${index + 1}`}
                  className="w-full h-full object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Eliminar</span>
                </button>
              </div>
            ))}
            {formData.imagenes.length < 5 && (
              <button
                type="button"
                onClick={handleAddImage}
                className="aspect-square flex flex-col items-center justify-center w-full border-2 border-dashed rounded-md hover:bg-muted/50 transition-colors"
              >
                <Camera className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">
                  Agregar foto
                </span>
              </button>
            )}
          </div>
          {errors.imagenes && (
            <p className="text-sm text-red-500 mt-2">{errors.imagenes}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
