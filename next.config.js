/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["react-bootstrap"],
    },
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig
