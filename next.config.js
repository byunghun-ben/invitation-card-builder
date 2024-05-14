/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // 보안 취약점으로 취급되는 X-Powered-By 헤더를 제거한다.
  // eslint: {
  //   ignoreDuringBuilds: true, // 빌드 시에 eslint를 무시한다. (빌드 시간 단축)
  // },
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
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
