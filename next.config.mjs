/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: "http://localhost:9081/api/:path*"
            }
        ]
    }
};

export default nextConfig;
