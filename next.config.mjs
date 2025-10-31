/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const nextConfig = {};
=======
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};
>>>>>>> dev_v3

export default nextConfig;
