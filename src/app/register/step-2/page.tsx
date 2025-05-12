"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  TwitterIcon as TikTok,
  Eye,
  EyeOff,
} from "lucide-react";

export default function RegisterStep2Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [linkedin, setLinkedin] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar datos previos si existen
  useEffect(() => {
    const savedData = localStorage.getItem("registrationData");
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.email) setEmail(data.email);
      if (data.linkedin) setLinkedin(data.linkedin);
      if (data.facebook) setFacebook(data.facebook);
      if (data.instagram) setInstagram(data.instagram);
      if (data.tiktok) setTiktok(data.tiktok);
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar email
    if (!email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Validar que al menos una red social esté presente
    if (!linkedin && !facebook && !instagram && !tiktok) {
      newErrors.social = "Debes proporcionar al menos una red social";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Obtener datos previos
      const savedData = localStorage.getItem("registrationData");
      const prevData = savedData ? JSON.parse(savedData) : {};

      // Guardar datos actuales
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...prevData,
          email,
          password, // En un caso real, no guardaríamos la contraseña en localStorage
          linkedin,
          facebook,
          instagram,
          tiktok,
        })
      );
      router.push("/register/step-3");
    }
  };

  const handleBack = () => {
    router.push("/register/step-1");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                2
              </div>
              <CardTitle>Contacto y redes sociales</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Paso 2 de 3</div>
          </div>
          <CardDescription>
            Configura tus medios de contacto y conecta tus redes sociales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crea una contraseña segura"
                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar contraseña</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className={
                  errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-4">
            <h3 className="text-sm font-medium mb-2">
              Redes sociales (al menos una)
            </h3>
            {errors.social && (
              <p className="text-sm text-red-500 mb-2">{errors.social}</p>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-[#0077B5]" />
                <Input
                  placeholder="URL de LinkedIn"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-[#1877F2]" />
                <Input
                  placeholder="URL de Facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-[#E4405F]" />
                <Input
                  placeholder="Usuario de Instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <TikTok className="h-5 w-5" />
                <Input
                  placeholder="Usuario de TikTok"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
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
  );
}
