"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, DollarSign, CheckCircle, XCircle, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Tipos para los servicios
type ServiceStatus = "solicitado" | "pendiente_pago" | "en_proceso" | "rechazado" | "finalizado"

interface Service {
  id: string
  title: string
  description: string
  price: string
  status: ServiceStatus
  date: string
  time: string
  client?: {
    name: string
    avatar?: string
    rating: number
  }
  provider?: {
    name: string
    avatar?: string
    rating: number
  }
}

// Datos de ejemplo
const providerServices: Service[] = [
  {
    id: "serv-1",
    title: "Reparación de computadora",
    description: "Reparación de laptop que no enciende, posible problema de fuente de poder",
    price: "$350",
    status: "solicitado",
    date: "15/05/2025",
    time: "10:00 AM",
    client: {
      name: "Carlos Rodríguez",
      avatar: "/avatars/carlos.jpg",
      rating: 4.8,
    },
  },
  {
    id: "serv-2",
    title: "Instalación de software",
    description: "Instalación de paquete de diseño gráfico y configuración inicial",
    price: "$200",
    status: "pendiente_pago",
    date: "16/05/2025",
    time: "3:30 PM",
    client: {
      name: "Ana Martínez",
      avatar: "/avatars/ana.jpg",
      rating: 4.9,
    },
  },
  {
    id: "serv-3",
    title: "Limpieza de virus",
    description: "Eliminación de malware y optimización del sistema",
    price: "$280",
    status: "en_proceso",
    date: "14/05/2025",
    time: "2:00 PM",
    client: {
      name: "Luis Hernández",
      avatar: "/avatars/luis.jpg",
      rating: 4.7,
    },
  },
  {
    id: "serv-4",
    title: "Recuperación de datos",
    description: "Recuperación de archivos de disco duro dañado",
    price: "$500",
    status: "rechazado",
    date: "10/05/2025",
    time: "11:30 AM",
    client: {
      name: "María González",
      avatar: "/avatars/maria.jpg",
      rating: 4.5,
    },
  },
  {
    id: "serv-5",
    title: "Configuración de red",
    description: "Instalación y configuración de router y red doméstica",
    price: "$250",
    status: "finalizado",
    date: "05/05/2025",
    time: "4:00 PM",
    client: {
      name: "Roberto Gómez",
      avatar: "/avatars/roberto.jpg",
      rating: 4.6,
    },
  },
]

const clientServices: Service[] = [
  {
    id: "serv-6",
    title: "Clases de guitarra",
    description: "Clases particulares para principiantes, 1 hora semanal",
    price: "$150/hora",
    status: "solicitado",
    date: "17/05/2025",
    time: "5:00 PM",
    provider: {
      name: "Pedro Sánchez",
      avatar: "/avatars/pedro.jpg",
      rating: 4.9,
    },
  },
  {
    id: "serv-7",
    title: "Paseo de perros",
    description: "Paseo diario de lunes a viernes, 1 hora por día",
    price: "$100/día",
    status: "pendiente_pago",
    date: "18/05/2025",
    time: "9:00 AM",
    provider: {
      name: "Laura Torres",
      avatar: "/avatars/laura.jpg",
      rating: 4.8,
    },
  },
  {
    id: "serv-8",
    title: "Jardinería",
    description: "Mantenimiento mensual de jardín, incluye poda y fertilización",
    price: "$400",
    status: "en_proceso",
    date: "12/05/2025",
    time: "10:00 AM",
    provider: {
      name: "Miguel Ramírez",
      avatar: "/avatars/miguel.jpg",
      rating: 4.7,
    },
  },
  {
    id: "serv-9",
    title: "Plomería",
    description: "Reparación de fuga en baño principal",
    price: "$300",
    status: "rechazado",
    date: "08/05/2025",
    time: "3:00 PM",
    provider: {
      name: "Sofía Pérez",
      avatar: "/avatars/sofia.jpg",
      rating: 4.6,
    },
  },
  {
    id: "serv-10",
    title: "Corte de cabello",
    description: "Corte y peinado a domicilio",
    price: "$180",
    status: "finalizado",
    date: "03/05/2025",
    time: "11:00 AM",
    provider: {
      name: "Javier Méndez",
      avatar: "/avatars/javier.jpg",
      rating: 4.9,
    },
  },
]

