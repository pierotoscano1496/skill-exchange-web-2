import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Users, Pencil, DollarSign } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl text-primary">Chambita</div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/register">
              <Button>Regístrate</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <Container className="py-24 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Gana dinero con lo que <br />
          <span className="text-primary">ya sabes hacer</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Ofrece tus habilidades o encuentra quien te ayude con esas tareas que
          necesitas. Desde pasear perros hasta arreglar jardines, ¡hay una
          chambita para todos!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register">
            <Button size="lg">¡Quiero ganar dinero!</Button>
          </Link>
          <Link href="#como-funciona">
            <Button size="lg" variant="outline">
              ¿Cómo funciona?
            </Button>
          </Link>
        </div>
      </Container>

      {/* Features */}
      <section id="como-funciona" className="py-24">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            ¿Cómo funciona Chambita?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Crea tu perfil</CardTitle>
                <p className="text-muted-foreground">
                  Regístrate y cuéntanos qué sabes hacer. ¿Cocinas rico?
                  ¿Arreglas computadoras? ¡Lo que sea vale!
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Pencil className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">
                  Publica tus chambitas
                </CardTitle>
                <p className="text-muted-foreground">
                  Ofrece tus servicios o busca los que necesitas. Tú decides
                  cuándo, dónde y cuánto cobras.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Gana dinero</CardTitle>
                <p className="text-muted-foreground">
                  Recibe pagos seguros por tus servicios y construye tu
                  reputación con buenas reseñas.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Popular Services */}
      <section className="bg-muted/30 py-24">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Chambitas populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Paseo de perros", icon: "🐕" },
              { name: "Jardinería", icon: "🌱" },
              { name: "Reparaciones", icon: "🔧" },
              { name: "Limpieza", icon: "🧹" },
              { name: "Cocina casera", icon: "🍲" },
              { name: "Mandados", icon: "🛵" },
              { name: "Clases de música", icon: "🎸" },
              { name: "Cuidado de niños", icon: "👶" },
            ].map((service) => (
              <Card
                key={service.name}
                className="bg-background hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h3 className="font-medium">{service.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <Container className="py-24">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          Lo que dicen nuestros usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Empecé ofreciendo clases de guitarra los fines de semana y ahora tengo más alumnos de los que puedo atender. ¡Chambita cambió mi vida!",
              name: "Carlos M.",
              role: "Profesor de música",
            },
            {
              quote:
                "Encontré a alguien que pasea a mi perrito cuando estoy en el trabajo. Es confiable y mi mascota lo adora.",
              name: "Laura T.",
              role: "Clienta satisfecha",
            },
            {
              quote:
                "Ofrezco mis servicios de jardinería y he conseguido clientes fijos. Es un ingreso extra que me ayuda mucho.",
              name: "Miguel R.",
              role: "Jardinero",
            },
          ].map((testimonial, i) => (
            <Card key={i} className="bg-muted/20">
              <CardContent className="p-6">
                <p className="italic mb-4">{testimonial.quote}</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para empezar tu chambita?
          </h2>
          <p className="max-w-[600px] mx-auto mb-8">
            Únete a miles de personas que ya están ganando dinero extra con sus
            habilidades
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Regístrate gratis
            </Button>
          </Link>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-primary">Chambita &copy; 2025</div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#">Términos</Link>
            <Link href="#">Privacidad</Link>
            <Link href="#">Ayuda</Link>
            <Link href="#">Contacto</Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
