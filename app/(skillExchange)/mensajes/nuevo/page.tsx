"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle,
  User,
  MessageSquare,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { chatMessagingService } from "@/lib/services/chat-messaging-service";
import {
  findStaticChatConversationByContactId,
  STATIC_CHAT_CONVERSATIONS,
} from "@/lib/data/static-data";
import { isStaticMode } from "@/lib/config/environment";
import { apiService } from "@/lib/services/api-service";

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  ultimoServicio?: string;
}

export default function NuevoMensajePage() {
  const router = useRouter();
  const [destinatario, setDestinatario] = useState<Usuario | null>(null);
  const [busquedaUsuario, setBusquedaUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [asunto, setAsunto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Cargar usuarios desde las conversaciones existentes
  useEffect(() => {
    // Extrae usuarios de las conversaciones estáticas (contacts)
    const usuariosDeConversaciones: Usuario[] = STATIC_CHAT_CONVERSATIONS.map(
      (conv) => {
        const contacto = conv.contacts[0];
        return {
          id: contacto.idContact,
          nombre: contacto.fullName,
          email: contacto.email,
          avatar: "/placeholder.svg?height=40&width=40",
        };
      }
    );

    // Agregar algunos usuarios adicionales
    const usuariosAdicionales: Usuario[] = [
      {
        id: "user-6",
        nombre: "Pedro Sánchez",
        email: "pedro.sanchez@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        ultimoServicio: "Electricidad",
      },
      {
        id: "user-7",
        nombre: "Carmen López",
        email: "carmen.lopez@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        ultimoServicio: "Diseño gráfico",
      },
    ];

    setUsuarios([...usuariosDeConversaciones, ...usuariosAdicionales]);
  }, []);

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busquedaUsuario.toLowerCase())
  );

  const handleEnviarMensaje = async () => {
    if (!destinatario) {
      setError("Debes seleccionar un destinatario");
      return;
    }

    if (!mensaje.trim()) {
      setError("El mensaje no puede estar vacío");
      return;
    }

    if (mensaje.trim().length < 5) {
      setError("El mensaje debe tener al menos 5 caracteres");
      return;
    }

    setEnviando(true);
    setError(null);

    try {
      let conversacionId: string | undefined;

      if (isStaticMode()) {
        // Buscar conversación existente o crear nueva (modo estático)
        const conversacion = findStaticChatConversationByContactId(
          destinatario.id
        );
        conversacionId = conversacion?.id;

        if (!conversacionId) {
          conversacionId = `chat-${Date.now()}`;
        }

        chatMessagingService.sendMessage(conversacionId, {
          sentBy: "user-1", // Usuario actual
          mensaje: mensaje.trim(),
        });

        setExito(true);
        setTimeout(() => {
          router.push(`/mensajes/${conversacionId}`);
        }, 2000);
      } else {
        // Lógica real: crear conversación en backend
        const resp = await apiService.createChatConversation({
          idReceptor: destinatario.id,
          mensaje: mensaje.trim(),
        });

        if (resp.success && resp.data?.id) {
          setExito(true);
          setTimeout(() => {
            router.push("/mensajes");
          }, 2000);
        } else {
          setError("No se pudo crear la conversación. Inténtalo de nuevo.");
        }
      }
    } catch (err) {
      setError("Error al enviar el mensaje. Inténtalo de nuevo.");
      console.error("Error enviando mensaje:", err);
    } finally {
      setEnviando(false);
    }
  };

  const seleccionarUsuario = (usuario: Usuario) => {
    setDestinatario(usuario);
    setBusquedaUsuario(usuario.nombre);
    setMostrarBusqueda(false);
    setError(null);
  };

  if (exito) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">¡Mensaje enviado!</h3>
            <p className="text-muted-foreground text-center mb-4">
              Tu mensaje ha sido enviado exitosamente a {destinatario?.nombre}.
              Serás redirigido a la conversación en unos segundos...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Nuevo Mensaje</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Enviar mensaje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Selector de destinatario */}
          <div className="space-y-2">
            <Label htmlFor="destinatario">Para *</Label>
            <Popover open={mostrarBusqueda} onOpenChange={setMostrarBusqueda}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={mostrarBusqueda}
                  className="w-full justify-start bg-transparent"
                >
                  {destinatario ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={destinatario.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {destinatario.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{destinatario.nombre}</span>
                      <span className="text-muted-foreground">
                        ({destinatario.email})
                      </span>
                    </div>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      Seleccionar destinatario...
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Buscar usuario..."
                    value={busquedaUsuario}
                    onValueChange={setBusquedaUsuario}
                  />
                  <CommandList>
                    <CommandEmpty>No se encontraron usuarios.</CommandEmpty>
                    <CommandGroup>
                      {usuariosFiltrados.map((usuario) => (
                        <CommandItem
                          key={usuario.id}
                          value={usuario.nombre}
                          onSelect={() => seleccionarUsuario(usuario)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={usuario.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {usuario.nombre
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{usuario.nombre}</p>
                              <p className="text-sm text-muted-foreground">
                                {usuario.email}
                              </p>
                              {usuario.ultimoServicio && (
                                <p className="text-xs text-muted-foreground">
                                  Último servicio: {usuario.ultimoServicio}
                                </p>
                              )}
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Asunto (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="asunto">Asunto (opcional)</Label>
            <Input
              id="asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Ej: Consulta sobre tu servicio de..."
              disabled={enviando}
            />
          </div>

          {/* Mensaje */}
          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje *</Label>
            <Textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="min-h-[120px]"
              disabled={enviando}
            />
            <div className="text-xs text-muted-foreground text-right">
              {mensaje.length}/1000 caracteres
            </div>
          </div>

          {/* Información del destinatario */}
          {destinatario && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Información del destinatario</h4>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={destinatario.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {destinatario.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{destinatario.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    {destinatario.email}
                  </p>
                  {destinatario.ultimoServicio && (
                    <p className="text-xs text-muted-foreground">
                      Último servicio: {destinatario.ultimoServicio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={enviando}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEnviarMensaje}
              disabled={!destinatario || !mensaje.trim() || enviando}
              className="flex-1"
            >
              {enviando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar mensaje
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