// Componente para mostrar el estado con un badge
const StatusBadge = ({ status }: { status: ServiceStatus }) => {
  switch (status) {
    case "solicitado":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
          Solicitado
        </Badge>
      )
    case "pendiente_pago":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
          Pendiente de pago
        </Badge>
      )
    case "en_proceso":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
          En proceso
        </Badge>
      )
    case "rechazado":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
          Rechazado
        </Badge>
      )
    case "finalizado":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
          Finalizado
        </Badge>
      )
    default:
      return null
  }
}

// Componente para el formulario de pago
const PaymentForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="payment-method">Método de pago</Label>
        <RadioGroup defaultValue="efectivo" id="payment-method">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="efectivo" id="efectivo" />
            <Label htmlFor="efectivo">Efectivo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="transferencia" id="transferencia" />
            <Label htmlFor="transferencia">Transferencia bancaria</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tarjeta" id="tarjeta" />
            <Label htmlFor="tarjeta">Tarjeta de crédito/débito</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment-details">Detalles adicionales</Label>
        <Textarea id="payment-details" placeholder="Información adicional sobre el pago..." />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose}>Confirmar pago</Button>
      </DialogFooter>
    </div>
  )
}

// Componente para el formulario de rechazo
const RejectForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reject-reason">Motivo del rechazo</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un motivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-disponible">No estoy disponible en esa fecha/hora</SelectItem>
            <SelectItem value="fuera-area">Fuera de mi área de servicio</SelectItem>
            <SelectItem value="precio">El precio no es adecuado</SelectItem>
            <SelectItem value="otro">Otro motivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reject-details">Detalles adicionales</Label>
        <Textarea id="reject-details" placeholder="Explica el motivo del rechazo..." />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={onClose}>
          Confirmar rechazo
        </Button>
      </DialogFooter>
    </div>
  )
}

// Componente para el formulario de finalización
const CompleteForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="complete-details">Detalles de finalización</Label>
        <Textarea id="complete-details" placeholder="Describe cómo se completó el servicio..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="complete-feedback">Retroalimentación para el cliente</Label>
        <Textarea id="complete-feedback" placeholder="Comparte tu experiencia con el cliente..." />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onClose}>Confirmar finalización</Button>
      </DialogFooter>
    </div>
  )
}

