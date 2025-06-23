"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

export default function RegisterStep1Page() {
  const router = useRouter()
  const [documentType, setDocumentType] = useState<string>("dni")
  const [documentNumber, setDocumentNumber] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [date, setDate] = useState<Date>()
  const [description, setDescription] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!documentNumber) {
      newErrors.documentNumber = "El número de documento es requerido"
    } else if (documentType === "dni" && documentNumber.length !== 8) {
      newErrors.documentNumber = "El DNI debe tener 8 dígitos"
    } else if (documentType === "ce" && documentNumber.length < 8) {
      newErrors.documentNumber = "El carné de extranjería debe tener al menos 8 caracteres"
    }

    if (!firstName) {
      newErrors.firstName = "El nombre es requerido"
    }

    if (!lastName) {
      newErrors.lastName = "Los apellidos son requeridos"
    }

    if (!date) {
      newErrors.date = "La fecha de nacimiento es requerida"
    } else {
      const today = new Date()
      const birthDate = new Date(date)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      if (age < 18) {
        newErrors.date = "Debes ser mayor de 18 años"
      }
    }

    if (!description) {
      newErrors.description = "La descripción es requerida"
    } else if (description.length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      // En un caso real, aquí guardaríamos los datos en un estado global o en localStorage
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          documentType,
          documentNumber,
          firstName,
          lastName,
          birthDate: date?.toISOString(),
          description,
        }),
      )
      router.push("/register/step-2")
    }
  }

  const handleBack = () => {
    router.push("/register")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                1
              </div>
              <CardTitle>Datos personales</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Paso 1 de 3</div>
          </div>
          <CardDescription>Ingresa tus datos personales para crear tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de documento</Label>
            <RadioGroup
              defaultValue="dni"
              value={documentType}
              onValueChange={setDocumentType}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dni" id="dni" />
                <Label htmlFor="dni" className="cursor-pointer">
                  DNI
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ce" id="ce" />
                <Label htmlFor="ce" className="cursor-pointer">
                  Carné de extranjería
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-number">Número de documento</Label>
            <Input
              id="document-number"
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder={documentType === "dni" ? "12345678" : "CE123456"}
              className={errors.documentNumber ? "border-red-500" : ""}
            />
            {errors.documentNumber && <p className="text-sm text-red-500">{errors.documentNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="first-name">Nombres</Label>
            <Input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ingresa tus nombres"
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="last-name">Apellidos</Label>
            <Input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ingresa tus apellidos"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth-date">Fecha de nacimiento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    errors.date && "border-red-500",
                  )}
                >
                  {date ? format(date, "PPP", { locale: es }) : "Selecciona tu fecha de nacimiento"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    const today = new Date()
                    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
                    return date > today || date > eighteenYearsAgo
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Cuéntanos sobre ti</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe brevemente quién eres, tus intereses y qué te motiva a unirte a Chambita..."
              className={errors.description ? "border-red-500" : ""}
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
          <Button onClick={handleNext}>
            Siguiente <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
