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
import {
  transformarDisponibilidades,
  type ServicioRequestBody,
} from "@/lib/api/servicio-api";
import {
  ModalidadPagoTipo,
  type ServicioDia,
  ServicioModalidad,
  ServicioTipoPrecio,
} from "@/lib/constants/enums";
import { uploadFile, createServicio } from "@/lib/actions/data";
import { Stepper } from "@/components/ui/stepper";
import { useUser } from "@/hooks/use-user";

// Actualizar la interfaz para usar los enums
export interface ServicioFormData {
  // Información básica
  titulo: string;
  descripcion: string;
  precio: string;
  tipoPrecio: ServicioTipoPrecio;
  precioMinimo?: string;
  precioMaximo?: string;

  // Categorización
  habilidades: {
    id: string;
    nombre: string;
    nombreCategoria: string;
    nombreSubCategoria: string;
  }[];

  // Detalles adicionales
  disponibilidad: {
    dias: ServicioDia[];
    horaInicio: string;
    horaFin: string;
  };
  ubicacion: string;
  modalidad: ServicioModalidad;
  imagenes: (File | string)[];
  modalidadesPago: {
    tipo: ModalidadPagoTipo;
    cuentaBancaria?: string;
    numeroCelular?: string;
    url?: string;
    imagen?: File | string;
  }[];
  modalidadesPagoImagenes?: (File | string)[];
  // Términos y condiciones
  aceptaTerminos: boolean;
}

// Actualizar los datos iniciales para usar los enums
const initialFormData: ServicioFormData = {
  titulo: "",
  descripcion: "",
  precio: "",
  tipoPrecio: ServicioTipoPrecio.FIJO,

  habilidades: [],

  disponibilidad: {
    dias: [],
    horaInicio: "09:00",
    horaFin: "18:00",
  },
  ubicacion: "",
  modalidad: ServicioModalidad.PRESENCIAL,
  imagenes: [],
  modalidadesPago: [],

  aceptaTerminos: false,
};

const stepsConfig = [
  { label: "Información" },
  { label: "Categorización" },
  { label: "Detalles" },
  { label: "Pagos" },
  { label: "Términos" },
  { label: "Vista previa" },
];

