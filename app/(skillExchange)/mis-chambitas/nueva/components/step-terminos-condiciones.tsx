import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ServicioFormData } from "../page"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ShieldCheck } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface StepTerminosCondicionesProps {
  formData: ServicioFormData
  updateFormData: (data: Partial<ServicioFormData>) => void
  errors: Record<string, string>
}

export function StepTerminosCondiciones({ formData, updateFormData, errors }: StepTerminosCondicionesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Términos y Condiciones del Servicio</CardTitle>
        <CardDescription>
          Por favor, lee y acepta los términos y condiciones para poder publicar tu servicio.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-72 w-full rounded-md border p-4">
          <div className="space-y-6 text-sm text-muted-foreground">
            <p>Al publicar un servicio en Chambita, aceptas los siguientes términos y condiciones:</p>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                Responsabilidad del servicio
              </h4>
              <p className="pl-6">
                Eres el único responsable de la calidad, seguridad y cumplimiento del servicio que ofreces. Chambita
                actúa como un intermediario para conectar a usuarios y no se hace responsable por la calidad o el
                resultado final del servicio prestado.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                Veracidad de la información
              </h4>
              <p className="pl-6">
                Toda la información que proporcionas en la publicación de tu servicio debe ser veraz, precisa y
                actualizada. No debes exagerar tus habilidades, experiencia o prometer resultados que no puedas
                garantizar.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                Comunicación con clientes
              </h4>
              <p className="pl-6">
                Te comprometes a mantener una comunicación clara, respetuosa y profesional con los clientes
                potenciales, respondiendo a sus consultas en un tiempo razonable a través del chat de la plataforma.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                Comisiones y pagos
              </h4>
              <p className="pl-6">
                Chambita cobra una comisión del 10% por cada servicio completado y pagado a través de la plataforma.
                Los pagos se procesarán según los términos establecidos en nuestras políticas de pago.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-destructive flex-shrink-0" />
                Servicios prohibidos
              </h4>
              <p className="pl-6">
                No está permitido ofrecer servicios ilegales, fraudulentos, que infrinjan derechos de propiedad
                intelectual, que promuevan actividades peligrosas, o que violen de cualquier otra forma nuestras
                políticas comunitarias.
              </p>
            </div>

            <p className="pt-4 border-t">
              El incumplimiento de estos términos puede resultar en la suspensión o eliminación de tu cuenta y de los
              servicios que hayas publicado. Para más detalles, consulta nuestros{" "}
              <a href="/terminos-y-condiciones" target="_blank" className="text-primary hover:underline">
                Términos y Condiciones completos
              </a>
              .
            </p>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="aceptar-terminos"
            checked={formData.aceptaTerminos}
            onCheckedChange={(checked) => updateFormData({ aceptaTerminos: checked as boolean })}
            className={errors.aceptaTerminos ? "border-red-500" : ""}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="aceptar-terminos"
              className={`font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                errors.aceptaTerminos ? "text-red-500" : ""
              }`}
            >
              He leído y acepto los términos y condiciones para publicar mi servicio.
            </Label>
            {errors.aceptaTerminos && <p className="text-sm text-red-500">{errors.aceptaTerminos}</p>}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
