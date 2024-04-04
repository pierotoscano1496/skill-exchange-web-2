/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:4000/api/:path*"
            },
            {
                source: "/backend/:path*",
                destination: "http://localhost:9081/api/:path*"
            }
        ]
    }
};

export default nextConfig;
