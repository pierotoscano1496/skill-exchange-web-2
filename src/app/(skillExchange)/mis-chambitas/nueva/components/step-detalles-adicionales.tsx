"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import type { ServicioFormData } from "../page";
import { Camera, X } from "lucide-react";
import { useRef } from "react";
import { DiaServicio } from "@/utils/types";

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
  const diasSemana: { id: DiaServicio; label: string }[] = [
    { id: "lunes", label: "Lunes" },
    { id: "martes", label: "Martes" },
    { id: "miercoles", label: "Miércoles" },
    { id: "jueves", label: "Jueves" },
    { id: "viernes", label: "Viernes" },
    { id: "sabado", label: "Sábado" },
    { id: "domingo", label: "Domingo" },
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDiaChange = (dia: DiaServicio, checked: boolean) => {
    if (checked) {
      updateFormData({
        disponibilidad: {
          ...formData.disponibilidad,
          dias: [...formData.disponibilidad.dias, dia],
        },
      });
    } else {
      updateFormData({
        disponibilidad: {
          ...formData.disponibilidad,
          dias: formData.disponibilidad.dias.filter((d) => d !== dia),
        },
      });
    }
  };

  const handleHoraChange = (tipo: "inicio" | "fin", value: string) => {
    updateFormData({
      disponibilidad: {
        ...formData.disponibilidad,
        [tipo === "inicio" ? "horaInicio" : "horaFin"]: value,
      },
    });
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const newImages: File[] = [];
    Array.from(files).forEach((file) => {
      if (validTypes.includes(file.type)) {
        newImages.push(file);
      }
    });
    if (newImages.length > 0) {
      updateFormData({
        imagenes: [...formData.imagenes, ...newImages],
      });
    }
    e.target.value = "";
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
      <div className="space-y-2">
        <Label>Disponibilidad</Label>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
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
                  <Label htmlFor={`dia-${dia.id}`} className="cursor-pointer">
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
        </div>
      </div>

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

      <div className="space-y-2">
        <Label>Modalidad del servicio</Label>
        <RadioGroup
          value={formData.modalidad}
          onValueChange={(value: "presencial" | "remoto" | "ambos") =>
            updateFormData({ modalidad: value })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="presencial" id="modalidad-presencial" />
            <Label htmlFor="modalidad-presencial">Presencial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="remoto" id="modalidad-remoto" />
            <Label htmlFor="modalidad-remoto">Remoto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ambos" id="modalidad-ambos" />
            <Label htmlFor="modalidad-ambos">Ambos</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Imágenes del servicio</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddImage}
          >
            <Camera className="mr-2 h-4 w-4" />
            Agregar imagen
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {formData.imagenes.map((imagen, index) => (
            <div key={index} className="relative group">
              <img
                src={
                  imagen instanceof File
                    ? URL.createObjectURL(imagen)
                    : "/placeholder.svg"
                }
                alt={`Imagen ${index + 1}`}
                className="w-full h-40 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </button>
            </div>
          ))}
        </div>
        {errors.imagenes && (
          <p className="text-sm text-red-500">{errors.imagenes}</p>
        )}
      </div>
    </div>
  );
}
