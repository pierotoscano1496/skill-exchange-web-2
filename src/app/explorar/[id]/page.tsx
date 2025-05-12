"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  MapPin,
  Star,
  MessageSquare,
  Share,
  Heart,
  ChevronLeft,
  CheckCircle,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Datos de ejemplo para el servicio
const serviceData = {
  id: "serv-1",
  title: "Reparación de computadoras y soporte técnico",
  description:
    "Ofrezco servicios de reparación de computadoras, laptops y dispositivos electrónicos. Soluciono problemas de hardware y software, instalación de programas, limpieza de virus, recuperación de datos y más. Servicio a domicilio o remoto según sea necesario.",
  price: "$200 - $500",
  location: "San Isidro, Lima",
  distance: "2.5 km",
  availability: ["Lunes a Viernes: 9am - 6pm", "Sábados: 10am - 2pm"],
  provider: {
    id: "prov-1",
    name: "Carlos Rodríguez",
    avatar: "/avatars/carlos.jpg",
    rating: 4.8,
    reviews: 56,
    memberSince: "Enero 2023",
    responseTime: "Menos de 1 hora",
    completedServices: 78,
    skills: [
      { name: "Reparación de PC", level: 9 },
      { name: "Soporte técnico", level: 8 },
      { name: "Instalación de software", level: 9 },
      { name: "Redes", level: 7 },
    ],
  },
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  reviews: [
    {
      id: "rev-1",
      user: {
        name: "Ana Martínez",
        avatar: "/avatars/ana.jpg",
      },
      rating: 5,
      date: "15/04/2025",
      comment:
        "Excelente servicio. Carlos arregló mi laptop que no encendía en menos de 2 horas. Muy profesional y puntual.",
    },
    {
      id: "rev-2",
      user: {
        name: "Luis Hernández",
        avatar: "/avatars/luis.jpg",
      },
      rating: 4,
      date: "02/04/2025",
      comment:
        "Buen trabajo con la instalación de programas y limpieza de virus. Recomendado para cualquier problema informático.",
    },
    {
      id: "rev-3",
      user: {
        name: "María González",
        avatar: "/avatars/maria.jpg",
      },
      rating: 5,
      date: "28/03/2025",
      comment:
        "Rápido y eficiente. Solucionó un problema que tenía con mi computadora desde hace meses. Definitivamente lo volveré a contactar.",
    },
  ],
  faqs: [
    {
      question: "¿Cuánto tiempo toma la reparación?",
      answer:
        "El tiempo de reparación depende del problema. Problemas simples como instalación de software o limpieza de virus pueden tomar de 1 a 3 horas. Problemas de hardware más complejos pueden tomar de 1 a 3 días.",
    },
    {
      question: "¿Ofreces garantía por el servicio?",
      answer:
        "Sí, todos mis servicios tienen garantía de 30 días. Si el problema persiste o aparece nuevamente dentro de ese período, realizaré la reparación sin costo adicional.",
    },
    {
      question: "¿Trabajas con todos los modelos de computadoras?",
      answer:
        "Trabajo con la mayoría de marcas y modelos de computadoras de escritorio y laptops, incluyendo Windows, Mac y Linux. También reparo tablets y algunos dispositivos móviles.",
    },
  ],
};

