"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginUsuario } from "@/actions/auth.actions.client";

export default function LoginPage() {
  const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // En un caso real, aquí iría la lógica de autenticación
    //router.push("/(skillExchange)")
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      const tokenSaved = await loginUsuario(email, password);
      if (tokenSaved) {
        router.push("/servicio");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setAttempSubmit(true);
    } finally {
      setLoading(false);
    }
  };

  const goToRegistrar = () => {
    router.push("/registro/usuario/datos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30 relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
        </div>
      )}
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="text-center text-primary font-bold text-2xl mb-2">
            Chambita
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            ¡Hola de nuevo!
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa a tu cuenta para continuar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo o teléfono</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="tu@correo.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  ¿La olvidaste?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <div className="text-center text-sm">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Regístrate aquí
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
