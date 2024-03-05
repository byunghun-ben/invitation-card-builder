/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "knuahpfeiqewcczgflkw.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
