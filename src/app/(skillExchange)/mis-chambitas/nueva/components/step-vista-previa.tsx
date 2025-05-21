import type { ServicioFormData } from "../page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Monitor,
  User,
} from "lucide-react";

interface StepVistaPreviaProps {
  formData: ServicioFormData;
}

export function StepVistaPrevia({ formData }: StepVistaPreviaProps) {
  // Función para formatear el precio según el tipo
  const formatearPrecio = () => {
    if (formData.tipoPrecio === "fijo") {
      return `$${formData.precio}`;
    } else if (formData.tipoPrecio === "hora") {
      return `$${formData.precio}/hora`;
    } else {
      return `$${formData.precioMinimo} - $${formData.precioMaximo}`;
    }
  };

  // Función para obtener el nombre de la categoría
  const obtenerNombreCategoria = () => {
    const categories = [
      { id: "tech", name: "Tecnología" },
      { id: "home", name: "Hogar" },
      { id: "education", name: "Educación" },
    ];
    return (
      categories.find((cat) => cat.id === formData.categoria)?.name ||
      formData.categoria
    );
  };

  // Función para obtener el nombre de la subcategoría
  const obtenerNombreSubcategoria = () => {
    const subcategories = [
      { id: "programming", name: "Programación" },
      { id: "design", name: "Diseño" },
      { id: "hardware", name: "Hardware" },
      { id: "cleaning", name: "Limpieza" },
      { id: "gardening", name: "Jardinería" },
      { id: "repairs", name: "Reparaciones" },
      { id: "languages", name: "Idiomas" },
      { id: "tutoring", name: "Tutoría" },
      { id: "arts", name: "Artes" },
    ];
    return (
      subcategories.find((subcat) => subcat.id === formData.subcategoria)
        ?.name || formData.subcategoria
    );
  };

  // Función para formatear los días de disponibilidad
  const formatearDias = () => {
    const diasMap: Record<string, string> = {
      lunes: "Lunes",
      martes: "Martes",
      miercoles: "Miércoles",
      jueves: "Jueves",
      viernes: "Viernes",
      sabado: "Sábado",
      domingo: "Domingo",
    };

    return formData.disponibilidad.dias
      .map((dia) => diasMap[dia] || dia)
      .join(", ");
  };

  // Función para formatear la modalidad
  const formatearModalidad = () => {
    const modalidadMap: Record<string, string> = {
      presencial: "Presencial",
      remoto: "Remoto",
      ambos: "Presencial y remoto",
    };

    return modalidadMap[formData.modalidad] || formData.modalidad;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Vista previa de tu servicio</h3>
        <p className="text-sm text-muted-foreground">
          Así es como se verá tu servicio para los usuarios de Chambita
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Galería de imágenes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {formData.imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen || "/placeholder.svg"}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md border"
                />
              ))}
            </div>

            {/* Título y precio */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <h2 className="text-2xl font-bold">{formData.titulo}</h2>
              <div className="flex items-center text-xl font-semibold">
                <DollarSign className="h-5 w-5 text-primary" />
                <span>{formatearPrecio()}</span>
              </div>
            </div>

            {/* Categorización */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-primary/10">
                {obtenerNombreCategoria()}
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                {obtenerNombreSubcategoria()}
              </Badge>
              {formData.habilidades.map((habilidad) => (
                <Badge key={habilidad} variant="outline">
                  {habilidad}
                </Badge>
              ))}
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{formData.ubicacion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <span>Modalidad: {formatearModalidad()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Disponible: {formatearDias()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>
                  Horario: {formData.disponibilidad.horaInicio} -{" "}
                  {formData.disponibilidad.horaFin}
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {formData.descripcion}
              </p>
            </div>

            {/* Proveedor */}
            <div className="flex items-center gap-3 border-t pt-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">María López</p>
                <p className="text-sm text-muted-foreground">
                  Proveedor del servicio
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
