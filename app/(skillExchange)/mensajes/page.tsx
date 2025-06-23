"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, CheckCheck } from "lucide-react"

export default function MensajesBandejaPage() {
  const conversaciones = [
    {
      id: 1,
      nombre: "Carlos Mendoza",
      avatar: "/placeholder.svg?height=40&width=40",
      ultimoMensaje: "¿Podrías confirmar la hora para mañana?",
      fecha: "10:30 AM",
      noLeidos: 2,
      servicio: "Reparación de computadoras",
      estado: "activa",
    },
    {
      id: 2,
      nombre: "Ana García",
      avatar: "/placeholder.svg?height=40&width=40",
      ultimoMensaje: "Perfecto, nos vemos el sábado entonces",
      fecha: "Ayer",
      noLeidos: 0,
      servicio: "Clases de cocina",
      estado: "leida",
    },
    {
      id: 3,
      nombre: "Luis Torres",
      avatar: "/placeholder.svg?height=40&width=40",
      ultimoMensaje: "Gracias por la información",
      fecha: "2 días",
      noLeidos: 0,
      servicio: "Paseo de perros",
      estado: "leida",
    },
    {
      id: 4,
      nombre: "María Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40",
      ultimoMensaje: "¿Tienes disponibilidad para esta semana?",
      fecha: "3 días",
      noLeidos: 1,
      servicio: "Clases de guitarra",
      estado: "activa",
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Bandeja de Entrada</h1>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" />
          Nuevo mensaje
        </Button>
      </div>
      <p className="text-muted-foreground">Gestiona tus conversaciones con clientes y proveedores.</p>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar conversaciones..." className="pl-8" />
        </div>
        <Button variant="outline">Filtrar</Button>
      </div>

      <div className="grid gap-4">
        {conversaciones.map((conversacion) => (
          <Card
            key={conversacion.id}
            className={`cursor-pointer transition-colors hover:bg-muted/50 ${
              conversacion.noLeidos > 0 ? "border-primary/50 bg-primary/5" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={conversacion.avatar || "/placeholder.svg"} alt={conversacion.nombre} />
                  <AvatarFallback>
                    {conversacion.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">{conversacion.nombre}</p>
                      {conversacion.noLeidos > 0 && (
                        <Badge
                          variant="default"
                          className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                        >
                          {conversacion.noLeidos}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{conversacion.fecha}</span>
                      {conversacion.estado === "leida" && <CheckCheck className="h-3 w-3" />}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">{conversacion.servicio}</p>

                  <p className={`text-sm ${conversacion.noLeidos > 0 ? "font-medium" : "text-muted-foreground"}`}>
                    {conversacion.ultimoMensaje}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {conversaciones.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No tienes mensajes</h3>
            <p className="text-muted-foreground text-center mb-4">
              Cuando recibas mensajes de clientes interesados en tus servicios, aparecerán aquí.
            </p>
            <Button>Explorar servicios</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
