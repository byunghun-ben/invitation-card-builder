const BASE_URL = process.env.API_URL || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${BASE_URL}/:path*`,
    },
  ],
};

module.exports = nextConfig;
