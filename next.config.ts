import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.brawlhalla.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
// Trigger redeploy
