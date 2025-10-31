"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function RegisterWelcomePage() {
  const router = useRouter()

  const handleStart = () => {
    router.push("/register/step-1")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="text-center text-primary font-bold text-2xl mb-2">Chambita</div>
          <CardTitle className="text-2xl font-bold">¡Bienvenido a Chambita!</CardTitle>
          <CardDescription className="text-lg">
            Estás a pocos pasos de comenzar a ofrecer tus servicios o encontrar ayuda para tus tareas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-semibold text-primary">1</span>
              </div>
              <div>
                <h3 className="font-medium">Datos personales</h3>
                <p className="text-sm text-muted-foreground">
                  Ingresa tus datos básicos para que podamos conocerte mejor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-semibold text-primary">2</span>
              </div>
              <div>
                <h3 className="font-medium">Contacto y redes sociales</h3>
                <p className="text-sm text-muted-foreground">
                  Configura tus medios de contacto y conecta tus redes sociales.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-semibold text-primary">3</span>
              </div>
              <div>
                <h3 className="font-medium">Habilidades</h3>
                <p className="text-sm text-muted-foreground">
                  Cuéntanos qué sabes hacer para que otros puedan encontrarte.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-primary/5 p-4">
            <p className="text-sm">
              Al registrarte, aceptas nuestros{" "}
              <Link href="#" className="text-primary hover:underline">
                Términos y Condiciones
              </Link>{" "}
              y{" "}
              <Link href="#" className="text-primary hover:underline">
                Política de Privacidad
              </Link>
              .
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStart} className="w-full">
            Comenzar registro <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