export default function NuevoServicioPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ServicioFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const { user, loading } = useUser();

  const totalSteps = stepsConfig.length;

  // Función para actualizar los datos del formulario
  const updateFormData = (data: Partial<ServicioFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Validar el paso actual
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
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

      if (formData.tipoPrecio === ServicioTipoPrecio.FIJO && !formData.precio) {
        newErrors.precio = "El precio es requerido";
      } else if (formData.tipoPrecio === ServicioTipoPrecio.RANGO) {
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
    } else if (step === 1) {
      if (formData.habilidades.length === 0) {
        newErrors.habilidades = "Debes seleccionar al menos una habilidad";
      }
    } else if (step === 2) {
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
    } else if (step === 3) {
      // Validar modalidades de pago
      if (formData.modalidadesPago.length === 0) {
        newErrors.modalidadesPago =
          "Debes agregar al menos una modalidad de pago";
      } else {
        // Validar cada modalidad de pago
        formData.modalidadesPago.forEach((modalidad, index) => {
          if (
            modalidad.tipo === ModalidadPagoTipo.YAPE &&
            !modalidad.numeroCelular
          ) {
            newErrors[`modalidad_${index}_celular`] =
              "El número de celular es requerido para Yape";
          }
          if (
            modalidad.tipo === ModalidadPagoTipo.TARJETA &&
            !modalidad.cuentaBancaria
          ) {
            newErrors[`modalidad_${index}_cuenta`] =
              "La cuenta bancaria es requerida para tarjeta";
          }
          if (modalidad.tipo === ModalidadPagoTipo.LINEA && !modalidad.url) {
            newErrors[`modalidad_${index}_url`] =
              "La URL es requerida para pago en línea";
          }
        });
      }
    } else if (step === 4) {
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
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        handleSubmit();
      }
    }
  };

  // Retroceder al paso anterior
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    } else {
      router.push("/mis-chambitas");
    }
  };

  // Navegar a un paso específico
  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
      setErrors({});
    } else if (validateStep(currentStep)) {
      setCurrentStep(stepIndex);
      setErrors({});
    }
  };

  // Subir archivos multimedia usando el servicio de datos
  const uploadMultimedia = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const imagen of formData.imagenes) {
      if (imagen instanceof File) {
        try {
          const response = await uploadFile(imagen);
          if (response.success) {
            uploadedUrls.push(response.data.url);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          throw new Error("Error al subir las imágenes");
        }
      } else if (typeof imagen === "string") {
        uploadedUrls.push(imagen);
      }
    }

    return uploadedUrls;
  };

  // Enviar el formulario usando el servicio de datos
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Subir archivos multimedia
      //const multimediaUrls = await uploadMultimedia();

      // Preparar el request body según la estructura de la API
      const requestBody: ServicioRequestBody = {
        data: {
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          precio: Number.parseFloat(formData.precio) || 0,
          idProveedor: user!.id,
          tipoPrecio: formData.tipoPrecio,
          precioMinimo: formData.precioMinimo
            ? Number.parseFloat(formData.precioMinimo)
            : undefined,
          precioMaximo: formData.precioMaximo
            ? Number.parseFloat(formData.precioMaximo)
            : undefined,
          ubicacion: formData.ubicacion,
          modalidad: formData.modalidad,
          aceptaTerminos: formData.aceptaTerminos,
          skills: formData.habilidades.map((habilidad) => ({
            idSkill: habilidad.id,
          })),
          disponibilidades: transformarDisponibilidades(
            formData.disponibilidad
          ),
          modalidadesPago: formData.modalidadesPago.map((modalidad) => ({
            tipo: modalidad.tipo,
            cuentaBancaria: modalidad.cuentaBancaria,
            numeroCelular: modalidad.numeroCelular,
            url: modalidad.url,
          })),
        },
        multimedia: formData.imagenes,
      };

      // Enviar usando el servicio de datos
      const response = await createServicio(requestBody);

      if (response.success) {
        setSuccess(true);
        // Redirigir después de 2 segundos
        setTimeout(() => {
          router.push("/mis-chambitas");
        }, 2000);
      } else {
        setSubmitError(response.message || "Error al crear el servicio");
      }
    } catch (error) {
      console.error("Error al publicar el servicio:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Error inesperado al crear el servicio"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar el paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepInformacionBasica
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 1:
        return (
          <StepCategorizacion
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <StepDetallesAdicionales
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <StepModalidadesPago
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <StepTerminosCondiciones
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return <StepVistaPrevia formData={formData} />;
      default:
        return null;
    }
  };

  // Obtener el título del paso actual
  const getStepTitle = () => {
    return stepsConfig[currentStep].label;
  };

  // Obtener la descripción del paso actual
  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return "Ingresa la información básica de tu servicio";
      case 1:
        return "Categoriza tu servicio para que sea más fácil de encontrar";
      case 2:
        return "Agrega detalles adicionales sobre tu servicio";
      case 3:
        return "Configura las formas de pago que aceptas";
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
    if (currentStep === totalSteps - 1) {
      return isSubmitting ? "Publicando..." : "Publicar servicio";
    }
    return "Siguiente";
  };

  const stepperSteps = stepsConfig.map((step, index) => ({
    label: step.label,
    isCompleted: index < currentStep,
    isActive: index === currentStep,
  }));

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
        <>
          <Stepper
            steps={stepperSteps}
            onStepClick={handleStepClick}
            className="mb-8"
          />
          <Card>
            <CardHeader>
              <CardTitle>{getStepTitle()}</CardTitle>
              <CardDescription>{getStepDescription()}</CardDescription>
            </CardHeader>

            <CardContent>
              {submitError && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {submitError}
                  </AlertDescription>
                </Alert>
              )}
              {renderStep()}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentStep === 0 ? "Cancelar" : "Atrás"}
              </Button>
              <Button onClick={handleNext} disabled={isSubmitting}>
                {getActionButtonText()}
                {currentStep < totalSteps - 1 && (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
