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
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { StepInformacionBasica } from "./components/step-informacion-basica";
import { StepCategorizacion } from "./components/step-categorizacion";
import { StepDetallesAdicionales } from "./components/step-detalles-adicionales";
import { StepTerminosCondiciones } from "./components/step-terminos-condiciones";
import { StepVistaPrevia } from "./components/step-vista-previa";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StepModalidadesPago } from "./components/step-modalidades-pago";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";

// Definir la interfaz para los datos del servicio
export interface ServicioFormData {
  // Información básica
  titulo: string;
  descripcion: string;
  precio: string;
  tipoPrecio: "fijo" | "hora" | "rango";
  precioMinimo?: string;
  precioMaximo?: string;

  // Categorización
  categoria: string;
  subcategoria: string;
  habilidades: string[];

  // Detalles adicionales
  disponibilidad: {
    dias: string[];
    horaInicio: string;
    horaFin: string;
  };
  ubicacion: string;
  modalidad: "presencial" | "remoto" | "ambos";
  imagenes: File[];
  modalidadesPago: {
    tipo: "yape" | "tarjeta" | "linea" | "efectivo";
    cuentaBancaria?: string;
    numeroCelular?: string;
    url?: string;
  }[];

  // Términos y condiciones
  aceptaTerminos: boolean;
}

// Datos iniciales del formulario
const initialFormData: ServicioFormData = {
  titulo: "",
  descripcion: "",
  precio: "",
  tipoPrecio: "fijo",

  categoria: "",
  subcategoria: "",
  habilidades: [],

  disponibilidad: {
    dias: [],
    horaInicio: "09:00",
    horaFin: "18:00",
  },
  ubicacion: "",
  modalidad: "presencial",
  imagenes: [],
  modalidadesPago: [],
  aceptaTerminos: false,
};