// Componente principal de la página
export default function ContractedServicesPage() {
  const [activeRole, setActiveRole] = useState<"provider" | "client">("provider")
  const [activeTab, setActiveTab] = useState<"tracking" | "completed">("tracking")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false)

  // Filtrar servicios según el estado y la pestaña activa
  const getFilteredProviderServices = () => {
    if (activeTab === "tracking") {
      return providerServices.filter((service) =>
        ["solicitado", "pendiente_pago", "en_proceso"].includes(service.status),
      )
    } else {
      return providerServices.filter((service) => ["rechazado", "finalizado"].includes(service.status))
    }
  }

  const getFilteredClientServices = () => {
    if (activeTab === "tracking") {
      return clientServices.filter((service) => ["solicitado", "pendiente_pago", "en_proceso"].includes(service.status))
    } else {
      return clientServices.filter((service) => ["rechazado", "finalizado"].includes(service.status))
    }
  }

  // Renderizar acciones según el estado del servicio
  const renderProviderActions = (service: Service) => {
    switch (service.status) {
      case "solicitado":
        return (
          <div className="flex gap-2">
            <Button size="sm">Aprobar</Button>
            <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Rechazar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rechazar solicitud</DialogTitle>
                  <DialogDescription>
                    Por favor, indica el motivo por el cual rechazas esta solicitud.
                  </DialogDescription>
                </DialogHeader>
                <RejectForm onClose={() => setIsRejectDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        )
      case "pendiente_pago":
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Recordar pago
            </Button>
          </div>
        )
      case "en_proceso":
        return (
          <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Finalizar servicio</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Finalizar servicio</DialogTitle>
                <DialogDescription>
                  Confirma que has completado el servicio y proporciona detalles adicionales.
                </DialogDescription>
              </DialogHeader>
              <CompleteForm onClose={() => setIsCompleteDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        )
      default:
        return null
    }
  }

  const renderClientActions = (service: Service) => {
    switch (service.status) {
      case "solicitado":
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Cancelar solicitud
            </Button>
          </div>
        )
      case "pendiente_pago":
        return (
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Realizar pago</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Realizar pago</DialogTitle>
                <DialogDescription>
                  Selecciona el método de pago y proporciona los detalles necesarios.
                </DialogDescription>
              </DialogHeader>
              <PaymentForm onClose={() => setIsPaymentDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        )
      case "en_proceso":
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Ver progreso
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Mis Chambitas Contratadas</h1>
      <p className="text-muted-foreground">Gestiona los servicios que ofreces y contratas.</p>

      {/* Selector de rol */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Card
          className={`flex-1 cursor-pointer transition-all ${activeRole === "provider" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setActiveRole("provider")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Como prestador de servicios</h3>
              <p className="text-sm text-muted-foreground">Gestiona los servicios que ofreces a tus clientes</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`flex-1 cursor-pointer transition-all ${activeRole === "client" ? "ring-2 ring-primary" : ""}`}
          onClick={() => setActiveRole("client")}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Como cliente</h3>
              <p className="text-sm text-muted-foreground">Gestiona los servicios que has contratado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas para filtrar por estado */}
      <Tabs
        defaultValue="tracking"
        className="mt-6"
        onValueChange={(value) => setActiveTab(value as "tracking" | "completed")}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tracking">En seguimiento</TabsTrigger>
          <TabsTrigger value="completed">Finalizados/Rechazados</TabsTrigger>
        </TabsList>

        {/* Contenido para el rol de prestador de servicios */}
        {activeRole === "provider" && (
          <>
            <TabsContent value="tracking" className="mt-4">
              <div className="space-y-4">
                {getFilteredProviderServices().length > 0 ? (
                  getFilteredProviderServices().map((service) => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{service.title}</CardTitle>
                          <StatusBadge status={service.status} />
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={service.client?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{service.client?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{service.client?.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-yellow-500 mr-1"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                  {service.client?.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{service.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{service.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <DollarSign className="h-4 w-4" />
                              <span>{service.price}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>{renderProviderActions(service)}</CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No tienes servicios en seguimiento actualmente.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {getFilteredProviderServices().length > 0 ? (
                  getFilteredProviderServices().map((service) => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{service.title}</CardTitle>
                          <StatusBadge status={service.status} />
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={service.client?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{service.client?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{service.client?.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-yellow-500 mr-1"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                  {service.client?.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{service.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{service.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <DollarSign className="h-4 w-4" />
                              <span>{service.price}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {service.status === "finalizado" ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-5 w-5" />
                            <span>Servicio completado exitosamente</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="h-5 w-5" />
                            <span>Servicio rechazado</span>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No tienes servicios finalizados o rechazados.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </>
        )}

        {/* Contenido para el rol de cliente */}
        {activeRole === "client" && (
          <>
            <TabsContent value="tracking" className="mt-4">
              <div className="space-y-4">
                {getFilteredClientServices().length > 0 ? (
                  getFilteredClientServices().map((service) => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{service.title}</CardTitle>
                          <StatusBadge status={service.status} />
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={service.provider?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{service.provider?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{service.provider?.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-yellow-500 mr-1"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                  {service.provider?.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{service.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{service.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <DollarSign className="h-4 w-4" />
                              <span>{service.price}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>{renderClientActions(service)}</CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">
                        No tienes servicios contratados en seguimiento actualmente.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {getFilteredClientServices().length > 0 ? (
                  getFilteredClientServices().map((service) => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{service.title}</CardTitle>
                          <StatusBadge status={service.status} />
                        </div>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={service.provider?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{service.provider?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{service.provider?.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="text-yellow-500 mr-1"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                  {service.provider?.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{service.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{service.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium">
                              <DollarSign className="h-4 w-4" />
                              <span>{service.price}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {service.status === "finalizado" ? (
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              Dejar reseña
                            </Button>
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="h-5 w-5" />
                              <span>Servicio completado</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="h-5 w-5" />
                            <span>Servicio rechazado por el prestador</span>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">No tienes servicios finalizados o rechazados.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
