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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { UsuarioTipo } from "@/lib/constants/enums";

export default function RegisterStep2Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userType, setUserType] = useState<UsuarioTipo>(UsuarioTipo.CLIENTE);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = localStorage.getItem("registrationData");
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.email) setEmail(data.email);
      if (data.userType) setUserType(data.userType);
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const savedData = localStorage.getItem("registrationData");
      const prevData = savedData ? JSON.parse(savedData) : {};

      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          ...prevData,
          correo: email,
          clave: password,
          tipo: userType,
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
              <CardTitle>Credenciales y tipo de cuenta</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Paso 2 de 3</div>
          </div>
          <CardDescription>
            Define cómo accederás a tu cuenta y qué rol tendrás en la
            plataforma.
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

          <div className="space-y-2">
            <Label>Tipo de cuenta</Label>
            <RadioGroup
              value={userType}
              onValueChange={(type: UsuarioTipo) => setUserType(type)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={UsuarioTipo.CLIENTE}
                  id={UsuarioTipo.CLIENTE}
                />
                <Label htmlFor={UsuarioTipo.CLIENTE} className="cursor-pointer">
                  Soy Cliente (Quiero contratar servicios)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value={UsuarioTipo.PROVEEDOR}
                  id={UsuarioTipo.PROVEEDOR}
                />
                <Label
                  htmlFor={UsuarioTipo.PROVEEDOR}
                  className="cursor-pointer"
                >
                  Soy Proveedor (Quiero ofrecer mis servicios)
                </Label>
              </div>
            </RadioGroup>
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
