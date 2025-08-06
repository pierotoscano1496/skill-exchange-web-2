"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, X, FileText, ImageIcon, CheckCircle, AlertCircle, Loader2, MessageSquare } from "lucide-react"
import { uploadFile, createMatchServicio, sendChatMessage } from "@/lib/actions/data"
import type { ServicioDetalle } from "@/lib/types/api-responses"
import { getCurrentUserId } from "@/lib/config/environment"

interface ContactServiceFormProps {
  servicio: ServicioDetalle
  onSuccess?: () => void
}

export function ContactServiceForm({ servicio, onSuccess }: ContactServiceFormProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados del formulario
  const [mensaje, setMensaje] = useState("")
  const [presupuesto, setPresupuesto] = useState("")
  const [archivo, setArchivo] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  // Tipos de archivo permitidos
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ]

  const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"]

  const resetForm = () => {
    setMensaje("")
    setPresupuesto("")
    setArchivo(null)
    setError(null)
    setSuccess(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    resetForm()
  }

  const validateFile = (file: File): boolean => {
    // Validar tipo de archivo
    if (!allowedTypes.includes(file.type)) {
      const extension = file.name.split(".").pop()?.toLowerCase()
      if (!extension || !allowedExtensions.includes(extension)) {
        setError(`Tipo de archivo no permitido. Solo se permiten: ${allowedExtensions.join(", ")}`)
        return false
      }
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("El archivo es demasiado grande. Máximo 10MB permitido.")
      return false
    }

    return true
  }

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setArchivo(file)
      setError(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const removeFile = () => {
    setArchivo(null)
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase()
    if (["jpg", "jpeg", "png"].includes(extension || "")) {
      return <ImageIcon className="h-4 w-4" />
    }
    return <FileText className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones
    if (!mensaje.trim()) {
      setError("El mensaje es requerido")
      return
    }

    if (mensaje.trim().length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres")
      return
    }

    if (mensaje.trim().length > 500) {
      setError("El mensaje no puede exceder 500 caracteres")
      return
    }

    if (!presupuesto || Number.parseFloat(presupuesto) <= 0) {
      setError("El presupuesto debe ser un valor positivo")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const idCliente = getCurrentUserId();

      // 1. Subir archivo si existe
      let resourceUrl: string | undefined;
      if (archivo) {
        const uploadResponse = await uploadFile(archivo);
        if (uploadResponse.success) {
          resourceUrl = uploadResponse.data.url;
        } else {
          throw new Error("Error al subir el archivo: " + uploadResponse.message);
        }
      }

      // 2. Crear match del servicio
      const matchResponse = await createMatchServicio({
        idServicio: servicio.id,
        idCliente,
        puntuacion: 0,
        costo: Number.parseFloat(presupuesto),
      });

      if (!matchResponse.success) {
        throw new Error("Error al crear la solicitud: " + matchResponse.message);
      }

      // 3. Enviar mensaje inicial
      const chatResponse = await sendChatMessage({
        idReceptor: servicio.proveedor.id,
        mensaje: mensaje.trim(),
        resourceUrl,
      });

      if (chatResponse.success) {
        setSuccess(true)
        setTimeout(() => {
          handleClose()
          if (onSuccess) {
            onSuccess()
          } else {
            router.push("/explorar")
          }
        }, 2000)
      } else {
        setError(chatResponse.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Solicitar servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contactar proveedor</DialogTitle>
          <DialogDescription>
            Envía un mensaje a {servicio.proveedor.nombres} {servicio.proveedor.apellidos} para solicitar el servicio "
            {servicio.titulo}"
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                ¡Solicitud enviada con éxito! El proveedor se pondrá en contacto contigo pronto. Serás redirigido en
                unos segundos...
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje *</Label>
              <Textarea
                id="mensaje"
                placeholder="Describe tu necesidad, cuándo necesitas el servicio, detalles específicos, etc."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="min-h-[100px]"
                disabled={loading}
              />
              <div className="text-xs text-muted-foreground text-right">{mensaje.length}/500 caracteres</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="presupuesto">Presupuesto estimado (S/) *</Label>
              <Input
                id="presupuesto"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label>Archivo adjunto (opcional)</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {archivo ? (
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      {getFileIcon(archivo.name)}
                      <div className="text-left">
                        <div className="text-sm font-medium">{archivo.name}</div>
                        <div className="text-xs text-muted-foreground">{formatFileSize(archivo.size)}</div>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={removeFile} disabled={loading}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <div className="text-sm">
                      <label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline">
                        Selecciona un archivo
                      </label>{" "}
                      o arrastra y suelta aquí
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Formatos: JPG, PNG, PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (máx. 10MB)
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept={allowedExtensions.map((ext) => `.${ext}`).join(",")}
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar solicitud"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}