export default function NuevoServicioPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ServicioFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [usuario, setUsuario] = useState<UsuarioRegisteredResponse>();

  const totalSteps = 5;

  // Función para actualizar los datos del formulario
  const updateFormData = (data: Partial<ServicioFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Validar el paso actual
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Validar información básica
      if (!formData.titulo) {
        newErrors.titulo = "El título es requerido";
      } else if (formData.titulo.length < 5) {
        newErrors.titulo = "El título debe tener al menos 5 caracteres";
      }

      if (!formData.descripcion) {
        newErrors.descripcion = "La descripción es requerida";
      } else if (formData.descripcion.length < 20) {
        newErrors.descripcion =
          "La descripción debe tener al menos 20 caracteres";
      }

      if (formData.tipoPrecio === "fijo" && !formData.precio) {
        newErrors.precio = "El precio es requerido";
      } else if (formData.tipoPrecio === "rango") {
        if (!formData.precioMinimo) {
          newErrors.precioMinimo = "El precio mínimo es requerido";
        }
        if (!formData.precioMaximo) {
          newErrors.precioMaximo = "El precio máximo es requerido";
        }
        if (
          formData.precioMinimo &&
          formData.precioMaximo &&
          Number(formData.precioMinimo) >= Number(formData.precioMaximo)
        ) {
          newErrors.precioMaximo =
            "El precio máximo debe ser mayor que el precio mínimo";
        }
      }
    } else if (step === 2) {
      // Validar categorización
      if (!formData.categoria) {
        newErrors.categoria = "La categoría es requerida";
      }

      if (!formData.subcategoria) {
        newErrors.subcategoria = "La subcategoría es requerida";
      }

      if (formData.habilidades.length === 0) {
        newErrors.habilidades = "Debes seleccionar al menos una habilidad";
      }
    } else if (step === 3) {
      // Validar detalles adicionales
      if (formData.disponibilidad.dias.length === 0) {
        newErrors.dias = "Debes seleccionar al menos un día de disponibilidad";
      }

      if (!formData.ubicacion) {
        newErrors.ubicacion = "La ubicación es requerida";
      }

      if (formData.imagenes.length === 0) {
        newErrors.imagenes = "Debes agregar al menos una imagen";
      }
    } else if (step === 4) {
      // Validar modalidades de pago
      if (formData.modalidadesPago.length === 0) {
        newErrors.modalidadesPago =
          "Debes agregar al menos una modalidad de pago";
      } else {
        // Validar cada modalidad de pago
        formData.modalidadesPago.forEach((modalidad, index) => {
          if (modalidad.tipo === "yape" && !modalidad.numeroCelular) {
            newErrors[`modalidad_${index}_celular`] =
              "El número de celular es requerido para Yape";
          }
          if (modalidad.tipo === "tarjeta" && !modalidad.cuentaBancaria) {
            newErrors[`modalidad_${index}_cuenta`] =
              "La cuenta bancaria es requerida para tarjeta";
          }
          if (modalidad.tipo === "linea" && !modalidad.url) {
            newErrors[`modalidad_${index}_url`] =
              "La URL es requerida para pago en línea";
          }
        });
      }
    } else if (step === 5) {
      // Validar términos y condiciones
      if (!formData.aceptaTerminos) {
        newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Avanzar al siguiente paso
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        handleSubmit();
      }
    }
  };

  // Retroceder al paso anterior
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    } else {
      router.push("/mis-chambitas");
    }
  };

  // Enviar el formulario
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const body = mapFormDataToCreateServicioBody(formData, usuario);

      // Crear FormData para multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append("titulo", body.titulo);
      formDataToSend.append("descripcion", body.descripcion);
      formDataToSend.append("precio", body.precio.toString());
      formDataToSend.append("idProveedor", body.idProveedor);
      formDataToSend.append("tipoPrecio", body.tipoPrecio);
      formDataToSend.append("precioMinimo", body.precioMinimo.toString());
      formDataToSend.append("precioMaximo", body.precioMaximo.toString());
      formDataToSend.append("ubicacion", body.ubicacion);
      formDataToSend.append("modalidad", body.modalidad);
      formDataToSend.append("aceptaTerminos", body.aceptaTerminos);

      // skills
      body.skills.forEach((skill: any, idx: number) => {
        formDataToSend.append(`skills[${idx}].idSkill`, skill.idSkill);
      });

      // disponibilidades
      body.disponibilidades.forEach((disp: any, idx: number) => {
        formDataToSend.append(`disponibilidades[${idx}].dia`, disp.dia);
        formDataToSend.append(
          `disponibilidades[${idx}].horaInicio`,
          disp.horaInicio
        );
        formDataToSend.append(`disponibilidades[${idx}].horaFin`, disp.horaFin);
      });

      // modalidadesPago
      body.modalidadesPago.forEach((mod: any, idx: number) => {
        formDataToSend.append(`modalidadesPago[${idx}].tipo`, mod.tipo);
        formDataToSend.append(
          `modalidadesPago[${idx}].cuentaBancaria`,
          mod.cuentaBancaria
        );
        formDataToSend.append(
          `modalidadesPago[${idx}].numeroCelular`,
          mod.numeroCelular
        );
        formDataToSend.append(`modalidadesPago[${idx}].url`, mod.url);
      });

      // recursosMultimedia (imágenes)
      formData.imagenes.forEach((file: File) => {
        formDataToSend.append("recursosMultimedia", file);
      });

      // Previsualizar el FormData (solo para debug)
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Aquí iría la lógica para enviar los datos a la API:
      // await api.post("/servicio", formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });

      // Simulación de éxito
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);

      setTimeout(() => {
        router.push("/mis-chambitas");
      }, 2000);
    } catch (error) {
      console.error("Error al publicar el servicio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function mapFormDataToCreateServicioBody(
    formData: ServicioFormData,
    usuario: any
  ) {
    // Suponiendo que tienes el usuario logueado y su id es usuario.id
    const formDataRecursos = new FormData();
    formData.imagenes.forEach((img) => {
      formDataRecursos.append("files", img);
    });

    return {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      precio: Number(formData.precio) || 0,
      idProveedor: usuario?.id, // Debes obtener el UUID del usuario logueado
      tipoPrecio: formData.tipoPrecio,
      precioMinimo: Number(formData.precioMinimo) || 0,
      precioMaximo: Number(formData.precioMaximo) || 0,
      ubicacion: formData.ubicacion,
      modalidad: formData.modalidad === "ambos" ? "mixto" : formData.modalidad,
      aceptaTerminos: formData.aceptaTerminos,
      skills: formData.habilidades.map((idSkill: string) => ({
        idSkill, // UUID de la habilidad seleccionada
      })),
      disponibilidades: formData.disponibilidad.dias.map((dia: string) => ({
        dia,
        horaInicio: formData.disponibilidad.horaInicio,
        horaFin: formData.disponibilidad.horaFin,
      })),
      modalidadesPago: formData.modalidadesPago.map((m) => ({
        tipo: m.tipo,
        cuentaBancaria: m.cuentaBancaria || "",
        numeroCelular: m.numeroCelular || "",
        url: m.url || "",
      })),
      recursosMultimedia: formDataRecursos,
    };
  }

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepInformacionBasica
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <StepCategorizacion
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <StepDetallesAdicionales
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <StepModalidadesPago
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <StepTerminosCondiciones
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 6:
        return <StepVistaPrevia formData={formData} />;
      default:
        return null;
    }
  };

  // Obtener el título del paso actual
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Información básica";
      case 2:
        return "Categorización";
      case 3:
        return "Detalles adicionales";
      case 4:
        return "Términos y condiciones";
      case 5:
        return "Vista previa";
      default:
        return "";
    }
  };

  // Obtener la descripción del paso actual
  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Ingresa la información básica de tu servicio";
      case 2:
        return "Categoriza tu servicio para que sea más fácil de encontrar";
      case 3:
        return "Agrega detalles adicionales sobre tu servicio";
      case 4:
        return "Revisa y acepta los términos y condiciones";
      case 5:
        return "Revisa toda la información antes de publicar";
      default:
        return "";
    }
  };

  // Obtener el texto del botón de acción principal
  const getActionButtonText = () => {
    if (currentStep === totalSteps) {
      return isSubmitting ? "Publicando..." : "Publicar servicio";
    }
    return "Siguiente";
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Publicar nuevo servicio</h1>

      {success ? (
        <Card>
          <CardContent className="pt-6 pb-4 text-center">
            <div className="mx-auto bg-green-100 text-green-700 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              ¡Servicio publicado con éxito!
            </h2>
            <p className="text-muted-foreground mb-4">
              Tu servicio ha sido publicado correctamente y ya está disponible
              para que otros usuarios lo encuentren.
            </p>
            <Alert className="bg-muted border-muted-foreground/20 mb-4">
              <AlertDescription>
                Serás redirigido a la página de tus chambitas en unos
                segundos...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {currentStep}
                </div>
                <CardTitle>{getStepTitle()}</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground">
                Paso {currentStep} de {totalSteps}
              </div>
            </div>
            <CardDescription>{getStepDescription()}</CardDescription>
          </CardHeader>

          <CardContent>{renderStep()}</CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep === 1 ? "Cancelar" : "Atrás"}
            </Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {getActionButtonText()}
              {currentStep < totalSteps && (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Indicador de progreso */}
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`flex-1 ${index < totalSteps - 1 ? "mr-1" : ""}`}
            >
              <div
                className={`h-2 rounded-full ${index + 1 <= currentStep ? "bg-primary" : "bg-muted"}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Información</span>
          <span>Categorización</span>
          <span>Detalles</span>
          <span>Pagos</span>
          <span>Términos</span>
          <span>Vista previa</span>
        </div>
      </div>
    </div>
  );
}
