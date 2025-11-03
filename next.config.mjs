/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Deshabilitar Server Actions para static export
  experimental: {
    serverActions: false,
  },
  // Configuración para export estático con funcionalidades híbridas
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  // Deshabilitar funcionalidades que no funcionan en static export
  // Server Actions se ejecutarán en el cliente
  // API routes se mantendrán para desarrollo pero no estarán disponibles en producción
};

export default nextConfig;
