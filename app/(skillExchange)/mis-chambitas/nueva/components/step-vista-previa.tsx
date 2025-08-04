import type { ServicioFormData } from "../page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Monitor,
  Banknote,
  CreditCard,
  Globe,
  Smartphone,
} from "lucide-react";
import {
  ModalidadPagoTipo,
  ServicioModalidad,
  ServicioTipoPrecio,
} from "@/lib/constants/enums";
import { useUser } from "@/hooks/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StepVistaPreviaProps {
  formData: ServicioFormData;
}

export function StepVistaPrevia({ formData }: StepVistaPreviaProps) {
  const { user } = useUser();

  const formatearPrecio = () => {
    switch (formData.tipoPrecio) {
      case ServicioTipoPrecio.FIJO:
        return `S/ ${Number(formData.precio).toFixed(2)}`;
      case ServicioTipoPrecio.HORA:
        return `S/ ${Number(formData.precio).toFixed(2)} / hora`;
      case ServicioTipoPrecio.RANGO:
        return `S/ ${Number(formData.precioMinimo).toFixed(2)} - S/ ${Number(
          formData.precioMaximo
        ).toFixed(2)}`;
      default:
        return "Precio no definido";
    }
  };

  const habilidadesAgrupadas = formData.habilidades.reduce((acc, habilidad) => {
    const { nombreCategoria, nombreSubCategoria } = habilidad;
    if (!acc[nombreCategoria]) {
      acc[nombreCategoria] = {};
    }
    if (!acc[nombreCategoria][nombreSubCategoria]) {
      acc[nombreCategoria][nombreSubCategoria] = [];
    }
    acc[nombreCategoria][nombreSubCategoria].push(habilidad);
    return acc;
  }, {} as Record<string, Record<string, typeof formData.habilidades>>);

  const categoriasUnicas = [
    ...new Set(formData.habilidades.map((h) => h.nombreCategoria)),
  ];
  const subcategoriasUnicas = [
    ...new Set(formData.habilidades.map((h) => h.nombreSubCategoria)),
  ];

  const formatearDias = () => {
    const diasMap: Record<string, string> = {
      lunes: "Lu",
      martes: "Ma",
      miercoles: "Mi",
      jueves: "Ju",
      viernes: "Vi",
      sabado: "Sá",
      domingo: "Do",
    };
    if (formData.disponibilidad.dias.length === 7) return "Todos los días";
    if (formData.disponibilidad.dias.length === 0) return "No especificado";
    return formData.disponibilidad.dias
      .map((dia) => diasMap[dia] || dia)
      .join(", ");
  };

  const formatearModalidad = () => {
    const modalidadMap: Record<string, string> = {
      [ServicioModalidad.PRESENCIAL]: "Presencial",
      [ServicioModalidad.REMOTO]: "Remoto",
      [ServicioModalidad.MIXTO]: "Mixto",
    };
    return modalidadMap[formData.modalidad] || formData.modalidad;
  };

  const getPaymentMethodInfo = (tipo: ModalidadPagoTipo) => {
    const iconMap = {
      [ModalidadPagoTipo.YAPE]: <Smartphone className="h-4 w-4" />,
      [ModalidadPagoTipo.TARJETA]: <CreditCard className="h-4 w-4" />,
      [ModalidadPagoTipo.LINEA]: <Globe className="h-4 w-4" />,
      [ModalidadPagoTipo.EFECTIVO]: <Banknote className="h-4 w-4" />,
    };
    const nameMap = {
      [ModalidadPagoTipo.YAPE]: "Yape",
      [ModalidadPagoTipo.TARJETA]: "Transferencia",
      [ModalidadPagoTipo.LINEA]: "Pago en línea",
      [ModalidadPagoTipo.EFECTIVO]: "Efectivo",
    };
    return { icon: iconMap[tipo], name: nameMap[tipo] };
  };

  return (
    <div className="space-y-6 bg-muted/20 p-4 rounded-lg border">
      <div className="space-y-4">
        {formData.imagenes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {formData.imagenes.map((imagen, index) => (
              <div key={index} className="aspect-video relative">
                <img
                  src={
                    imagen instanceof File
                      ? URL.createObjectURL(imagen)
                      : imagen
                  }
                  alt={`Imagen de servicio ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {formData.titulo || "Título de tu servicio"}
          </h1>
          <div className="flex flex-wrap gap-2">
            {categoriasUnicas.map((categoria) => (
              <Badge key={categoria} variant="secondary">
                {categoria}
              </Badge>
            ))}
            {subcategoriasUnicas.map((subcategoria) => (
              <Badge key={subcategoria} variant="outline">
                {subcategoria}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {formData.descripcion ||
                    "Descripción detallada de tu servicio."}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Habilidades y Categorías</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(habilidadesAgrupadas).map(
                  ([categoria, subcategorias]) => (
                    <div key={categoria} className="space-y-3">
                      <h3 className="font-semibold text-lg">{categoria}</h3>
                      {Object.entries(subcategorias).map(
                        ([subcategoria, skills]) => (
                          <div
                            key={subcategoria}
                            className="pl-4 border-l-2 border-muted"
                          >
                            <h4 className="font-medium text-md">
                              {subcategoria}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {skills.map((habilidad) => (
                                <Badge key={habilidad.id} variant="outline">
                                  {habilidad.nombre}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center text-3xl font-bold text-primary">
                  {formatearPrecio()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>
                    {formData.ubicacion || "Ubicación no especificada"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>{formatearModalidad()}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Días:</strong> {formatearDias()}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Horario:</strong>{" "}
                    {formData.disponibilidad.horaInicio} -{" "}
                    {formData.disponibilidad.horaFin}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formas de Pago</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {formData.modalidadesPago.map((modalidad, index) => {
                  const { icon, name } = getPaymentMethodInfo(modalidad.tipo);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      {icon}
                      <span>{name}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.foto} alt={user?.nombres} />
                  <AvatarFallback>
                    {user?.nombres?.[0]}
                    {user?.apellidos?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">
                    {user?.nombres} {user?.apellidos}
                  </CardTitle>
                  <CardDescription>Proveedor del servicio</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
