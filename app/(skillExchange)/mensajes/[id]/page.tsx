"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DollarSign,
  MapPin,
  Star,
  MessageSquare,
  Share,
  Heart,
  ChevronLeft,
  Calendar,
  Clock,
  CreditCard,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { dataService } from "@/lib/services/data-service";
import { ContactServiceForm } from "@/components/contact-service-form";
import type {
  ServicioDetalle,
  ReviewsServicio,
  ComentarioServicio,
} from "@/lib/types/api-responses";

export default function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [isFavorite, setIsFavorite] = useState(false);

  // Estados para datos del servicio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [servicio, setServicio] = useState<ServicioDetalle | null>(null);
  const [reviews, setReviews] = useState<ReviewsServicio | null>(null);

  useEffect(() => {
    const fetchServicioData = async () => {
      try {
        setLoading(true);
        const { servicio, reviews, error } =
          await dataService.getServicioCompletoConReviews(params.id);

        if (error) {
          setError(error);
        } else {
          setServicio(servicio);
          setReviews(reviews);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el servicio"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServicioData();
  }, [params.id]);

  const handleBack = () => {
    router.push("/explorar");
  };

  // Función para formatear el precio según el tipo
  const formatPrecio = (servicio: ServicioDetalle) => {
    if (!servicio) return "";

    switch (servicio.tipoPrecio) {
      case "fijo":
        return `S/ ${servicio.precio.toFixed(2)}`;
      case "hora":
        return `S/ ${servicio.precio.toFixed(2)} / hora`;
      case "rango":
        return `S/ ${servicio.precioMinimo?.toFixed(2) || 0} - S/ ${
          servicio.precioMaximo?.toFixed(2) || 0
        }`;
      default:
        return `S/ ${servicio.precio.toFixed(2)}`;
    }
  };

  // Función para formatear la hora
  const formatHora = (hora: { hour: number; minute: number }) => {
    return `${hora.hour.toString().padStart(2, "0")}:${hora.minute
      .toString()
      .padStart(2, "0")}`;
  };

  // Función para obtener el nombre completo del proveedor
  const getNombreProveedor = (servicio: ServicioDetalle) => {
    if (!servicio?.proveedor) return "";
    return `${servicio.proveedor.nombres} ${servicio.proveedor.apellidos}`;
  };

  // Función para obtener el icono de la modalidad de pago
  const getModalidadPagoIcon = (tipo: string) => {
    switch (tipo) {
      case "yape":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> Yape
          </Badge>
        );
      case "tarjeta":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> Tarjeta
          </Badge>
        );
      case "linea":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <ExternalLink className="h-3 w-3" /> En línea
          </Badge>
        );
      case "efectivo":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" /> Efectivo
          </Badge>
        );
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg">Cargando detalles del servicio...</p>
      </div>
    );
  }

  // Si hay error, mostrar mensaje
  if (error || !servicio) {
    return (
      <div className="container mx-auto py-10">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver a explorar
        </Button>

        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error ||
              "No se pudo cargar el servicio. Por favor, intenta nuevamente."}
          </AlertDescription>
        </Alert>

        <Button onClick={handleBack}>Volver a la página de exploración</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <Button variant="ghost" onClick={handleBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" /> Volver a explorar
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{servicio.titulo}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span>
                        {reviews?.puntajePromedio.toFixed(1) ||
                          "Sin calificaciones"}
                      </span>
                      <span className="mx-1">•</span>
                      <span>{reviews?.comentarios.length || 0} reseñas</span>
                    </div>
                    <span className="mx-1">•</span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{servicio.ubicacion}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "text-red-500" : ""}
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Si hay imagen de preview, mostrarla grande */}
                {servicio.urlImagePreview ? (
                  <div className="md:col-span-3">
                    <img
                      src={servicio.urlImagePreview || "/placeholder.svg"}
                      alt={servicio.titulo}
                      className="rounded-lg w-full h-auto object-cover max-h-80"
                    />
                  </div>
                ) : (
                  // Si no hay imagen, mostrar placeholder
                  <div className="md:col-span-3">
                    <img
                      src="/placeholder.svg?height=300&width=800"
                      alt={servicio.titulo}
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>

              <Tabs
                defaultValue="details"
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                  <TabsTrigger value="provider">Proveedor</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Descripción
                      </h2>
                      <p className="text-muted-foreground">
                        {servicio.descripcion}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">Modalidad</h2>
                      <Badge variant="secondary" className="capitalize">
                        {servicio.modalidad}
                      </Badge>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Disponibilidad
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {servicio.disponibilidades.map((disp) => (
                          <div
                            key={disp.id}
                            className="flex items-center p-2 border rounded-md"
                          >
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="capitalize font-medium">
                              {disp.dia}
                            </span>
                            <Clock className="h-4 w-4 mx-2 text-muted-foreground" />
                            <span>
                              {formatHora(disp.horaInicio)} -{" "}
                              {formatHora(disp.horaFin)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Habilidades
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {servicio.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="py-1">
                            {skill.idSkill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Métodos de pago aceptados
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {servicio.modalidadesPago.map((modalidad) => (
                          <div key={modalidad.id}>
                            {getModalidadPagoIcon(modalidad.tipo)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold ml-1">
                          {reviews?.puntajePromedio.toFixed(1) || "0.0"}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        ({reviews?.comentarios.length || 0}{" "}
                        {reviews?.comentarios.length === 1
                          ? "reseña"
                          : "reseñas"}
                        )
                      </span>
                    </div>

                    {reviews && reviews.comentarios.length > 0 ? (
                      reviews.comentarios.map((review: ComentarioServicio) => (
                        <div
                          key={review.id}
                          className="border-b pb-4 last:border-0"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar>
                              <AvatarFallback>
                                {review.nombresComentarista.charAt(0)}
                                {review.apellidosComentarista.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {review.nombresComentarista}{" "}
                                {review.apellidosComentarista}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.puntaje
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">
                            {review.comentario}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No hay reseñas disponibles para este servicio.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="provider" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>
                          {servicio.proveedor.nombres.charAt(0)}
                          {servicio.proveedor.apellidos.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-lg">
                          {servicio.proveedor.nombres}{" "}
                          {servicio.proveedor.apellidos}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {servicio.proveedor.correo}
                        </p>
                      </div>
                    </div>

                    {servicio.proveedor.introduccion && (
                      <div>
                        <h3 className="font-medium mb-2">Acerca de mí</h3>
                        <p className="text-muted-foreground">
                          {servicio.proveedor.introduccion}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-medium mb-2">Redes sociales</h3>
                      <div className="flex flex-wrap gap-2">
                        {servicio.proveedor.perfilLinkedin && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={servicio.proveedor.perfilLinkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" /> LinkedIn
                            </a>
                          </Button>
                        )}
                        {servicio.proveedor.perfilFacebook && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={servicio.proveedor.perfilFacebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" /> Facebook
                            </a>
                          </Button>
                        )}
                        {servicio.proveedor.perfilInstagram && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={servicio.proveedor.perfilInstagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />{" "}
                              Instagram
                            </a>
                          </Button>
                        )}
                        {servicio.proveedor.perfilTiktok && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={servicio.proveedor.perfilTiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" /> TikTok
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {servicio.proveedor.nombres.charAt(0)}
                    {servicio.proveedor.apellidos.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-lg">
                    {getNombreProveedor(servicio)}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span>
                      {reviews?.puntajePromedio.toFixed(1) ||
                        "Sin calificaciones"}
                    </span>
                    <span className="mx-1">•</span>
                    <span>{reviews?.comentarios.length || 0} reseñas</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-1" />
                    <span className="font-semibold">
                      {formatPrecio(servicio)}
                    </span>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {servicio.modalidad}
                  </Badge>
                </div>

                <ContactServiceForm
                  servicio={servicio}
                  onSuccess={() => router.push("/explorar")}
                />

                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" /> Contactar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Métodos de pago aceptados</h3>
              <div className="space-y-2">
                {servicio.modalidadesPago.map((modalidad) => (
                  <div
                    key={modalidad.id}
                    className="flex items-center justify-between"
                  >
                    <div>{getModalidadPagoIcon(modalidad.tipo)}</div>
                    <div className="text-sm text-muted-foreground">
                      {modalidad.tipo === "yape" &&
                        modalidad.numeroCelular &&
                        `Cel: ${modalidad.numeroCelular}`}
                      {modalidad.tipo === "tarjeta" &&
                        "Tarjeta de crédito/débito"}
                      {modalidad.tipo === "linea" && "Pago en línea"}
                      {modalidad.tipo === "efectivo" && "Pago en efectivo"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Disponibilidad</h3>
              <div className="space-y-2">
                {servicio.disponibilidades.map((disp) => (
                  <div
                    key={disp.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="capitalize font-medium">{disp.dia}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatHora(disp.horaInicio)} - {formatHora(disp.horaFin)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
