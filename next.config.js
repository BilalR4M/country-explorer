/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org", "restcountries.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "**.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**.restcountries.com",
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
