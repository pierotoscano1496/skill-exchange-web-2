"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { UsuarioTipoDocumento } from "@/lib/constants/enums";
import { checkUserExists } from "@/lib/actions/data";

export default function RegisterStep1Page() {
  const router = useRouter();
  const [tipoDocumento, setTipoDocumento] = useState<UsuarioTipoDocumento>(
    UsuarioTipoDocumento.DNI
  );
  const [documentNumber, setDocumentNumber] = useState<string>("");
  const [nombres, setNombres] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [introduccion, setIntroduccion] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setFechaNacimiento(value);
  };

  const validateForm = async () => {
    const newErrors: Record<string, string> = {};

    if (!documentNumber) {
      newErrors.documentNumber = "El número de documento es requerido";
    } else if (tipoDocumento === "dni" && documentNumber.length !== 8) {
      newErrors.documentNumber = "El DNI debe tener 8 dígitos";
    } else if (
      tipoDocumento === "carnet_extranjeria" &&
      documentNumber.length < 8
    ) {
      newErrors.documentNumber =
        "El carné de extranjería debe tener al menos 8 caracteres";
    }

    if (!nombres) {
      newErrors.nombres = "El nombre es requerido";
    }

    if (!apellidos) {
      newErrors.apellidos = "Los apellidos son requeridos";
    }

    if (!fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
    } else {
      const parts = fechaNacimiento.split("/");
      if (
        parts.length !== 3 ||
        parts[0].length !== 2 ||
        parts[1].length !== 2 ||
        parts[2].length !== 4
      ) {
        newErrors.fechaNacimiento = "El formato debe ser dd/mm/yyyy";
      } else {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        const dateObj = new Date(year, month, day);

        if (
          isNaN(dateObj.getTime()) ||
          dateObj.getDate() !== day ||
          dateObj.getMonth() !== month ||
          dateObj.getFullYear() !== year
        ) {
          newErrors.fechaNacimiento = "La fecha no es válida.";
        } else {
          const today = new Date();
          let age = today.getFullYear() - dateObj.getFullYear();
          const m = today.getMonth() - dateObj.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dateObj.getDate())) {
            age--;
          }
          if (age < 18) {
            newErrors.fechaNacimiento = "Debes ser mayor de 18 años";
          }
        }
      }
    }

    if (!introduccion) {
      newErrors.introduccion = "La descripción es requerida";
    } else if (introduccion.length < 10) {
      newErrors.introduccion =
        "La descripción debe tener al menos 10 caracteres";
    }

    const usuarioIsRegistered = await checkUserExists(
      tipoDocumento,
      documentNumber
    );
    if (usuarioIsRegistered.success && usuarioIsRegistered.data) {
      newErrors.documentNumber = "El usuario ya está registrado";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (await validateForm()) {
      const parts = fechaNacimiento.split("/");
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          tipoDocumento,
          carnetExtranjeria:
            tipoDocumento == "carnet_extranjeria" ? documentNumber : "",
          dni: tipoDocumento == "dni" ? documentNumber : "",
          nombres,
          apellidos,
          fechaNacimiento: formattedDate,
          introduccion,
        })
      );
      router.push("/register/step-2");
    }
  };

  const handleBack = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                1
              </div>
              <CardTitle>Datos personales</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Paso 1 de 3</div>
          </div>
          <CardDescription>
            Ingresa tus datos personales para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de documento</Label>
            <RadioGroup
              defaultValue={UsuarioTipoDocumento.DNI}
              value={tipoDocumento}
              onValueChange={(type: UsuarioTipoDocumento) => {
                setTipoDocumento(type);
                setDocumentNumber("");
              }}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={UsuarioTipoDocumento.DNI}
                  id={UsuarioTipoDocumento.DNI}
                />
                <Label
                  htmlFor={UsuarioTipoDocumento.DNI}
                  className="cursor-pointer"
                >
                  DNI
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={UsuarioTipoDocumento.CARNET_EXTRANJERIA}
                  id={UsuarioTipoDocumento.CARNET_EXTRANJERIA}
                />
                <Label
                  htmlFor={UsuarioTipoDocumento.CARNET_EXTRANJERIA}
                  className="cursor-pointer"
                >
                  Carné de extranjería
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-number">Número de documento</Label>
            <Input
              id="document-number"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder={tipoDocumento === "dni" ? "12345678" : "CE123456"}
              className={errors.documentNumber ? "border-red-500" : ""}
              maxLength={tipoDocumento === "dni" ? 8 : 12}
            />
            {errors.documentNumber && (
              <p className="text-sm text-red-500">{errors.documentNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="first-name">Nombres</Label>
            <Input
              id="first-name"
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              placeholder="Ingresa tus nombres"
              className={errors.nombres ? "border-red-500" : ""}
            />
            {errors.nombres && (
              <p className="text-sm text-red-500">{errors.nombres}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name">Apellidos</Label>
            <Input
              id="last-name"
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              placeholder="Ingresa tus apellidos"
              className={errors.apellidos ? "border-red-500" : ""}
            />
            {errors.apellidos && (
              <p className="text-sm text-red-500">{errors.apellidos}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth-date">Fecha de nacimiento</Label>
            <Input
              id="birth-date"
              type="text"
              value={fechaNacimiento}
              onChange={handleDateChange}
              placeholder="dd/mm/yyyy"
              className={errors.fechaNacimiento ? "border-red-500" : ""}
            />
            {errors.fechaNacimiento && (
              <p className="text-sm text-red-500">{errors.fechaNacimiento}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="introduccion">Cuéntanos sobre ti</Label>
            <Textarea
              id="introduccion"
              value={introduccion}
              onChange={(e) => setIntroduccion(e.target.value)}
              placeholder="Describe brevemente quién eres, tus intereses y qué te motiva a unirte a Chambita..."
              className={errors.introduccion ? "border-red-500" : ""}
              rows={4}
            />
            {errors.introduccion && (
              <p className="text-sm text-red-500">{errors.introduccion}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
          <Button onClick={handleNext}>
            Siguiente <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