export default function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestDate, setRequestDate] = useState("");
  const [requestTime, setRequestTime] = useState("");
  const [requestType, setRequestType] = useState("presencial");
  const [requestDetails, setRequestDetails] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleBack = () => {
    router.push("/explorar");
  };

  const handleRequestService = () => {
    // Aquí iría la lógica para enviar la solicitud
    setRequestSuccess(true);
    setTimeout(() => {
      setIsRequestDialogOpen(false);
      setRequestSuccess(false);
      // Limpiar el formulario
      setRequestDate("");
      setRequestTime("");
      setRequestType("presencial");
      setRequestDetails("");
    }, 2000);
  };

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
                  <h1 className="text-2xl font-bold mb-2">
                    {serviceData.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span>{serviceData.provider.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{serviceData.provider.reviews} reseñas</span>
                    </div>
                    <span className="mx-1">•</span>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{serviceData.location}</span>
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
                {serviceData.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${serviceData.title} - imagen ${index + 1}`}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                ))}
              </div>

              <Tabs
                defaultValue="details"
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                  <TabsTrigger value="faqs">Preguntas</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Descripción
                      </h2>
                      <p className="text-muted-foreground">
                        {serviceData.description}
                      </p>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Disponibilidad
                      </h2>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {serviceData.availability.map((time, index) => (
                          <li key={index}>{time}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Habilidades
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {serviceData.provider.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="py-1">
                            {skill.name} - Nivel {skill.level}
                          </Badge>
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
                          {serviceData.provider.rating}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        ({serviceData.provider.reviews}{" "}
                        {serviceData.provider.reviews === 1
                          ? "reseña"
                          : "reseñas"}
                        )
                      </span>
                    </div>

                    {serviceData.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-4 last:border-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar>
                            <AvatarImage
                              src={review.user.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {review.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {review.user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {review.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="faqs" className="pt-4">
                  <div className="space-y-4">
                    {serviceData.faqs.map((faq, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
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
                  <AvatarImage
                    src={serviceData.provider.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {serviceData.provider.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-lg">
                    {serviceData.provider.name}
                  </h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span>{serviceData.provider.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{serviceData.provider.reviews} reseñas</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Miembro desde</span>
                  <span>{serviceData.provider.memberSince}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Tiempo de respuesta
                  </span>
                  <span>{serviceData.provider.responseTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Servicios completados
                  </span>
                  <span>{serviceData.provider.completedServices}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-1" />
                    <span className="font-semibold">{serviceData.price}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      A {serviceData.distance}
                    </span>
                  </div>
                </div>

                <Dialog
                  open={isRequestDialogOpen}
                  onOpenChange={setIsRequestDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full">Solicitar servicio</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Solicitar servicio</DialogTitle>
                      <DialogDescription>
                        Completa los detalles para solicitar este servicio a{" "}
                        {serviceData.provider.name}
                      </DialogDescription>
                    </DialogHeader>

                    {requestSuccess ? (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-600">
                          ¡Solicitud enviada con éxito! El prestador se pondrá
                          en contacto contigo pronto.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date">Fecha</Label>
                            <Input
                              id="date"
                              type="date"
                              value={requestDate}
                              onChange={(e) => setRequestDate(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Hora</Label>
                            <Input
                              id="time"
                              type="time"
                              value={requestTime}
                              onChange={(e) => setRequestTime(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Tipo de servicio</Label>
                          <RadioGroup
                            value={requestType}
                            onValueChange={setRequestType}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="presencial"
                                id="presencial"
                              />
                              <Label htmlFor="presencial">Presencial</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="remoto" id="remoto" />
                              <Label htmlFor="remoto">Remoto</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="details">Detalles adicionales</Label>
                          <Textarea
                            id="details"
                            placeholder="Describe tu problema o necesidad específica..."
                            value={requestDetails}
                            onChange={(e) => setRequestDetails(e.target.value)}
                          />
                        </div>

                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsRequestDialogOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={handleRequestService}>
                            Enviar solicitud
                          </Button>
                        </DialogFooter>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" /> Contactar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Servicios similares cerca</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 pb-3 border-b last:border-0 last:pb-0"
                  >
                    <img
                      src="/placeholder.svg?height=60&width=60"
                      alt="Servicio similar"
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        Soporte técnico a domicilio
                      </h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                        <span>4.{6 + item}</span>
                        <span className="mx-1">•</span>
                        <span>
                          A {item}.{item} km
                        </span>
                      </div>
                      <div className="text-sm font-medium mt-1">
                        $180 - $350
                      </div>
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
