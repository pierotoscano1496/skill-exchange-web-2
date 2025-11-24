# Chambita Web - Compilación Estática

## Arquitectura Híbrida para Static Export

Este proyecto ha sido configurado para compilar estáticamente mientras mantiene funcionalidades dinámicas que requieren un backend externo.

### Cambios Realizados

#### 1. Configuración de Next.js (`next.config.mjs`)

- **Output**: Configurado como `"export"` para compilación estática
- **Server Actions**: Deshabilitadas (`experimental.serverActions: false`) ya que no son compatibles con static export
- **Trailing Slash**: Habilitado para mejor compatibilidad con hosting estático
- **Imágenes**: Sin optimización (`unoptimized: true`) para static export

#### 2. Variables de Entorno (`lib/config/environment.ts`)

- **API_BASE_URL**: Configurada con variable de entorno `NEXT_PUBLIC_API_BASE_URL`
- Permite cambiar la URL del backend sin recompilar

#### 3. Server Actions Convertidas a Client Actions (`lib/actions/data.ts`)

- Cambiado de `"use server"` a `"use client"`
- Las funciones ahora se ejecutan en el navegador
- Mantienen la misma API pero operan del lado cliente

#### 4. Manejo de Cookies (`lib/actions/cookies.ts`)

- Convertido a client-side para compatibilidad con static export
- Usa `document.cookie` en lugar de `next/headers`

#### 5. API Service (`lib/services/api-service.ts`)

- Adaptado para funcionar tanto en servidor como en cliente
- Manejo de autenticación con cookies del navegador
- Compatible con static export

#### 6. Middleware (`middleware.ts`)

- Configurado para saltar autenticación en producción con static export
- Usa variable `NEXT_PUBLIC_STATIC_EXPORT` para determinar el comportamiento

### Variables de Entorno

Crear un archivo `.env.local` con:

```env
NEXT_PUBLIC_API_BASE_URL=https://tu-backend.com/api
NEXT_PUBLIC_STATIC_EXPORT=true
```

### Funcionalidades que Requieren Backend

Todas las funcionalidades de la aplicación requieren comunicación con el backend:

- **Autenticación**: Login, registro, manejo de sesiones
- **Servicios**: Crear, editar, buscar servicios
- **Solicitudes**: Gestionar solicitudes de servicio
- **Chat**: Mensajería en tiempo real
- **Pagos**: Procesamiento de pagos
- **Perfil**: Gestión de perfiles de usuario

### Despliegue

1. **Desarrollo**: `npm run dev`
2. **Build Estático**: `npm run build`
3. **Desplegar**: Los archivos en `out/` pueden subirse a cualquier hosting estático (Netlify, Vercel, etc.)

### Consideraciones Importantes

- **API Routes**: No estarán disponibles en producción (static export)
- **Server-Side Rendering**: No disponible en static export
- **Middleware**: Solo funciona en desarrollo
- **Autenticación**: Manejada completamente en el cliente
- **Backend**: Debe estar configurado con CORS para permitir requests desde el dominio del hosting

### Backend Requerido

El backend debe estar corriendo en la URL configurada y tener habilitado CORS para el dominio donde se hospede la aplicación estática.
