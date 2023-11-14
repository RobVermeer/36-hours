/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["36.robvermeer.nl"],
    },
  },
}

module.exports = nextConfig
